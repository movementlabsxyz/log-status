#!/usr/bin/env python3

import random
import requests
import time
from datetime import datetime

LOKI_ENDPOINT = "http://localhost:3100/loki/api/v1/push"

def generate_log_entry():
    timestamp = str(time.time_ns())

    # Randomize the status
    status = random.choice(["PASS", "FAIL"])

    # Define a list of possible reasons and randomly select one
    reasons = ["No reason", "Timeout Error", "Resource Unavailable", "Validation Failed", "Unknown Error"]
    reason = random.choice(reasons) if status == "FAIL" else "No reason"

    # Define a list of possible group names and randomly select one
    group_names = ["m1", "m2", "m3", "m4", "m5"]
    group = random.choice(group_names)
    
    health_check_names = ["aptos-framework", "aptos-frontend", "aptos-backend"]
    health_check = random.choice(health_check_names)

    # Construct a JSON payload for Loki
    logline = {
        "streams": [
            {
                "stream": {
                    "health_check": health_check,
                    "group": group,
                    "status": status,
                    "reason": reason
                },
                "values": [
                    [timestamp, "Group: " + group + "; Status: " + status + "; Reason: " + reason],
                ]
            }
        ]
    }

    return logline


# Main loop to generate and push logs
while True:
    log_entry = generate_log_entry()

    # Use requests to push the log entry to Loki
    response = requests.post(LOKI_ENDPOINT, json=log_entry)

    if not response.ok:
        print("Failed to send log to Loki:", response.text)

    # Wait for a bit before sending the next log (adjust the sleep duration as needed)
    time.sleep(1)
