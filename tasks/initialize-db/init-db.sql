CREATE TABLE IF NOT EXISTS LatestHealthChecks (
    PRIMARY KEY (health_check, "group"),
    health_check VARCHAR(255),
    "group" VARCHAR(255),
    status BOOLEAN,
    reason TEXT
);

-- Add health checks
INSERT INTO LatestHealthChecks (health_check, "group", status, reason) VALUES 
('log-table-creation', 'LogStatus', true, 'Pipeline was able to initialize LogStatus table.');
