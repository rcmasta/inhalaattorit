#!/bin/sh
set -e

if [ ! -f /backend/data/.initialized ]; then
  echo "Seeding persistent volume with initial data."
  cp -R /backend/default_data/* /backend/data/
  touch /backend/data/.initialized
fi

echo "Checking test database"

if [ ! -f src/config/inhalers.db ]; then
    echo "Database not found. Generating."
    npm run test_db
else
    echo "Database already exists. Skipping generation."
fi

echo "Starting backend server"
exec npm start