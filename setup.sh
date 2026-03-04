#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"

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

# ---------------------------------------------------------------------------
# Repos built from sibling directories (../chatboard, ../portfolio)
# ---------------------------------------------------------------------------
clone_or_pull "$PARENT_DIR/chatboard" \
  "https://github.com/coutshoko/chatboard.git"

clone_or_pull "$PARENT_DIR/portfolio" \
  "https://github.com/coutshoko/portfolio.git"

# ---------------------------------------------------------------------------
# .env — generate once with random secrets; never overwrite
# ---------------------------------------------------------------------------
if [ ! -f "$SCRIPT_DIR/.env" ]; then
  log "Generating .env with random secrets..."
  cat > "$SCRIPT_DIR/.env" <<EOF
POSTGRES_PASSWORD=$(openssl rand -hex 24)
JWT_SECRET=$(openssl rand -hex 32)
EOF
  chmod 600 "$SCRIPT_DIR/.env"
  log ".env created."
else
  warn ".env already exists — skipping secret generation."
fi

# Remind the user to add their Cloudflare tunnel token if it's missing.
if ! grep -q "CLOUDFLARE_TUNNEL_TOKEN=." "$SCRIPT_DIR/.env" 2>/dev/null; then
  warn "CLOUDFLARE_TUNNEL_TOKEN is not set in .env"
  warn "Add it before running docker compose:"
  warn "  echo 'CLOUDFLARE_TUNNEL_TOKEN=your_token_here' >> .env"
fi

log "Done. Run: docker compose up -d --build"
