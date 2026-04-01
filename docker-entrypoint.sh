#!/bin/sh
set -e

DEFAULT_DATA_DIR="/backend/default_data"
DATA_DIR="/backend/data"
UPLOAD_DIR="upload"
DB_DIR="db"
DB_FILE="inhalers.db"
INIT_FILE=".initialized"
TIMEOUT=20
SLEEP_INTERVAL=1
WAITED=0

echo "Waiting for railway volume."

while [ ! -d "$DATA_DIR/lost+found" ]; do
    if [ $WAITED -ge $TIMEOUT ]; then
        echo "Volume not mounted after $TIMEOUT seconds!"
        exit 1
    fi
    echo "Volume not mounted yet. Waiting ($WAITED/$TIMEOUT)"
    sleep $SLEEP_INTERVAL
    WAITED=$((WAITED + SLEEP_INTERVAL))
done

echo "Railway volume mounted."

if [ ! -f "$DATA_DIR/$INIT_FILE" ]; then
  echo "Seeding persistent volume with initial data."
  cp -a "$DEFAULT_DATA_DIR/." "$DATA_DIR"
  touch "$DATA_DIR/$INIT_FILE"
fi

echo "Checking database"

if [ ! -d "$DATA_DIR/$DB_DIR" ]; then
    echo "Database directory missing. Creating."
    mkdir -p "$DATA_DIR/$DB_DIR"
fi

if [ ! -f "$DATA_DIR/$DB_DIR/$DB_FILE" ]; then
    echo "Database not found. Generating."
    npm run populate_db -- /backend/data/taulukko.xlsx
else
    echo "Database already exists. Skipping generation."
fi

if [ ! -d "$DATA_DIR/$UPLOAD_DIR" ]; then
    echo "Upload directory missing. Creating."
    mkdir -p "$DATA_DIR/$UPLOAD_DIR"
fi

echo "Starting backend server"
exec node server.js