CREATE TABLE IF NOT EXISTS LatestHealthChecks (
    PRIMARY KEY (health_check, "group"),
    health_check VARCHAR(255),
    "group" VARCHAR(255),
    status BOOLEAN,
    reason TEXT
);

-- Add health checks
INSERT INTO LatestHealthChecks (health_check, "group", status, reason) VALUES 
('db', 'database', true, 'Database is up and running'),
('users-table', 'database', false, 'Did not find users table'),
('super-admin', 'database', false, 'Did not find super admin user'),
('redis', 'database', true, 'Redis is up and running'),
('rabbitmq', 'queue', false, 'RabbitMQ is not up and running'),
('api-gateway', 'network', true, 'API Gateway operational'),
('disk-space', 'hardware', false, 'Disk space is below threshold'),
('memory-usage', 'hardware', true, 'Memory usage is within acceptable limits'),
('user-auth-service', 'services', true, 'User authentication service is working'),
('email-service', 'services', false, 'Email service is down'),
('load-balancer', 'network', true, 'Load balancer is distributing traffic'),
('backup-system', 'storage', false, 'Backup system failed last check'),
('db-1', 'group-1', true, 'Database is up and running'),
('users-table-1', 'group-1', false, 'Users table is missing'),
('cache-1', 'group-1', true, 'Cache is operational'),
('db-2', 'group-2', false, 'Database is down'),
('users-table-2', 'group-2', true, 'Users table is operational'),
('cache-2', 'group-2', true, 'Cache is operational'),
('db-3', 'group-3', true, 'Database is up and running'),
('users-table-3', 'group-3', true, 'Users table is operational'),
('cache-3', 'group-3', false, 'Cache is down'),
('db-4', 'group-4', true, 'Database is up and running'),
('users-table-4', 'group-4', false, 'Users table is missing'),
('cache-4', 'group-4', true, 'Cache is operational'),
('db-5', 'group-5', false, 'Database connectivity issues'),
('users-table-5', 'group-5', true, 'Users table is operational'),
('cache-5', 'group-5', true, 'Cache is operational');