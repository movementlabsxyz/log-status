FROM public.ecr.aws/lambda/python:3.10

# Copy function code and requirements.txt
COPY lambda_handler.py requirements.txt ./

# Install the function's dependencies
RUN pip install --upgrade pip
RUN pip install psycopg2-binary
RUN python -m pip install -r requirements.txt

# Set the CMD to your handler
CMD ["lambda_handler.lambda_handler"]
