import json
import gzip
import base64

# Sample log data
log_data = {
  "messageType": "DATA_MESSAGE",
  "owner": "123456789012",
  "logGroup": "/aws/lambda/example",
  "logStream": "2024/01/20/[$LATEST]abcdefgh",
  "subscriptionFilters": ["LambdaStream"],
  "logEvents": [
    {
      "id": "eventId1",
      "timestamp": 1611827745000,
      
      # change this to your log message
      "message": json.dumps({
        "health_check": "example",
        "group": "example",
        "reason": "example",
        "status": "example"
      })
    },
    {
      "id": "eventId2",
      "timestamp": 1611827745001,
      
      # change this to your log message
      "message": "This log message should not be included in the database"
    }
  ]
}

# Compress and encode
compressed_data = gzip.compress(json.dumps(log_data).encode())
encoded_data = base64.b64encode(compressed_data).decode()

# CloudWatch Logs event
cw_event = {"awslogs": {"data": encoded_data}}
print(json.dumps(cw_event))
