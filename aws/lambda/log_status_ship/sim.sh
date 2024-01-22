#!/bin/bash
$DB_NAME="Logs"
$DB_USER="user"
$DB_PASS="password"
$DB_HOST="http://localhost:5432"

# build the lambda
sam build

# loop over lambda invocations
while true; do 
    python create_event.py > example.json
    sam local invoke LogStatusShip --event example.json
    sleep 1
done