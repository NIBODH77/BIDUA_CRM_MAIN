import React from 'react';
import { Server, Globe, Shield, Monitor, Package, Cloud } from 'lucide-react';

const DeploymentOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Deployment Overview</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive deployment strategies and infrastructure options for BIDUA ERP system 
          with scalability considerations, security best practices, and cost optimization.
        </p>
      </div>

      {/* Deployment Architecture */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Server className="w-5 h-5 mr-2" />
          Deployment Architecture Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Traditional VPS</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Single server deployment</li>
              <li>• Docker containers</li>
              <li>• Nginx reverse proxy</li>
              <li>• PostgreSQL on same server</li>
              <li>• SSL with Let's Encrypt</li>
            </ul>
            <div className="mt-3 text-xs text-green-600">
              <strong>Best for:</strong> Small to medium deployments
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Cloud Native</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Kubernetes orchestration</li>
              <li>• Managed database services</li>
              <li>• CDN for static assets</li>
              <li>• Auto-scaling groups</li>
              <li>• Load balancers</li>
            </ul>
            <div className="mt-3 text-xs text-blue-600">
              <strong>Best for:</strong> Large scale, high availability
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Serverless</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Function-as-a-Service</li>
              <li>• Static site hosting</li>
              <li>• Managed databases</li>
              <li>• Event-driven architecture</li>
              <li>• Pay-per-use pricing</li>
            </ul>
            <div className="mt-3 text-xs text-purple-600">
              <strong>Best for:</strong> Variable workloads, cost optimization
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Provider Comparison */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cloud Provider Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AWS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Google Cloud</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Azure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DigitalOcean</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Container Hosting</td>
                <td className="px-6 py-4 text-sm text-gray-600">ECS Fargate</td>
                <td className="px-6 py-4 text-sm text-gray-600">Cloud Run</td>
                <td className="px-6 py-4 text-sm text-gray-600">Container Instances</td>
                <td className="px-6 py-4 text-sm text-gray-600">App Platform</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Database</td>
                <td className="px-6 py-4 text-sm text-gray-600">RDS PostgreSQL</td>
                <td className="px-6 py-4 text-sm text-gray-600">Cloud SQL</td>
                <td className="px-6 py-4 text-sm text-gray-600">Azure Database</td>
                <td className="px-6 py-4 text-sm text-gray-600">Managed Databases</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Static Hosting</td>
                <td className="px-6 py-4 text-sm text-gray-600">S3 + CloudFront</td>
                <td className="px-6 py-4 text-sm text-gray-600">Cloud Storage + CDN</td>
                <td className="px-6 py-4 text-sm text-gray-600">Blob Storage + CDN</td>
                <td className="px-6 py-4 text-sm text-gray-600">Spaces + CDN</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Load Balancer</td>
                <td className="px-6 py-4 text-sm text-gray-600">Application LB</td>
                <td className="px-6 py-4 text-sm text-gray-600">Cloud Load Balancing</td>
                <td className="px-6 py-4 text-sm text-gray-600">Application Gateway</td>
                <td className="px-6 py-4 text-sm text-gray-600">Load Balancers</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Monitoring</td>
                <td className="px-6 py-4 text-sm text-gray-600">CloudWatch</td>
                <td className="px-6 py-4 text-sm text-gray-600">Cloud Monitoring</td>
                <td className="px-6 py-4 text-sm text-gray-600">Azure Monitor</td>
                <td className="px-6 py-4 text-sm text-gray-600">Monitoring</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployment Strategies */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deployment Strategies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Blue-Green Deployment</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Blue-Green deployment script
#!/bin/bash

# Current environment (blue or green)
CURRENT_ENV=$(kubectl get service bidua-app -o jsonpath='{.spec.selector.version}')
NEW_ENV=$([ "$CURRENT_ENV" = "blue" ] && echo "green" || echo "blue")

echo "Current environment: $CURRENT_ENV"
echo "Deploying to: $NEW_ENV"

# Deploy new version
kubectl set image deployment/bidua-app-$NEW_ENV \\
  frontend=bidua/frontend:$BUILD_NUMBER \\
  backend=bidua/backend:$BUILD_NUMBER

# Wait for deployment to be ready
kubectl rollout status deployment/bidua-app-$NEW_ENV

# Run health checks
kubectl exec deployment/bidua-app-$NEW_ENV -- curl -f http://localhost:8000/health

# Switch traffic to new environment
kubectl patch service bidua-app -p '{"spec":{"selector":{"version":"'$NEW_ENV'"}}}'

echo "Deployment completed successfully"
echo "Previous environment ($CURRENT_ENV) is still running for rollback"`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Rolling Deployment</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Rolling deployment configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bidua-backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: bidua-backend
  template:
    metadata:
      labels:
        app: bidua-backend
    spec:
      containers:
      - name: backend
        image: bidua/backend:latest
        ports:
        - containerPort: 8000
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 10
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"`}
            </pre>
          </div>
        </div>
      </div>

      {/* Infrastructure as Code */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure as Code</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Terraform Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# terraform/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC and networking
resource "aws_vpc" "bidua_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "bidua-erp-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "public_subnets" {
  count             = 2
  vpc_id            = aws_vpc.bidua_vpc.id
  cidr_block        = "10.0.\${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  map_public_ip_on_launch = true

  tags = {
    Name = "bidua-public-subnet-\${count.index + 1}"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "bidua_cluster" {
  name = "bidua-erp-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "bidua_db" {
  identifier = "bidua-erp-db"
  
  engine         = "postgres"
  engine_version = "14.9"
  instance_class = "db.t3.micro"
  
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = true
  
  db_name  = "bidua_erp"
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.bidua_db_subnet_group.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = false
  final_snapshot_identifier = "bidua-erp-final-snapshot"

  tags = {
    Name = "bidua-erp-database"
    Environment = var.environment
  }
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Docker Compose Production</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    restart: unless-stopped
    depends_on:
      - backend
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(\`bidua.com\`)"
      - "traefik.http.routers.frontend.tls=true"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    restart: unless-stopped
    environment:
      - DATABASE_URL=postgresql://\${DB_USER}:\${DB_PASSWORD}@db:5432/\${DB_NAME}
      - SECRET_KEY=\${SECRET_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.backend.rule=Host(\`api.bidua.com\`)"
      - "traefik.http.routers.backend.tls=true"

  db:
    image: postgres:14
    restart: unless-stopped
    environment:
      - POSTGRES_DB=\${DB_NAME}
      - POSTGRES_USER=\${DB_USER}
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  traefik:
    image: traefik:v2.10
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik:/etc/traefik
      - traefik_certs:/certs
    command:
      - --api.dashboard=true
      - --providers.docker=true
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencrypt.acme.email=admin@bidua.com
      - --certificatesresolvers.letsencrypt.acme.storage=/certs/acme.json
      - --certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web

volumes:
  postgres_data:
  redis_data:
  traefik_certs:`}
            </pre>
          </div>
        </div>
      </div>

      {/* Scaling Strategies */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scaling Strategies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Horizontal Scaling</h4>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-900 text-sm">Application Tier</h5>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Multiple backend instances</li>
                  <li>• Load balancer distribution</li>
                  <li>• Session-less design</li>
                  <li>• Auto-scaling based on CPU/memory</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-semibold text-green-900 text-sm">Database Tier</h5>
                <ul className="text-xs text-green-800 space-y-1">
                  <li>• Read replicas for queries</li>
                  <li>• Connection pooling</li>
                  <li>• Query optimization</li>
                  <li>• Caching layer (Redis)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Vertical Scaling</h4>
            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-semibold text-purple-900 text-sm">Resource Optimization</h5>
                <ul className="text-xs text-purple-800 space-y-1">
                  <li>• CPU and memory upgrades</li>
                  <li>• SSD storage for databases</li>
                  <li>• Network bandwidth increase</li>
                  <li>• Container resource limits</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <h5 className="font-semibold text-orange-900 text-sm">Performance Tuning</h5>
                <ul className="text-xs text-orange-800 space-y-1">
                  <li>• Database query optimization</li>
                  <li>• Application code profiling</li>
                  <li>• Memory usage optimization</li>
                  <li>• I/O performance tuning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Considerations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Deployment Practices
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Network Security</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• VPC with private subnets</li>
              <li>• Security groups and NACLs</li>
              <li>• WAF for application protection</li>
              <li>• DDoS protection</li>
              <li>• SSL/TLS encryption</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Application Security</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Environment variable encryption</li>
              <li>• Secret management systems</li>
              <li>• Container image scanning</li>
              <li>• Runtime security monitoring</li>
              <li>• Regular security updates</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Data Security</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Database encryption at rest</li>
              <li>• Encrypted backups</li>
              <li>• Access logging and auditing</li>
              <li>• Data retention policies</li>
              <li>• GDPR compliance measures</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cost Optimization */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Optimization Strategies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Resource Optimization</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>Right-sizing:</strong> Match resources to actual usage</li>
              <li>• <strong>Auto-scaling:</strong> Scale down during low usage</li>
              <li>• <strong>Spot instances:</strong> Use for non-critical workloads</li>
              <li>• <strong>Reserved instances:</strong> Long-term cost savings</li>
              <li>• <strong>Storage optimization:</strong> Lifecycle policies for data</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Monitoring & Alerts</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>Cost monitoring:</strong> Track spending by service</li>
              <li>• <strong>Budget alerts:</strong> Notifications for overspend</li>
              <li>• <strong>Usage analytics:</strong> Identify optimization opportunities</li>
              <li>• <strong>Resource tagging:</strong> Cost allocation by department</li>
              <li>• <strong>Regular reviews:</strong> Monthly cost optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentOverview;