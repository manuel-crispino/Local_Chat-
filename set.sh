#!/bin/bash
set -e

# --- Colori ---
GREEN="\033[1;32m"
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
RESET="\033[0m"
MAGENTA="\033[0;35m"

# --- File per la data di creazione ---
CREATED_FILE=".created"

# Se non esiste, lo creiamo con la data corrente
if [ ! -f "$CREATED_FILE" ]; then
    date +"%Y-%m-%d" > "$CREATED_FILE"  
fi

# Legge la data di creazione
created=$(cat "$CREATED_FILE")

# --- Date dinamiche ---
updated=$(date +"%Y-%m-%d %H:%M:%S") # timestamp come “updated”

# --- ASCII Art direttamente nello script ---
ASCII_ART="${GREEN}
 _    _   ____ 
/ \  / | /   _|
|  \`´  | |  / 
| |\/| | |  \_
\_/  \_| \____|

  * Softwares Lab *
${RESET}
${MAGENTA}© Manuel Crispino
Created : ${created} 
Last updated : ${updated}
"

# --- Funzione per check/install dipendenze ---
install_if_needed() {
  local folder=$1
  if [ ! -d "$folder/node_modules" ]; then
    (cd "$folder" && npm install --silent)
  fi
}

# --- Funzione per liberare porte e uscire ---
cleanup() {
  echo -e "${YELLOW}\n🛑 CTRL+C closing Ports...${RESET}"
  npm run kill-ports &> /dev/null || true
  exit 0
}

trap cleanup SIGINT

# --- Root e backend ---
install_if_needed "."
install_if_needed "backend"

# --- Setup backend ---
(cd backend && npm run setup --silent)

# --- Avvia dev server e mostra output selezionato ---
npm run dev 2>&1 | while read -r line; do
  if [[ $line == *"Network:"* ]]; then
    url=$(echo "$line" | awk -F'Network: ' '{print $2}')
    echo -e "${RESET}${ASCII_ART}${RESET}"
    echo -e "${GREEN}🔗 App running on:${RESET}\n${CYAN}$url${RESET}\n"
    echo -e "${YELLOW}⚠ Attention:${RESET} The chat works only for devices on your local Wi-Fi.\nShare the URL to let them connect.\n"
    echo -e "${YELLOW}Press CTRL+C to safely stop servers and free occupied ports.${RESET}"
  fi
done
