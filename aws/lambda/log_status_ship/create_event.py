import json
import gzip
import base64
import random

# Sample log data
log_data = {
    "messageType": "DATA_MESSAGE",
    "owner": "123456789012",
    "logGroup": "/aws/lambda/example",
    "logStream": "2024/01/20/[$LATEST]abcdefgh",
    "subscriptionFilters": ["LambdaStream"],
    "logEvents": []
}

# Function to create a random health check message
def random_health_check_message():
    health_checks = ["server", "database", "network", "application"]
    groups = ["group1", "group2", "group3"]
    reasons = ["maintenance", "update", "error", "[outage](https://www.example.com))"]
    statuses = ["PASS", "FAIL"]

    return json.dumps({
        "health_check": random.choice(health_checks),
        "group": random.choice(groups),
        "reason": random.choice(reasons),
        "status": random.choice(statuses)
    })

# Adding random log events
for i in range(1, 6):
    if i % 2 == 0:  # Add a randomized health check log
        log_data["logEvents"].append({
            "id": f"eventId{i}",
            "timestamp": 1611827745000 + i,
            "message": random_health_check_message()
        })
    else:  # Add a different format log
        log_data["logEvents"].append({
            "id": f"eventId{i}",
            "timestamp": 1611827745000 + i,
            "message": f"Random log message {i}"
        })

# Compress and encode
compressed_data = gzip.compress(json.dumps(log_data).encode())
encoded_data = base64.b64encode(compressed_data).decode()

# CloudWatch Logs event
cw_event = {"awslogs": {"data": encoded_data}}
print(json.dumps(cw_event))
