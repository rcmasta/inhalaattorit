#!/bin/sh
set -e

echo "Checking test database"

if [ ! -f src/config/inhalers.db ]; then
    echo "Database not found. Generating..."
    npm run test_db
else
    echo "Database already exists. Skipping generation."
fi

echo "Starting backend server"
exec npm run start_prod