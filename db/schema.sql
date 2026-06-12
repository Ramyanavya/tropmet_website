-- ============================================================
--  TROPMET 2026  –  Full Database Schema  (v9)
--  Follows IEEE / national-conference best-practice workflow:
--  Register → Submit Abstract → Assign Reviewer → Review →
--  Accept/Reject → Payment (early-bird / regular) → ID Card
--  + Spot Registration at the venue
-- ============================================================

CREATE DATABASE IF NOT EXISTS tropmet2026
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tropmet2026;

-- ─────────────────────────────────────────────────────────────
-- 1. USERS  (authors, reviewers, admins, spot-registrants)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,          -- bcrypt
    phone         VARCHAR(20),
    institution   VARCHAR(500),
    designation   VARCHAR(255),
    role          ENUM('author','reviewer','admin') DEFAULT 'author',
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role  (role)
);

-- ─────────────────────────────────────────────────────────────
-- 2. ABSTRACTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE abstracts (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    author_id           INT NOT NULL,
    co_authors          TEXT,
    title               VARCHAR(500) NOT NULL,
    abstract_text       TEXT NOT NULL,
    theme               VARCHAR(255),
    keywords            VARCHAR(500),
    file_path           VARCHAR(500),             -- uploaded PDF/DOCX
    presentation_type   ENUM('oral','poster','either') DEFAULT 'either',
    status              ENUM(
                            'submitted',
                            'under_review',
                            'accepted',
                            'rejected',
                            'revision_requested'
                        ) DEFAULT 'submitted',
    admin_remarks       TEXT,
    submitted_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_author (author_id),
    INDEX idx_status (status)
);

-- ─────────────────────────────────────────────────────────────
-- 3. REVIEWER ASSIGNMENTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE reviewer_assignments (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    abstract_id  INT NOT NULL,
    reviewer_id  INT NOT NULL,
    assigned_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline     DATE,
    FOREIGN KEY (abstract_id) REFERENCES abstracts(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uniq_assign (abstract_id, reviewer_id),
    INDEX idx_reviewer (reviewer_id)
);

-- ─────────────────────────────────────────────────────────────
-- 4. REVIEWS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE reviews (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id   INT NOT NULL,
    abstract_id     INT NOT NULL,
    reviewer_id     INT NOT NULL,
    decision        ENUM('accept','reject','revision') NOT NULL,
    originality     TINYINT UNSIGNED,   -- 1-5 score
    relevance       TINYINT UNSIGNED,
    clarity         TINYINT UNSIGNED,
    overall_score   TINYINT UNSIGNED,
    comments        TEXT,
    internal_notes  TEXT,              -- not shown to author
    reviewed_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES reviewer_assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (abstract_id)  REFERENCES abstracts(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id)  REFERENCES users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────
-- 5. ACCEPTANCE LETTERS / NOTIFICATIONS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE acceptance_notifications (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    abstract_id     INT NOT NULL UNIQUE,
    author_id       INT NOT NULL,
    letter_token    VARCHAR(64) NOT NULL UNIQUE,   -- secure URL token
    presentation_type ENUM('oral','poster') DEFAULT 'oral',
    notified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at    TIMESTAMP NULL,                -- when author confirms participation
    FOREIGN KEY (abstract_id) REFERENCES abstracts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id)   REFERENCES users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────
-- 6. REGISTRATIONS  (online – post-acceptance payment)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE registrations (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    user_id             INT,                       -- NULL for spot registrations
    abstract_id         INT,                       -- NULL for spot registrations
    reg_type            ENUM('online','spot') DEFAULT 'online',

    -- Participant details (duplicated for spot reg where user may not exist)
    full_name           VARCHAR(255) NOT NULL,
    email               VARCHAR(255) NOT NULL,
    phone               VARCHAR(20)  NOT NULL,
    institution         VARCHAR(500),
    designation         VARCHAR(255),
    category            ENUM(
                            'IMS/OSI Members',
                            'Non-IMS/OSI Members',
                            'Scholars/Students',
                            'Foreign Nationals',
                            'Industry'
                        ) NOT NULL,
    ims_member_id       VARCHAR(100),              -- optional IMS membership number

    -- Pricing
    amount              DECIMAL(10,2) NOT NULL,
    early_bird          BOOLEAN DEFAULT FALSE,
    fee_waived          BOOLEAN DEFAULT FALSE,     -- Honorary Fellows / Fellows of IMS

    -- Payment
    payment_status      ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
    payment_mode        ENUM('razorpay','cash','dd','upi','waived') DEFAULT 'razorpay',
    razorpay_order_id   VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    razorpay_signature  VARCHAR(512),
    utr_number          VARCHAR(100),              -- bank reference / UTR
    payment_proof_path  VARCHAR(500),              -- for offline payments

    -- ID Card
    reg_number          VARCHAR(50) UNIQUE,        -- e.g. TM2026-0001
    id_card_generated   BOOLEAN DEFAULT FALSE,
    id_card_path        VARCHAR(500),

    -- Spot reg specific
    attended_at         TIMESTAMP NULL,
    collected_by        VARCHAR(255),              -- admin name who registered them

    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)     REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (abstract_id) REFERENCES abstracts(id) ON DELETE SET NULL,
    INDEX idx_email      (email),
    INDEX idx_reg_number (reg_number),
    INDEX idx_reg_type   (reg_type),
    INDEX idx_pay_status (payment_status)
);

-- ─────────────────────────────────────────────────────────────
-- 7. ANNOUNCEMENTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE announcements (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(500) NOT NULL,
    content    TEXT NOT NULL,
    is_active  BOOLEAN DEFAULT TRUE,
    priority   TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────
-- 8. IMPORTANT DATES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE important_dates (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    event_name    VARCHAR(255) NOT NULL,
    event_date    DATE NOT NULL,
    is_deadline   BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0
);

-- ─────────────────────────────────────────────────────────────
-- 9. GALLERY, SPEAKERS, SPONSORS  (unchanged)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE gallery (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255),
    image_url   VARCHAR(500) NOT NULL,
    category    VARCHAR(100),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE speakers (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    institution VARCHAR(255),
    bio         TEXT,
    photo_url   VARCHAR(500),
    talk_title  VARCHAR(500),
    talk_date   DATE,
    is_keynote  BOOLEAN DEFAULT FALSE
);

CREATE TABLE sponsors (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    logo_url      VARCHAR(500),
    website       VARCHAR(500),
    tier          ENUM('platinum','gold','silver','bronze') DEFAULT 'silver',
    display_order INT DEFAULT 0
);

-- ─────────────────────────────────────────────────────────────
-- SEED DATA
-- ─────────────────────────────────────────────────────────────

-- Admin user  (password: Admin@2026  — bcrypt hash, change before deploy)
INSERT INTO users (full_name, email, password_hash, phone, institution, role) VALUES
('TROPMET Admin', 'admin@tropmet2026.in',
 '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGniYwcX6gD5/PlFZcMoNpyqZzq',
 '9873344860', 'NCMRWF, Noida', 'admin');

-- Important dates
INSERT INTO important_dates (event_name, event_date, is_deadline, display_order) VALUES
('Abstract Submission Deadline',    '2026-08-15', TRUE,  1),
('Intimation on Acceptance',        '2026-08-30', FALSE, 2),
('Confirmation of Participation',   '2026-09-15', TRUE,  3),
('Online Registration Opens',       '2026-09-15', FALSE, 4),
('Early Bird Registration Ends',    '2026-10-31', TRUE,  5),
('Conference Begins',               '2026-11-19', FALSE, 6),
('Conference Ends',                 '2026-11-21', FALSE, 7);

-- Announcements
INSERT INTO announcements (title, content, priority) VALUES
('Call for Papers Now Open',
 'Abstract submissions for TROPMET 2026 are now open. Submit by 15th August 2026.',
 10),
('Early Bird Registration',
 'Register before 31st October 2026 to avail the early-bird discounted rates.',
 9),
('Spot Registration Available',
 'Attendees can also register directly at the venue (NCMRWF, Noida) on 19–21 November 2026.',
 8);

-- ─────────────────────────────────────────────────────────────
-- USEFUL QUERIES FOR ADMIN DASHBOARD LOGIN TEST
-- ─────────────────────────────────────────────────────────────
-- SELECT * FROM users WHERE role = 'admin';
-- SELECT a.*, u.full_name, u.email FROM abstracts a JOIN users u ON a.author_id = u.id;
-- SELECT r.*, a.title, u.full_name AS reviewer_name
--   FROM reviewer_assignments r
--   JOIN abstracts a ON r.abstract_id = a.id
--   JOIN users u ON r.reviewer_id = u.id;
-- SELECT * FROM registrations WHERE payment_status = 'paid';
-- SELECT * FROM registrations WHERE reg_type = 'spot';
