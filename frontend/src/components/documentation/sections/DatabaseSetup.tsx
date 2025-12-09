import React from 'react';
import { Database, Shield, Settings, Server, Lock, AlertTriangle } from 'lucide-react';

const DatabaseSetup: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Setup (PostgreSQL)</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete PostgreSQL database setup, configuration, and optimization guide for BIDUA ERP system 
          with security best practices and performance tuning.
        </p>
      </div>

      {/* Installation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          PostgreSQL Installation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Windows Installation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Download from postgresql.org
# Or use Chocolatey
choco install postgresql --params '/Password:yourpassword'

# Start PostgreSQL service
net start postgresql-x64-14

# Connect to PostgreSQL
psql -U postgres`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">macOS Installation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Using Homebrew
brew install postgresql@14
brew services start postgresql@14

# Or use Postgres.app
# Download from postgresapp.com

# Connect to PostgreSQL
psql postgres`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Linux (Ubuntu) Installation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start and enable service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Connect as postgres user
sudo -u postgres psql`}
            </pre>
          </div>
        </div>
      </div>

      {/* Database Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Database Configuration
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">1. Create Database and User</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Connect as superuser (postgres)
psql -U postgres

-- Create database user
CREATE USER bidua_user WITH PASSWORD 'your_secure_password';

-- Create database
CREATE DATABASE bidua_erp OWNER bidua_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE bidua_erp TO bidua_user;

-- Connect to the new database
\\c bidua_erp

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO bidua_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO bidua_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO bidua_user;

-- Exit
\\q`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">2. PostgreSQL Configuration (postgresql.conf)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Memory Configuration
shared_buffers = 256MB                    # 25% of RAM for small systems
effective_cache_size = 1GB               # 75% of RAM
work_mem = 4MB                           # Memory for sorting operations
maintenance_work_mem = 64MB              # Memory for maintenance operations

# Connection Configuration
max_connections = 100                    # Maximum concurrent connections
listen_addresses = 'localhost'          # Listen on localhost only (development)

# Logging Configuration
log_destination = 'stderr'
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_statement = 'all'                   # Log all statements (development only)
log_duration = on
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '

# Performance Configuration
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">3. Authentication Configuration (pg_hba.conf)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Local connections
local   all             postgres                                peer
local   all             bidua_user                              md5
local   bidua_erp       bidua_user                              md5

# IPv4 local connections
host    all             postgres        127.0.0.1/32           md5
host    bidua_erp       bidua_user      127.0.0.1/32           md5

# IPv6 local connections
host    all             postgres        ::1/128                 md5
host    bidua_erp       bidua_user      ::1/128                 md5`}
            </pre>
          </div>
        </div>
      </div>

      {/* Security Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Password Security</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Set strong password policy
ALTER SYSTEM SET password_encryption = 'scram-sha-256';

-- Create role with limited privileges
CREATE ROLE bidua_app_role;
GRANT CONNECT ON DATABASE bidua_erp TO bidua_app_role;
GRANT USAGE ON SCHEMA public TO bidua_app_role;

-- Grant specific table permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO bidua_app_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO bidua_app_role;

-- Assign role to user
GRANT bidua_app_role TO bidua_user;`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">SSL Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Generate SSL certificates
openssl req -new -x509 -days 365 -nodes -text \\
  -out server.crt -keyout server.key \\
  -subj "/CN=localhost"

# Set permissions
chmod 600 server.key
chown postgres:postgres server.key server.crt

# Update postgresql.conf
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'`}
            </pre>
          </div>
        </div>
      </div>

      {/* Performance Optimization */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Optimization</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Index Creation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create performance indexes
CREATE INDEX CONCURRENTLY idx_users_username ON users(username);
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_employees_department ON employees(department);
CREATE INDEX CONCURRENTLY idx_attendance_employee_date ON attendance_records(employee_id, date);
CREATE INDEX CONCURRENTLY idx_leads_status_stage ON leads(status, stage);
CREATE INDEX CONCURRENTLY idx_tasks_assigned_status ON tasks(assigned_to_employee_id, status);

-- Composite indexes for common queries
CREATE INDEX CONCURRENTLY idx_payroll_employee_month_year ON payroll_records(employee_id, month, year);
CREATE INDEX CONCURRENTLY idx_leave_requests_employee_status ON leave_requests(employee_id, status);`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Connection Pooling with pgBouncer</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Install pgBouncer
sudo apt install pgbouncer

# Configure pgbouncer.ini
[databases]
bidua_erp = host=localhost port=5432 dbname=bidua_erp

[pgbouncer]
listen_port = 6432
listen_addr = 127.0.0.1
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 100
default_pool_size = 20
reserve_pool_size = 5`}
            </pre>
          </div>
        </div>
      </div>

      {/* Backup and Recovery */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup and Recovery</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Backup Scripts</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`#!/bin/bash
# backup.sh - Daily backup script

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/postgresql"
DB_NAME="bidua_erp"
DB_USER="bidua_user"

# Create backup directory
mkdir -p $BACKUP_DIR

# Full database backup
pg_dump -U $DB_USER -h localhost $DB_NAME > \\
  $BACKUP_DIR/bidua_erp_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/bidua_erp_$DATE.sql

# Remove backups older than 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup completed: bidua_erp_$DATE.sql.gz"`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recovery Process</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Stop application services
sudo systemctl stop bidua-backend
sudo systemctl stop bidua-frontend

# Drop and recreate database
dropdb -U postgres bidua_erp
createdb -U postgres -O bidua_user bidua_erp

# Restore from backup
gunzip -c /var/backups/postgresql/bidua_erp_20250115_120000.sql.gz | \\
  psql -U bidua_user -d bidua_erp

# Restart services
sudo systemctl start bidua-backend
sudo systemctl start bidua-frontend`}
            </pre>
          </div>
        </div>
      </div>

      {/* Monitoring and Maintenance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring and Maintenance</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Database Health Monitoring</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Check database size
SELECT 
    pg_database.datname,
    pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database;

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check active connections
SELECT 
    datname,
    count(*) as connections
FROM pg_stat_activity 
GROUP BY datname;

-- Check slow queries
SELECT 
    query,
    mean_exec_time,
    calls
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Maintenance Tasks</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Vacuum and analyze (run weekly)
VACUUM ANALYZE;

-- Reindex tables (run monthly)
REINDEX DATABASE bidua_erp;

-- Update table statistics
ANALYZE;

-- Check for unused indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE idx_scan = 0;`}
            </pre>
          </div>
        </div>
      </div>

      {/* Production Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Production postgresql.conf</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Memory settings (for 4GB RAM server)
shared_buffers = 1GB
effective_cache_size = 3GB
work_mem = 8MB
maintenance_work_mem = 256MB

# Connection settings
max_connections = 200
listen_addresses = '*'

# WAL settings
wal_level = replica
max_wal_size = 2GB
min_wal_size = 80MB
checkpoint_completion_target = 0.9

# Logging (production)
log_destination = 'csvlog'
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_statement = 'ddl'
log_min_duration_statement = 1000`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Production pg_hba.conf</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Local connections
local   all             postgres                                peer
local   bidua_erp       bidua_user                              scram-sha-256

# Application server connections
host    bidua_erp       bidua_user      10.0.0.0/8             scram-sha-256
host    bidua_erp       bidua_user      172.16.0.0/12          scram-sha-256
host    bidua_erp       bidua_user      192.168.0.0/16         scram-sha-256

# SSL connections only
hostssl bidua_erp       bidua_user      0.0.0.0/0              scram-sha-256

# Deny all other connections
host    all             all             0.0.0.0/0              reject`}
            </pre>
          </div>
        </div>
      </div>

      {/* Replication Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">High Availability Setup</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Master Server Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# postgresql.conf on master
wal_level = replica
max_wal_senders = 3
max_replication_slots = 3
synchronous_commit = on
archive_mode = on
archive_command = 'cp %p /var/lib/postgresql/archive/%f'

# Create replication user
CREATE USER replicator REPLICATION LOGIN CONNECTION LIMIT 3 ENCRYPTED PASSWORD 'repl_password';

# pg_hba.conf entry for replication
host replication replicator 192.168.1.0/24 scram-sha-256`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Replica Server Setup</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Stop PostgreSQL on replica
sudo systemctl stop postgresql

# Remove existing data directory
sudo rm -rf /var/lib/postgresql/14/main/*

# Create base backup from master
sudo -u postgres pg_basebackup -h master_ip -D /var/lib/postgresql/14/main \\
  -U replicator -P -v -R -W

# Start replica
sudo systemctl start postgresql

# Verify replication status
SELECT * FROM pg_stat_replication;`}
            </pre>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Troubleshooting Common Issues
        </h3>
        
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Connection Refused</h4>
            <p className="text-sm text-red-800 mb-2">If you can't connect to PostgreSQL:</p>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Check if PostgreSQL service is running: <code>sudo systemctl status postgresql</code></li>
              <li>• Verify listen_addresses in postgresql.conf</li>
              <li>• Check pg_hba.conf for authentication rules</li>
              <li>• Ensure firewall allows port 5432</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Authentication Failed</h4>
            <p className="text-sm text-yellow-800 mb-2">If authentication fails:</p>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Verify username and password</li>
              <li>• Check pg_hba.conf authentication method</li>
              <li>• Ensure user has database access privileges</li>
              <li>• Try connecting as postgres user first</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Performance Issues</h4>
            <p className="text-sm text-blue-800 mb-2">If database is slow:</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Run VACUUM ANALYZE on tables</li>
              <li>• Check for missing indexes</li>
              <li>• Monitor slow query log</li>
              <li>• Adjust memory settings in postgresql.conf</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSetup;