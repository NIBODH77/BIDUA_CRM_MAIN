import React from 'react';
import { Server, Globe, Shield, Monitor, Package, Settings } from 'lucide-react';

const DeploymentGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Deployment Guide</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete production deployment guide for BIDUA ERP system covering containerization, 
          cloud deployment, CI/CD pipelines, and production best practices.
        </p>
      </div>

      {/* Docker Containerization */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Docker Containerization
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Frontend Dockerfile</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Backend Dockerfile</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    gcc \\
    libpq-dev \\
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \\
    && chown -R app:app /app
USER app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Production Docker Compose</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://bidua_user:\${DB_PASSWORD}@db:5432/bidua_erp
      - SECRET_KEY=\${SECRET_KEY}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=bidua_erp
      - POSTGRES_USER=bidua_user
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  postgres_data:`}
            </pre>
          </div>
        </div>
      </div>

      {/* Cloud Deployment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Cloud Deployment Options
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">AWS Deployment</h4>
            <ul className="text-sm text-orange-800 space-y-2">
              <li>• <strong>ECS Fargate:</strong> Container orchestration</li>
              <li>• <strong>RDS PostgreSQL:</strong> Managed database</li>
              <li>• <strong>CloudFront:</strong> CDN for frontend</li>
              <li>• <strong>Application Load Balancer:</strong> Traffic distribution</li>
              <li>• <strong>Route 53:</strong> DNS management</li>
              <li>• <strong>CloudWatch:</strong> Monitoring and logging</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Google Cloud Platform</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• <strong>Cloud Run:</strong> Serverless containers</li>
              <li>• <strong>Cloud SQL:</strong> Managed PostgreSQL</li>
              <li>• <strong>Cloud CDN:</strong> Content delivery</li>
              <li>• <strong>Cloud Load Balancing:</strong> Traffic management</li>
              <li>• <strong>Cloud DNS:</strong> Domain management</li>
              <li>• <strong>Cloud Monitoring:</strong> Observability</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-3">Azure Deployment</h4>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>• <strong>Container Instances:</strong> Container hosting</li>
              <li>• <strong>Azure Database:</strong> PostgreSQL service</li>
              <li>• <strong>Azure CDN:</strong> Content delivery</li>
              <li>• <strong>Application Gateway:</strong> Load balancing</li>
              <li>• <strong>Azure DNS:</strong> Domain services</li>
              <li>• <strong>Azure Monitor:</strong> Application insights</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CI/CD Pipeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CI/CD Pipeline Setup</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">GitHub Actions Workflow</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# .github/workflows/deploy.yml
name: Deploy BIDUA ERP

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install frontend dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Install backend dependencies
      run: |
        cd backend
        pip install -r requirements.txt
    
    - name: Run frontend tests
      run: |
        cd frontend
        npm run test
        npm run build
    
    - name: Run backend tests
      run: |
        cd backend
        pytest
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        # Add your deployment commands here
        echo "Deploying to production..."`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Deployment Script</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`#!/\\/bin\\/bash
# deploy.sh - Production deployment script

set -e

echo "Starting BIDUA ERP deployment..."

# Pull latest changes
git pull origin main

# Build and deploy with zero downtime
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d --no-deps backend
docker-compose -f docker-compose.prod.yml up -d --no-deps frontend

# Run database migrations
docker-compose -f docker-compose.prod.yml exec backend alembic upgrade head

# Health check
sleep 30
curl -f http://localhost:8000/health || exit 1

# Clean up old images
docker image prune -f

echo "Deployment completed successfully!"`}
            </pre>
          </div>
        </div>
      </div>

      {/* SSL and Security */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          SSL and Security Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Let's Encrypt SSL</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{"# Install Certbot\nsudo apt install certbot python3-certbot-nginx\n\n# Obtain SSL certificate\nsudo certbot --nginx -d yourdomain.com -d www.yourdomain.com\n\n# Auto-renewal setup\nsudo crontab -e\n# Add line:\n0 12 * * * /usr/bin/certbot renew --quiet"}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Nginx SSL Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{"# nginx.conf\nserver {\n    listen 443 ssl http2;\n    server_name yourdomain.com;\n\n    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;\n    \n    ssl_protocols TLSv1.2 TLSv1.3;\n    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;\n    ssl_prefer_server_ciphers off;\n    \n    location / {\n        root /usr/share/nginx/html;\n        try_files $uri $uri/ /index.html;\n    }\n    \n    location /api {\n        proxy_pass http://backend:8000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}"}
            </pre>
          </div>
        </div>
      </div>

      {/* Monitoring Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Production Monitoring
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Health Check Endpoints</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{"# Add to FastAPI main.py\n@app.get(\"/health\")\nasync def health_check():\n    return {\n        \"status\": \"healthy\",\n        \"timestamp\": datetime.utcnow().isoformat(),\n        \"version\": \"1.0.0\",\n        \"database\": await check_db_health(),\n        \"redis\": await check_redis_health()\n    }\n\n@app.get(\"/ready\")\nasync def readiness_check():\n    # Check if all dependencies are ready\n    checks = {\n        \"database\": await check_db_health(),\n        \"migrations\": await check_migrations(),\n        \"external_apis\": await check_external_services()\n    }\n    \n    if all(checks.values()):\n        return {\"status\": \"ready\", \"checks\": checks}\n    else:\n        raise HTTPException(status_code=503, detail=\"Service not ready\")"}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Monitoring with Prometheus</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{"# docker-compose.monitoring.yml\nversion: '3.8'\n\nservices:\n  prometheus:\n    image: prom/prometheus\n    ports:\n      - \"9090:9090\"\n    volumes:\n      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml\n      - prometheus_data:/prometheus\n\n  grafana:\n    image: grafana/grafana\n    ports:\n      - \"3000:3000\"\n    environment:\n      - GF_SECURITY_ADMIN_PASSWORD=admin\n    volumes:\n      - grafana_data:/var/lib/grafana\n      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards\n\nvolumes:\n  prometheus_data:\n  grafana_data:"}
            </pre>
          </div>
        </div>
      </div>

      {/* Environment Management */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Development</h4>
            <div className="bg-green-50 p-3 rounded-lg">
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Local development servers</li>
                <li>• Hot reload enabled</li>
                <li>• Debug logging</li>
                <li>• Mock data available</li>
                <li>• CORS enabled for localhost</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Staging</h4>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Production-like environment</li>
                <li>• SSL certificates</li>
                <li>• Performance monitoring</li>
                <li>• Load testing</li>
                <li>• Integration testing</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Production</h4>
            <div className="bg-red-50 p-3 rounded-lg">
              <ul className="text-sm text-red-800 space-y-1">
                <li>• High availability setup</li>
                <li>• Auto-scaling enabled</li>
                <li>• Comprehensive monitoring</li>
                <li>• Automated backups</li>
                <li>• Security hardening</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scaling Strategies */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scaling Strategies</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Horizontal Scaling</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{"# Kubernetes deployment\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: bidua-backend\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: bidua-backend\n  template:\n    metadata:\n      labels:\n        app: bidua-backend\n    spec:\n      containers:\n      - name: backend\n        image: bidua/backend:latest\n        ports:\n        - containerPort: 8000\n        env:\n        - name: DATABASE_URL\n          valueFrom:\n            secretKeyRef:\n              name: db-secret\n              key: url\n        resources:\n          requests:\n            memory: \"256Mi\"\n            cpu: \"250m\"\n          limits:\n            memory: \"512Mi\"\n            cpu: \"500m\""}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Load Balancer Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{"# nginx load balancer\nupstream backend_servers {\n    least_conn;\n    server backend1:8000 max_fails=3 fail_timeout=30s;\n    server backend2:8000 max_fails=3 fail_timeout=30s;\n    server backend3:8000 max_fails=3 fail_timeout=30s;\n}\n\nserver {\n    listen 80;\n    server_name api.bidua.com;\n    \n    location / {\n        proxy_pass http://backend_servers;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        \n        # Health check\n        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;\n    }\n}"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentGuide;