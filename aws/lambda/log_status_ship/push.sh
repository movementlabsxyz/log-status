#!/bin/bash
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
# build for arm and x86
docker buildx build --platform linux/amd64,linux/arm64 -t mvlbs/log-status-lambda-ship . --push