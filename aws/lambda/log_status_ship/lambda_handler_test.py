import create_event
import lambda_handler

def test_lambda_handler():
    lambda_handler.lambda_handler(create_event.cw_event, None)