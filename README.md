# `LogStatus`
`LogStatus` log status is collection of tools for serving a status page based on logging messages.

## Next.js Site
The `LogStatus` is built using Next.js to serve SSR sites and safely control access to underlying database resources. 

### Parameters
- `$POSTGRES_HOST`: The hostname for the Postgres database.
- `$POSTGRES_PORT`: The port for the Postgres database.
- `$POSTGRES_DB`: The database name for the Postgres database.
- `$POSTGRES_USER`: The username for the Postgres database access.
- `$POSTGRES_PASSWORD`: The password for the Postgres database access.
- `$TITLE`: The title for the status page.
- `$LOGO_URL`: The URL for the logo image.
- `$REGION`: The region for the status page.
- `$DISCORD_URL`: The URL for a Discord server.
- `$ATLASSIAN_URL`: The URL for an Atlassian status page.
- `$GITHUB_URL`: The URL for a GitHub repository.
- `$PAGE_SIZE`: The maximum number of log groups to display per page.