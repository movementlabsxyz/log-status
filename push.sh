#!/bin/bash
# build for arm and x86
docker buildx build --platform linux/amd64,linux/arm64 -t mvlbs/log-status-page . --push