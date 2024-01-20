#!/bin/bash

# Loki push endpoint
LOKI_ENDPOINT="http://localhost:3100/loki/api/v1/push"

# Function to generate a log entry with the current timestamp
generate_log_entry() {
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.%N") # ISO8601 format with nanoseconds
    timestamp=${timestamp:0:23}Z # Adjust for desired nanosecond precision and append Z

    # Properly formatted JSON payload for Loki
    local logline="{\"streams\": [{ \"stream\": { \"job\": \"your_job\", \"health_check\": \"something\" }, \"values\": [[ \"$timestamp\", \"OK\" ]] }]}"
    
    echo "$logline"
}



# Main loop to generate and push logs
while true; do
    log_entry=$(generate_log_entry)
    
    # Use curl to push the log entry to Loki
    curl -X POST -H "Content-Type: application/json" --data-raw "$log_entry" "$LOKI_ENDPOINT"

    # Wait for a bit before sending the next log (adjust the sleep duration as needed)
    sleep 5
done
