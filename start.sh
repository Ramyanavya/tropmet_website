#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌩  TROPMET 2026 — Starting..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── Backend ──────────────────────────────────────
cd "$SCRIPT_DIR/backend"

# Create .env if missing
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created backend/.env from example"
fi

# Virtual env
if [ ! -d venv ]; then
  echo "📦 Creating Python virtual environment..."
  python3 -m venv venv
fi
source venv/bin/activate

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt -q

echo "🚀 Starting backend on http://localhost:8000 ..."
uvicorn backend.main:app --reload --port 8000 --app-dir "$SCRIPT_DIR" &
BACKEND_PID=$!
echo "✅ Backend PID: $BACKEND_PID"

# ── Frontend ─────────────────────────────────────
cd "$SCRIPT_DIR/frontend"

if [ ! -d node_modules ]; then
  echo "📦 Installing npm packages..."
  npm install
fi

echo "🚀 Starting frontend on http://localhost:5173 ..."
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend PID: $FRONTEND_PID"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅  TROPMET 2026 is running!"
echo "  🌐  Frontend : http://localhost:5173"
echo "  ⚙️   Backend  : http://localhost:8000"
echo "  📖  API Docs : http://localhost:8000/docs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Press Ctrl+C to stop all servers"
echo ""

trap "echo 'Stopping...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
