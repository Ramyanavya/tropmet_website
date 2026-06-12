# TROPMET 2026 — PRaGaTI

## Quick Start

### Option 1 — Run both servers together
```bash
cd tropmet-final
bash start.sh
```

### Option 2 — Run separately (recommended for development)

**Terminal 1 — Backend:**
```bash
cd tropmet-final/backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Copy env file
cp .env.example .env
# Start (uses SQLite by default — no MySQL needed)
cd ..
uvicorn backend.main:app --reload --port 8000
```

**Terminal 2 — Frontend:**
```bash
cd tropmet-final/frontend
npm install
npm run dev
```

Open: http://localhost:5173

---

## Notes

- **Database**: SQLite is used automatically when MySQL is not configured. The `tropmet.db` file is created in `tropmet-final/`.
- **Razorpay**: Test credentials are pre-configured. Payment popup opens directly from the frontend — no backend call needed to initiate payment.
- **Backend down?**: The site still works. Fallback data is shown for dates/announcements. Payment confirmation shows Razorpay payment ID.

## Razorpay Test Cards
- Card: `4111 1111 1111 1111`, Expiry: any future, CVV: any
- UPI: `success@razorpay`
