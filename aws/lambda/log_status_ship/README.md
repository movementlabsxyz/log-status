# `log_status_ship`
Ships logs to the log status service.

## Development

You may need to re-authenticate with ECR:
```bash
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
```

### MacOS
You may need to link the docker socket to `/var/run/docker.sock`:

```bash
sudo ln -sf "$HOME/.docker/run/docker.sock" /var/run/docker.sock
```