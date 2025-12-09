import React from 'react';
import { Zap, Monitor, Database, Globe, Target, TrendingUp } from 'lucide-react';

const PerformanceOptimization: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Performance Optimization</h1>
        <p className="text-lg text-gray-600 mb-6">
          Advanced performance optimization techniques for React frontend, FastAPI backend, 
          and PostgreSQL database to ensure optimal system performance and user experience.
        </p>
      </div>

      {/* Performance Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Performance Optimization Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Frontend Optimization</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bundle size optimization</li>
              <li>• Code splitting and lazy loading</li>
              <li>• Image optimization</li>
              <li>• Caching strategies</li>
              <li>• React performance patterns</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Backend Optimization</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Async programming</li>
              <li>• Database query optimization</li>
              <li>• Response caching</li>
              <li>• Connection pooling</li>
              <li>• Memory management</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Infrastructure Optimization</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• CDN configuration</li>
              <li>• Load balancing</li>
              <li>• Auto-scaling</li>
              <li>• Resource monitoring</li>
              <li>• Network optimization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Frontend Performance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Frontend Performance Optimization
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Bundle Optimization</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// vite.config.ts - Production optimization
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ],
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          
          // Feature chunks
          crm: [
            './src/components/crm/CRMModule',
            './src/components/crm/LeadsManagement',
            './src/components/crm/SalesPipeline'
          ],
          hrms: [
            './src/components/hrms/HRMSModule',
            './src/components/hrms/EmployeeManagement',
            './src/components/hrms/AttendanceManagement'
          ],
          employee: [
            './src/components/employee/EmployeePortal',
            './src/components/employee/EmployeeDashboard'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react']
  }
});`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">React Performance Patterns</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Performance optimized component patterns
import React, { memo, useMemo, useCallback, startTransition } from 'react';

// 1. Memoized component with shallow comparison
const EmployeeCard = memo(({ employee, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(employee);
  }, [employee, onSelect]);

  return (
    <div onClick={handleClick} className="employee-card">
      <h3>{employee.name}</h3>
      <p>{employee.designation}</p>
    </div>
  );
});

// 2. Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedEmployeeList = ({ employees }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <EmployeeCard employee={employees[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={employees.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
};

// 3. Debounced search with transitions
const SearchableEmployeeList = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deferredSearchTerm, setDeferredSearchTerm] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setDeferredSearchTerm(searchTerm);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredEmployees = useMemo(() => {
    if (!deferredSearchTerm) return employees;
    
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [employees, deferredSearchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search employees..."
      />
      <VirtualizedEmployeeList employees={filteredEmployees} />
    </div>
  );
};

// 4. Optimized data fetching with SWR pattern
const useEmployees = (filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = useMemo(() => 
    \`employees-\${JSON.stringify(filters)}\`, [filters]
  );

  useEffect(() => {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    const fetchEmployees = async () => {
      try {
        const response = await apiService.getEmployees(filters);
        setData(response.data);
        sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [cacheKey]);

  return { data, loading, error };
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Backend Performance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Backend Performance Optimization
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">FastAPI Optimization</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# app/performance/optimization.py
from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import aioredis
from functools import wraps
import time

app = FastAPI()

# Add compression middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Redis connection pool
redis_pool = None

async def get_redis():
    global redis_pool
    if redis_pool is None:
        redis_pool = aioredis.ConnectionPool.from_url(
            "redis://localhost:6379",
            max_connections=20
        )
    return aioredis.Redis(connection_pool=redis_pool)

# Caching decorator
def cache_response(expiry: int = 300):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate cache key
            cache_key = f"{func.__name__}:{hash(str(args) + str(kwargs))}"
            
            redis = await get_redis()
            cached_result = await redis.get(cache_key)
            
            if cached_result:
                return json.loads(cached_result)
            
            # Execute function and cache result
            result = await func(*args, **kwargs)
            await redis.setex(cache_key, expiry, json.dumps(result, default=str))
            
            return result
        return wrapper
    return decorator

# Optimized endpoint with caching
@app.get("/employees")
@cache_response(expiry=300)  # Cache for 5 minutes
async def get_employees(
    page: int = 1,
    limit: int = 20,
    department: str = None,
    db: Session = Depends(get_db)
):
    # Use efficient query with joins
    query = db.query(Employee).options(
        selectinload(Employee.user),  # Eager load user data
        selectinload(Employee.manager)  # Eager load manager data
    )
    
    if department:
        query = query.filter(Employee.department == department)
    
    # Use offset pagination with limit
    total = query.count()
    employees = query.offset((page - 1) * limit).limit(limit).all()
    
    return {
        "employees": employees,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit
        }
    }

# Background task processing
@app.post("/payroll/process")
async def process_payroll(
    payroll_data: PayrollRequest,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user)
):
    # Start background processing
    background_tasks.add_task(
        process_payroll_async,
        payroll_data,
        current_user.id
    )
    
    return {
        "message": "Payroll processing started",
        "job_id": f"payroll_{int(time.time())}"
    }

async def process_payroll_async(payroll_data: PayrollRequest, user_id: str):
    """Process payroll in background to avoid blocking"""
    try:
        # Heavy processing logic here
        await asyncio.sleep(0.1)  # Yield control
        # ... payroll calculations
        
        # Send notification when complete
        await send_notification(user_id, "Payroll processing completed")
    except Exception as e:
        await send_notification(user_id, f"Payroll processing failed: {str(e)}")`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Database Query Optimization</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# app/database/optimization.py
from sqlalchemy import text, func
from sqlalchemy.orm import selectinload, joinedload

class OptimizedEmployeeService:
    def __init__(self, db: Session):
        self.db = db
    
    async def get_employees_with_stats(self, department: str = None):
        """Optimized query with aggregations"""
        
        # Use raw SQL for complex aggregations
        query = text("""
            SELECT 
                e.id,
                e.name,
                e.department,
                e.designation,
                COUNT(DISTINCT a.id) as attendance_count,
                AVG(a.total_hours) as avg_hours,
                COUNT(DISTINCT t.id) as task_count,
                COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completed_tasks
            FROM employees e
            LEFT JOIN attendance_records a ON e.id = a.employee_id 
                AND a.date >= CURRENT_DATE - INTERVAL '30 days'
            LEFT JOIN tasks t ON e.id = t.assigned_to_employee_id
            WHERE (:department IS NULL OR e.department = :department)
                AND e.status = 'active'
            GROUP BY e.id, e.name, e.department, e.designation
            ORDER BY e.name
        """)
        
        result = await self.db.execute(query, {"department": department})
        return result.fetchall()
    
    async def get_employee_hierarchy(self, employee_id: str):
        """Optimized recursive query for org hierarchy"""
        
        query = text("""
            WITH RECURSIVE employee_hierarchy AS (
                -- Base case: selected employee
                SELECT id, name, manager_id, 0 as level
                FROM employees 
                WHERE id = :employee_id
                
                UNION ALL
                
                -- Recursive case: subordinates
                SELECT e.id, e.name, e.manager_id, eh.level + 1
                FROM employees e
                INNER JOIN employee_hierarchy eh ON e.manager_id = eh.id
                WHERE eh.level < 5  -- Prevent infinite recursion
            )
            SELECT * FROM employee_hierarchy
            ORDER BY level, name
        """)
        
        result = await self.db.execute(query, {"employee_id": employee_id})
        return result.fetchall()

# Database connection optimization
from sqlalchemy.pool import QueuePool

engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=20,
    max_overflow=30,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=False  # Disable SQL logging in production
)

# Query optimization with indexes
"""
-- Create composite indexes for common queries
CREATE INDEX CONCURRENTLY idx_employees_dept_status ON employees(department, status);
CREATE INDEX CONCURRENTLY idx_attendance_employee_date ON attendance_records(employee_id, date DESC);
CREATE INDEX CONCURRENTLY idx_tasks_assigned_status ON tasks(assigned_to_employee_id, status);
CREATE INDEX CONCURRENTLY idx_payroll_employee_month_year ON payroll_records(employee_id, month, year);

-- Partial indexes for filtered queries
CREATE INDEX CONCURRENTLY idx_active_employees ON employees(department) WHERE status = 'active';
CREATE INDEX CONCURRENTLY idx_pending_tasks ON tasks(assigned_to_employee_id) WHERE status = 'pending';
"""

# Query result caching
from functools import lru_cache

@lru_cache(maxsize=128)
def get_department_list():
    """Cache department list as it rarely changes"""
    return db.query(Employee.department).distinct().all()`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Response Optimization</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# app/middleware/compression.py
from fastapi import Request, Response
from fastapi.responses import JSONResponse
import gzip
import json

class ResponseOptimizationMiddleware:
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            request = Request(scope, receive)
            
            # Add response optimization
            async def send_wrapper(message):
                if message["type"] == "http.response.body":
                    # Compress large responses
                    if len(message.get("body", b"")) > 1024:
                        compressed = gzip.compress(message["body"])
                        if len(compressed) < len(message["body"]):
                            message["body"] = compressed
                            # Add compression header
                            for header in message.get("headers", []):
                                if header[0] == b"content-encoding":
                                    break
                            else:
                                message.setdefault("headers", []).append(
                                    [b"content-encoding", b"gzip"]
                                )
                
                await send(message)
            
            await self.app(scope, receive, send_wrapper)
        else:
            await self.app(scope, receive, send)

# Pagination optimization
class OptimizedPagination:
    @staticmethod
    def paginate_query(query, page: int, limit: int, max_limit: int = 100):
        # Limit maximum page size
        limit = min(limit, max_limit)
        
        # Use cursor-based pagination for large datasets
        if page > 100:  # Switch to cursor pagination for deep pages
            return OptimizedPagination.cursor_paginate(query, limit)
        
        # Standard offset pagination for early pages
        total = query.count()
        items = query.offset((page - 1) * limit).limit(limit).all()
        
        return {
            "items": items,
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total,
                "pages": (total + limit - 1) // limit,
                "has_next": page * limit < total,
                "has_prev": page > 1
            }
        }
    
    @staticmethod
    def cursor_paginate(query, limit: int, cursor: str = None):
        if cursor:
            query = query.filter(Employee.id > cursor)
        
        items = query.limit(limit + 1).all()
        has_next = len(items) > limit
        
        if has_next:
            items = items[:-1]
            next_cursor = items[-1].id if items else None
        else:
            next_cursor = None
        
        return {
            "items": items,
            "pagination": {
                "limit": limit,
                "has_next": has_next,
                "next_cursor": next_cursor
            }
        }`}
            </pre>
          </div>
        </div>
      </div>

      {/* Database Performance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Performance Tuning</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">PostgreSQL Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# postgresql.conf - Production optimization
# Memory settings (for 8GB RAM server)
shared_buffers = 2GB                    # 25% of RAM
effective_cache_size = 6GB              # 75% of RAM
work_mem = 16MB                         # Per-operation memory
maintenance_work_mem = 512MB            # Maintenance operations

# Connection settings
max_connections = 200
listen_addresses = '*'

# WAL settings for performance
wal_level = replica
max_wal_size = 4GB
min_wal_size = 1GB
checkpoint_completion_target = 0.9
wal_buffers = 64MB

# Query optimization
random_page_cost = 1.1                  # SSD optimization
effective_io_concurrency = 200          # SSD concurrent I/O
default_statistics_target = 100         # Query planner statistics

# Logging for performance analysis
log_min_duration_statement = 1000       # Log slow queries (>1s)
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on

# Background writer optimization
bgwriter_delay = 200ms
bgwriter_lru_maxpages = 100
bgwriter_lru_multiplier = 2.0`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Query Optimization Examples</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Optimized queries with proper indexing

-- 1. Employee search with full-text search
CREATE INDEX idx_employees_search ON employees 
USING gin(to_tsvector('english', name || ' ' || email || ' ' || department));

SELECT e.*, ts_rank(to_tsvector('english', e.name || ' ' || e.email), query) as rank
FROM employees e, plainto_tsquery('english', 'john sales') query
WHERE to_tsvector('english', e.name || ' ' || e.email || ' ' || e.department) @@ query
ORDER BY rank DESC, e.name;

-- 2. Attendance summary with window functions
SELECT 
    e.name,
    e.department,
    COUNT(*) as total_days,
    COUNT(*) FILTER (WHERE a.status = 'present') as present_days,
    AVG(a.total_hours) as avg_hours,
    LAG(COUNT(*), 1) OVER (PARTITION BY e.department ORDER BY DATE_TRUNC('month', a.date)) as prev_month_days
FROM employees e
JOIN attendance_records a ON e.id = a.employee_id
WHERE a.date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY e.id, e.name, e.department, DATE_TRUNC('month', a.date)
ORDER BY e.department, e.name;

-- 3. Payroll calculation with CTEs
WITH monthly_stats AS (
    SELECT 
        employee_id,
        SUM(total_hours) as total_hours,
        SUM(CASE WHEN total_hours > 8 THEN total_hours - 8 ELSE 0 END) as overtime_hours
    FROM attendance_records
    WHERE date >= DATE_TRUNC('month', CURRENT_DATE)
    GROUP BY employee_id
),
salary_components AS (
    SELECT 
        e.id as employee_id,
        e.salary / 12 as monthly_basic,
        (e.salary / 12) * 0.4 as hra,
        3000 as transport_allowance,
        ms.overtime_hours * 500 as overtime_pay
    FROM employees e
    JOIN monthly_stats ms ON e.id = ms.employee_id
)
SELECT 
    e.name,
    sc.monthly_basic,
    sc.hra,
    sc.transport_allowance,
    sc.overtime_pay,
    (sc.monthly_basic + sc.hra + sc.transport_allowance + sc.overtime_pay) as gross_salary
FROM employees e
JOIN salary_components sc ON e.id = sc.employee_id;`}
            </pre>
          </div>
        </div>
      </div>

      {/* Performance Monitoring */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Monitoring & Benchmarks</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Performance Targets</h4>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-semibold text-green-900 text-sm">Response Times</h5>
                <ul className="text-xs text-green-800 space-y-1">
                  <li>• API endpoints: &lt; 200ms (95th percentile)</li>
                  <li>• Database queries: &lt; 100ms average</li>
                  <li>• Page load time: &lt; 2 seconds</li>
                  <li>• Time to interactive: &lt; 3 seconds</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-900 text-sm">Throughput</h5>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• API requests: 1000 req/sec</li>
                  <li>• Concurrent users: 500+</li>
                  <li>• Database connections: 200 max</li>
                  <li>• File uploads: 50 MB/sec</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-semibold text-purple-900 text-sm">Availability</h5>
                <ul className="text-xs text-purple-800 space-y-1">
                  <li>• Uptime SLA: 99.9%</li>
                  <li>• Recovery time: &lt; 5 minutes</li>
                  <li>• Data backup: 99.99% durability</li>
                  <li>• Disaster recovery: &lt; 1 hour</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Load Testing</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# load-testing/k6-script.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp up
    { duration: '5m', target: 100 },   // Stay at 100 users
    { duration: '2m', target: 200 },   // Ramp up to 200
    { duration: '5m', target: 200 },   // Stay at 200
    { duration: '2m', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)&lt;500'],   // 95% under 500ms
    http_req_failed: ['rate&lt;0.1'],      // Error rate under 10%
    errors: ['rate&lt;0.1'],
  },
};

export default function() {
  // Login and get token
  let loginResponse = http.post('http://localhost:8000/api/auth/login', {
    username: 'testuser',
    password: 'testpass'
  });
  
  check(loginResponse, {
    'login successful': (r) => r.status === 200,
  });
  
  let token = loginResponse.json('access_token');
  let headers = { 'Authorization': \`Bearer \${token}\` };
  
  // Test various endpoints
  let endpoints = [
    '/api/employees',
    '/api/leads',
    '/api/attendance/records',
    '/api/tasks'
  ];
  
  endpoints.forEach(endpoint => {
    let response = http.get(\`http://localhost:8000\${endpoint}\`, { headers });
    
    check(response, {
      [\`\${endpoint} status is 200\`]: (r) => r.status === 200,
      [\`\${endpoint} response time &lt; 500ms\`]: (r) => r.timings.duration &lt; 500,
    });
    
    errorRate.add(response.status !== 200);
  });
  
  sleep(1);
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOptimization;