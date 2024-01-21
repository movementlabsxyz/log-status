import os
import re
import json
import base64
import gzip
import psycopg2
from psycopg2.extras import execute_batch

# Function to parse log messages
def parse_log(log_message):
    json.loads(log_message)

# Function to process log event
def process_log_event(log_event):
    message = log_event.get('message', '')
    parsed_log = parse_log(message)
    if all(key in parsed_log for key in ['health_check', 'group', 'reason', 'status']):
        parsed_log['status'] = True if parsed_log['status'].upper() == 'PASS' else False
        return parsed_log
    return None

# Function to insert into database
def insert_to_db(log_data):
    conn = None
    try:
        conn = psycopg2.connect(
            dbname=os.environ['DB_NAME'],
            user=os.environ['DB_USER'],
            password=os.environ['DB_PASSWORD'],
            host=os.environ['DB_HOST']
        )
        cursor = conn.cursor()
        query = "INSERT INTO LatestHealthChecks (health_check, group, reason, status) VALUES (%s, %s, %s, %s)"
        execute_batch(cursor, query, [(data['health_check'], data['group'], data['reason'], data['status']) for data in log_data])
        conn.commit()
    except Exception as e:
        print(f"Database error: {e}")
    finally:
        if conn:
            conn.close()

# Lambda handler
def lambda_handler(event, context):
    print(f'Logging Event: {event}')

    cw_data = event['awslogs']['data']
    compressed_payload = base64.b64decode(cw_data)
    uncompressed_payload = gzip.decompress(compressed_payload)
    payload = json.loads(uncompressed_payload)

    log_data = []
    for log_event in payload['logEvents']:
        processed_log = process_log_event(log_event)
        if processed_log:
            print(f"Processed log: {processed_log}")
            log_data.append(processed_log)

    if log_data and all(key in os.environ for key in ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']):
        insert_to_db(log_data)
    else:
        print("No database credentials found, skipping database insert")

    return {
        'statusCode': 200,
        'body': json.dumps('Log processing complete')
    }
