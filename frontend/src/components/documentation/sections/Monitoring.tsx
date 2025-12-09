import React from 'react';
import { Monitor, AlertTriangle, BarChart3, Activity, Bell, Shield } from 'lucide-react';

const Monitoring: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Monitoring & Observability</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive application monitoring, performance tracking, error detection, 
          and observability setup for production BIDUA ERP deployment with real-time alerting.
        </p>
      </div>

      {/* Monitoring Stack */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Monitoring Stack Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Metrics Collection</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Prometheus:</strong> Time-series metrics</li>
              <li>• <strong>Grafana:</strong> Visualization dashboards</li>
              <li>• <strong>Node Exporter:</strong> System metrics</li>
              <li>• <strong>Custom metrics:</strong> Business KPIs</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Log Management</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>ELK Stack:</strong> Elasticsearch, Logstash, Kibana</li>
              <li>• <strong>Fluentd:</strong> Log collection and forwarding</li>
              <li>• <strong>Structured logging:</strong> JSON format</li>
              <li>• <strong>Log aggregation:</strong> Centralized storage</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Error Tracking</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Sentry:</strong> Error monitoring</li>
              <li>• <strong>Error grouping:</strong> Similar error clustering</li>
              <li>• <strong>Performance monitoring:</strong> Transaction tracing</li>
              <li>• <strong>Release tracking:</strong> Error correlation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Application Monitoring */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Performance Monitoring</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">FastAPI Metrics Integration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# app/monitoring/metrics.py
from prometheus_client import Counter, Histogram, Gauge, generate_latest
from fastapi import FastAPI, Request, Response
import time

# Define metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status_code']
)

REQUEST_DURATION = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration',
    ['method', 'endpoint']
)

ACTIVE_USERS = Gauge(
    'active_users_total',
    'Number of active users'
)

DATABASE_CONNECTIONS = Gauge(
    'database_connections_active',
    'Active database connections'
)

# Middleware for automatic metrics collection
async def metrics_middleware(request: Request, call_next):
    start_time = time.time()
    
    # Process request
    response = await call_next(request)
    
    # Record metrics
    duration = time.time() - start_time
    REQUEST_DURATION.labels(
        method=request.method,
        endpoint=request.url.path
    ).observe(duration)
    
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.url.path,
        status_code=response.status_code
    ).inc()
    
    return response

# Custom business metrics
class BusinessMetrics:
    def __init__(self):
        self.leads_created = Counter('leads_created_total', 'Total leads created')
        self.employees_active = Gauge('employees_active_total', 'Active employees')
        self.payroll_processed = Counter('payroll_processed_total', 'Payroll records processed')
        self.attendance_marked = Counter('attendance_marked_total', 'Attendance records marked')
    
    def record_lead_created(self, source: str, assigned_to: str):
        self.leads_created.labels(source=source, assigned_to=assigned_to).inc()
    
    def update_active_employees(self, count: int):
        self.employees_active.set(count)

business_metrics = BusinessMetrics()

# Metrics endpoint
@app.get("/metrics")
async def get_metrics():
    return Response(generate_latest(), media_type="text/plain")`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">React Performance Monitoring</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/monitoring/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Web Vitals monitoring
const sendToAnalytics = (metric: any) => {
  // Send to your analytics service
  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      url: window.location.href,
      timestamp: Date.now()
    })
  }).catch(console.error);
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};

// Custom performance hooks
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Log slow renders
      if (renderTime > 16) { // 60fps threshold
        console.warn(\`Slow render in \${componentName}: \${renderTime.toFixed(2)}ms\`);
        
        // Send to monitoring service
        fetch('/api/analytics/performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            component: componentName,
            renderTime,
            url: window.location.href,
            timestamp: Date.now()
          })
        }).catch(console.error);
      }
    };
  }, [componentName]);
};

// Error boundary with monitoring
export class ErrorBoundaryWithMonitoring extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Send error to monitoring service
    fetch('/api/analytics/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        timestamp: Date.now()
      })
    }).catch(console.error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Alerting System */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Alerting and Notification System
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Prometheus Alerting Rules</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# prometheus/alerts.yml
groups:
  - name: bidua-erp-alerts
    rules:
      # High error rate alert
      - alert: HighErrorRate
        expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors per second"

      # Database connection alert
      - alert: DatabaseConnectionHigh
        expr: database_connections_active > 80
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "High database connection usage"
          description: "Database connections: {{ $value }}/100"

      # Response time alert
      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: "High response time"
          description: "95th percentile response time is {{ $value }}s"

      # Disk space alert
      - alert: DiskSpaceHigh
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) < 0.1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space"
          description: "Disk space usage is above 90%"

      # Memory usage alert
      - alert: HighMemoryUsage
        expr: (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) < 0.1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is above 90%"`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Notification Channels</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# alertmanager/config.yml
global:
  smtp_smarthost: 'smtp.gmail.com:587'
  smtp_from: 'alerts@bidua.com'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'
  routes:
    - match:
        severity: critical
      receiver: 'critical-alerts'
    - match:
        severity: warning
      receiver: 'warning-alerts'

receivers:
  - name: 'critical-alerts'
    email_configs:
      - to: 'admin@bidua.com'
        subject: 'CRITICAL: {{ .GroupLabels.alertname }}'
        body: |
          Alert: {{ .GroupLabels.alertname }}
          Severity: {{ .CommonLabels.severity }}
          Description: {{ range .Alerts }}{{ .Annotations.description }}{{ end }}
    
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#alerts-critical'
        title: 'CRITICAL Alert: {{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'

  - name: 'warning-alerts'
    email_configs:
      - to: 'devops@bidua.com'
        subject: 'WARNING: {{ .GroupLabels.alertname }}'
    
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#alerts-warning'
        title: 'Warning: {{ .GroupLabels.alertname }}'`}
            </pre>
          </div>
        </div>
      </div>

      {/* Health Checks */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Checks & Uptime Monitoring</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Application Health Endpoints</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# app/health.py
from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.database import get_db
import redis
import httpx

router = APIRouter()

@router.get("/health")
async def health_check():
    """Basic health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }

@router.get("/health/detailed")
async def detailed_health_check():
    """Comprehensive health check with dependencies"""
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "checks": {}
    }
    
    # Database health
    try:
        db = next(get_db())
        db.execute(text("SELECT 1"))
        health_status["checks"]["database"] = {
            "status": "healthy",
            "response_time_ms": 5
        }
    except Exception as e:
        health_status["checks"]["database"] = {
            "status": "unhealthy",
            "error": str(e)
        }
        health_status["status"] = "unhealthy"
    
    # Redis health
    try:
        redis_client = redis.Redis(host='redis', port=6379, db=0)
        redis_client.ping()
        health_status["checks"]["redis"] = {
            "status": "healthy",
            "response_time_ms": 2
        }
    except Exception as e:
        health_status["checks"]["redis"] = {
            "status": "unhealthy",
            "error": str(e)
        }
    
    # External API health
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get("https://api.external-service.com/health", timeout=5)
            health_status["checks"]["external_api"] = {
                "status": "healthy" if response.status_code == 200 else "degraded",
                "response_time_ms": response.elapsed.total_seconds() * 1000
            }
    except Exception as e:
        health_status["checks"]["external_api"] = {
            "status": "unhealthy",
            "error": str(e)
        }
    
    if health_status["status"] == "unhealthy":
        raise HTTPException(status_code=503, detail=health_status)
    
    return health_status

@router.get("/ready")
async def readiness_check():
    """Kubernetes readiness probe"""
    # Check if application is ready to serve traffic
    checks = await detailed_health_check()
    
    critical_services = ["database", "redis"]
    for service in critical_services:
        if checks["checks"][service]["status"] != "healthy":
            raise HTTPException(status_code=503, detail="Service not ready")
    
    return {"status": "ready"}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Uptime Monitoring Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# monitoring/uptime-checks.yml
# Prometheus blackbox exporter configuration
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]
      valid_status_codes: [200]
      method: GET
      headers:
        User-Agent: "Prometheus-Blackbox-Exporter"
      fail_if_ssl: false
      fail_if_not_ssl: true

  http_post_2xx:
    prober: http
    timeout: 5s
    http:
      method: POST
      headers:
        Content-Type: application/json
      body: '{"health": "check"}'

# Prometheus scrape config
scrape_configs:
  - job_name: 'blackbox'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
        - https://bidua.com
        - https://api.bidua.com/health
        - https://api.bidua.com/docs
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115`}
            </pre>
          </div>
        </div>
      </div>

      {/* Dashboard Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring Dashboards</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Grafana Dashboard JSON</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "dashboard": {
    "title": "BIDUA ERP - Application Overview",
    "tags": ["bidua", "erp", "application"],
    "timezone": "browser",
    "panels": [
      {
        "title": "Request Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "Requests/sec"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "thresholds": {
              "steps": [
                {"color": "green", "value": null},
                {"color": "yellow", "value": 50},
                {"color": "red", "value": 100}
              ]
            }
          }
        }
      },
      {
        "title": "Response Time (95th percentile)",
        "type": "timeseries",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "timeseries",
        "targets": [
          {
            "expr": "rate(http_requests_total{status_code=~\"5..\"}[5m]) / rate(http_requests_total[5m])",
            "legendFormat": "Error rate"
          }
        ]
      },
      {
        "title": "Active Users",
        "type": "stat",
        "targets": [
          {
            "expr": "active_users_total",
            "legendFormat": "Active Users"
          }
        ]
      },
      {
        "title": "Database Connections",
        "type": "gauge",
        "targets": [
          {
            "expr": "database_connections_active",
            "legendFormat": "Active Connections"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "min": 0,
            "max": 100,
            "thresholds": {
              "steps": [
                {"color": "green", "value": null},
                {"color": "yellow", "value": 70},
                {"color": "red", "value": 90}
              ]
            }
          }
        }
      }
    ],
    "time": {
      "from": "now-1h",
      "to": "now"
    },
    "refresh": "30s"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Log Analysis */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Analysis & Troubleshooting</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Structured Logging</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# app/logging_config.py
import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno
        }
        
        # Add extra fields if present
        if hasattr(record, 'user_id'):
            log_entry["user_id"] = record.user_id
        if hasattr(record, 'request_id'):
            log_entry["request_id"] = record.request_id
        if hasattr(record, 'execution_time'):
            log_entry["execution_time"] = record.execution_time
            
        return json.dumps(log_entry)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('/var/log/bidua-erp/app.log')
    ]
)

# Add JSON formatter
for handler in logging.root.handlers:
    handler.setFormatter(JSONFormatter())

# Usage in application
logger = logging.getLogger(__name__)

async def create_employee(employee_data: dict, current_user: User):
    logger.info(
        "Creating new employee",
        extra={
            "user_id": current_user.id,
            "employee_data": employee_data,
            "action": "employee_create"
        }
    )`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Log Analysis Queries</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Kibana/Elasticsearch queries for common issues

# Find all errors in the last hour
{
  "query": {
    "bool": {
      "must": [
        {"term": {"level": "ERROR"}},
        {"range": {"timestamp": {"gte": "now-1h"}}}
      ]
    }
  },
  "sort": [{"timestamp": {"order": "desc"}}]
}

# Find slow API requests (>1 second)
{
  "query": {
    "bool": {
      "must": [
        {"exists": {"field": "execution_time"}},
        {"range": {"execution_time": {"gte": 1000}}}
      ]
    }
  },
  "aggs": {
    "slow_endpoints": {
      "terms": {"field": "endpoint.keyword"}
    }
  }
}

# User activity analysis
{
  "query": {
    "bool": {
      "must": [
        {"term": {"action": "login"}},
        {"range": {"timestamp": {"gte": "now-24h"}}}
      ]
    }
  },
  "aggs": {
    "users_by_hour": {
      "date_histogram": {
        "field": "timestamp",
        "calendar_interval": "hour"
      }
    }
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;