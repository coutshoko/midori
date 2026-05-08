#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# PARENT_DIR="$(dirname "$SCRIPT_DIR")"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[setup]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC}  $1"; }

clone_or_pull() {
  local dir="$1"
  local url="$2"
  if [ -d "$dir/.git" ]; then
    log "Pulling $(basename "$dir")..."
    git -C "$dir" pull origin main
  else
    log "Cloning $(basename "$dir")..."
    git clone "$url" "$dir"
  fi
}

# ---------------------------------------------------------------------------
# Repos built from ./app/*
# ---------------------------------------------------------------------------
mkdir -p "$SCRIPT_DIR/app"

clone_or_pull "$SCRIPT_DIR/app/haruki-murakami-random-quotes" \
  "https://github.com/coutshoko/haruki-murakami-random-quotes.git"

clone_or_pull "$SCRIPT_DIR/app/tarkov-flea-market-stock-exchange" \
  "https://github.com/coutshoko/tarkov-flea-market-stock-exchange.git"

clone_or_pull "$SCRIPT_DIR/app/dota2currank" \
  "https://github.com/coutshoko/dota2currank.git"

clone_or_pull "$SCRIPT_DIR/app/portfolio" \
  "https://github.com/coutshoko/portfolio.git"
# ---------------------------------------------------------------------------
# Chatboard — commented out, kept for reference
# clone_or_pull "$PARENT_DIR/chatboard" \
#   "https://github.com/coutshoko/chatboard.git"
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# .env — scaffold once; never overwrite
# ---------------------------------------------------------------------------
if [ ! -f "$SCRIPT_DIR/.env" ]; then
  log "Scaffolding .env..."
  cat > "$SCRIPT_DIR/.env" <<EOF
DOMAIN=
CLOUDFLARE_TUNNEL_TOKEN=
EOF
  chmod 600 "$SCRIPT_DIR/.env"
  warn ".env created — fill in DOMAIN and CLOUDFLARE_TUNNEL_TOKEN before starting."
else
  warn ".env already exists — skipping."
fi

# Remind the user if either required var is missing/empty.
check_env_var() {
  local var="$1"
  if ! grep -q "^${var}=.\+" "$SCRIPT_DIR/.env" 2>/dev/null; then
    warn "${var} is not set in .env — add it before running docker compose"
  fi
}

check_env_var "DOMAIN"
check_env_var "CLOUDFLARE_TUNNEL_TOKEN"

log "Done. Run: docker compose up -d --build"