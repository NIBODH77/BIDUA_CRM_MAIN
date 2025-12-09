import React from 'react';
import { CheckCircle, Code, Monitor, Shield, Target, Zap } from 'lucide-react';

const TestingStrategy: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Testing Strategy</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive testing framework covering frontend, backend, and integration testing 
          for the BIDUA ERP system with automated testing pipelines.
        </p>
      </div>

      {/* Testing Pyramid */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Testing Pyramid
        </h3>
        
        <div className="text-center mb-6">
          <div className="inline-block">
            <div className="bg-red-100 border border-red-300 px-8 py-2 rounded-t-lg">
              <span className="text-red-800 font-semibold">E2E Tests (Few)</span>
            </div>
            <div className="bg-yellow-100 border-l border-r border-yellow-300 px-12 py-3">
              <span className="text-yellow-800 font-semibold">Integration Tests (Some)</span>
            </div>
            <div className="bg-green-100 border border-green-300 px-16 py-4 rounded-b-lg">
              <span className="text-green-800 font-semibold">Unit Tests (Many)</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Unit Tests (70%)</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Individual component testing</li>
              <li>• Function and method testing</li>
              <li>• Business logic validation</li>
              <li>• Fast execution</li>
              <li>• High code coverage</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Integration Tests (20%)</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• API endpoint testing</li>
              <li>• Database integration</li>
              <li>• Service communication</li>
              <li>• Authentication flows</li>
              <li>• Data persistence</li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">E2E Tests (10%)</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Complete user workflows</li>
              <li>• Cross-browser testing</li>
              <li>• Mobile responsiveness</li>
              <li>• Performance testing</li>
              <li>• User acceptance testing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Frontend Testing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Frontend Testing (React)
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Jest and React Testing Library Setup</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D vitest @vitest/ui jsdom

# vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
      ],
    },
  },
})`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Component Testing Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/components/__tests__/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LoginForm from '../auth/LoginForm';

describe('LoginForm', () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  it('renders login form correctly', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('calls onLogin with correct credentials', async () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'admin' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('admin', 'password123');
    });
  });

  it('displays error message on failed login', () => {
    render(<LoginForm onLogin={mockOnLogin} error="Invalid credentials" />);
    
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Custom Hook Testing</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/hooks/__tests__/useAuth.test.tsx
import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth } from '../useAuth';

// Mock API service
vi.mock('../services/api', () => ({
  apiService: {
    login: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(),
  }
}));

describe('useAuth', () => {
  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuth());
    
    const mockUser = { id: '1', username: 'admin', role: 'admin' };
    apiService.login.mockResolvedValue({
      data: { access_token: 'token123', user: mockUser }
    });

    await act(async () => {
      const success = await result.current.login('admin', 'password');
      expect(success).toBe(true);
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it('should handle login failure', async () => {
    const { result } = renderHook(() => useAuth());
    
    apiService.login.mockRejectedValue(new Error('Invalid credentials'));

    await act(async () => {
      const success = await result.current.login('admin', 'wrong');
      expect(success).toBe(false);
      expect(result.current.error).toBe('Invalid credentials');
    });
  });
});`}
            </pre>
          </div>
        </div>
      </div>

      {/* Backend Testing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Backend Testing (FastAPI)
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Pytest Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# pytest.ini
[tool:pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = 
    --strict-markers
    --strict-config
    --verbose
    --tb=short
    --cov=app
    --cov-report=term-missing
    --cov-report=html
    --cov-fail-under=80

# conftest.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import get_db, Base
from app.core.config import settings

# Test database URL
SQLALCHEMY_DATABASE_URL = "postgresql://test_user:test_pass@localhost:5432/test_bidua_erp"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="session")
def db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def db_session(db):
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        yield db_session
    
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">API Endpoint Testing</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# tests/test_auth.py
import pytest
from fastapi.testclient import TestClient
from app.models.user import User
from app.core.security import get_password_hash

def test_login_success(client: TestClient, db_session):
    # Create test user
    hashed_password = get_password_hash("testpass123")
    user = User(
        username="testuser",
        email="test@bidua.com",
        password_hash=hashed_password,
        role="employee",
        department="IT"
    )
    db_session.add(user)
    db_session.commit()

    # Test login
    response = client.post("/api/auth/login", data={
        "username": "testuser",
        "password": "testpass123"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["username"] == "testuser"

def test_login_invalid_credentials(client: TestClient):
    response = client.post("/api/auth/login", data={
        "username": "nonexistent",
        "password": "wrongpass"
    })
    
    assert response.status_code == 401
    assert "Incorrect username or password" in response.json()["detail"]

def test_protected_endpoint_without_token(client: TestClient):
    response = client.get("/api/users/me")
    assert response.status_code == 401`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Database Testing</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# tests/test_models.py
import pytest
from sqlalchemy.exc import IntegrityError
from app.models.employee import Employee
from app.models.user import User

def test_create_employee(db_session):
    employee = Employee(
        employee_id="TEST001",
        name="Test Employee",
        email="test@bidua.com",
        phone="+91 9876543210",
        department="IT",
        designation="Developer",
        joining_date="2025-01-15",
        salary=600000,
        address="Test Address",
        emergency_contact="+91 9876543211"
    )
    
    db_session.add(employee)
    db_session.commit()
    
    assert employee.id is not None
    assert employee.status == "active"  # Default value
    assert employee.created_at is not None

def test_employee_unique_constraints(db_session):
    # Create first employee
    employee1 = Employee(
        employee_id="TEST001",
        name="Test Employee 1",
        email="test1@bidua.com",
        # ... other fields
    )
    db_session.add(employee1)
    db_session.commit()
    
    # Try to create employee with same employee_id
    employee2 = Employee(
        employee_id="TEST001",  # Duplicate
        name="Test Employee 2",
        email="test2@bidua.com",
        # ... other fields
    )
    db_session.add(employee2)
    
    with pytest.raises(IntegrityError):
        db_session.commit()`}
            </pre>
          </div>
        </div>
      </div>

      {/* Integration Testing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Testing</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">API Integration Tests</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# tests/test_integration.py
import pytest
from fastapi.testclient import TestClient

class TestEmployeeWorkflow:
    def test_complete_employee_lifecycle(self, client: TestClient, admin_token):
        headers = {"Authorization": f"Bearer {admin_token}"}
        
        # 1. Create employee
        employee_data = {
            "employee_id": "INT001",
            "name": "Integration Test Employee",
            "email": "integration@bidua.com",
            "phone": "+91 9876543210",
            "department": "IT",
            "designation": "Developer",
            "joining_date": "2025-01-15",
            "salary": 600000,
            "address": "Test Address",
            "emergency_contact": "+91 9876543211"
        }
        
        response = client.post("/api/employees", json=employee_data, headers=headers)
        assert response.status_code == 201
        employee = response.json()
        employee_id = employee["id"]
        
        # 2. Get employee
        response = client.get(f"/api/employees/{employee_id}", headers=headers)
        assert response.status_code == 200
        assert response.json()["name"] == "Integration Test Employee"
        
        # 3. Update employee
        update_data = {"salary": 650000}
        response = client.put(f"/api/employees/{employee_id}", json=update_data, headers=headers)
        assert response.status_code == 200
        assert response.json()["salary"] == 650000
        
        # 4. Mark attendance
        attendance_data = {
            "employee_id": employee["employee_id"],
            "date": "2025-01-15",
            "clock_in": "09:00",
            "clock_out": "18:00",
            "location_name": "Office"
        }
        response = client.post("/api/attendance", json=attendance_data, headers=headers)
        assert response.status_code == 201
        
        # 5. Apply for leave
        leave_data = {
            "employee_id": employee["employee_id"],
            "leave_type": "casual",
            "start_date": "2025-01-20",
            "end_date": "2025-01-21",
            "reason": "Personal work"
        }
        response = client.post("/api/leave-requests", json=leave_data, headers=headers)
        assert response.status_code == 201`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Database Transaction Testing</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# tests/test_transactions.py
import pytest
from sqlalchemy.exc import IntegrityError
from app.services.payroll_service import PayrollService

def test_payroll_transaction_rollback(db_session):
    """Test that payroll processing rolls back on error"""
    payroll_service = PayrollService(db_session)
    
    # Create employee
    employee = create_test_employee(db_session)
    
    # Mock a failure in salary calculation
    with pytest.raises(ValueError):
        payroll_service.process_monthly_payroll(
            employee_id=employee.id,
            month="January",
            year=2025,
            force_error=True  # This will cause an error
        )
    
    # Verify no partial data was saved
    payroll_records = db_session.query(PayrollRecord).filter_by(
        employee_id=employee.id
    ).all()
    assert len(payroll_records) == 0

def test_concurrent_attendance_marking(db_session):
    """Test concurrent attendance marking doesn't create duplicates"""
    employee = create_test_employee(db_session)
    
    # Simulate concurrent requests
    attendance_data = {
        "employee_id": employee.employee_id,
        "date": "2025-01-15",
        "clock_in": "09:00"
    }
    
    # This should succeed
    attendance1 = AttendanceRecord(**attendance_data)
    db_session.add(attendance1)
    db_session.commit()
    
    # This should fail due to unique constraint
    attendance2 = AttendanceRecord(**attendance_data)
    db_session.add(attendance2)
    
    with pytest.raises(IntegrityError):
        db_session.commit()`}
            </pre>
          </div>
        </div>
      </div>

      {/* E2E Testing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">End-to-End Testing</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Playwright Setup</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Install Playwright
npm install -D @playwright/test

# playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">E2E Test Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// e2e/employee-workflow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Employee Management Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/');
    await page.fill('[data-testid="username"]', 'admin');
    await page.fill('[data-testid="password"]', 'bidua123');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should create and manage employee', async ({ page }) => {
    // Navigate to HRMS
    await page.click('[data-testid="hrms-menu"]');
    await page.click('[data-testid="employees-tab"]');
    
    // Create new employee
    await page.click('[data-testid="add-employee-button"]');
    await page.fill('[data-testid="employee-name"]', 'John Doe');
    await page.fill('[data-testid="employee-email"]', 'john@bidua.com');
    await page.fill('[data-testid="employee-phone"]', '+91 9876543210');
    await page.selectOption('[data-testid="department"]', 'IT');
    await page.selectOption('[data-testid="designation"]', 'Developer');
    await page.fill('[data-testid="salary"]', '600000');
    
    await page.click('[data-testid="submit-employee"]');
    
    // Verify employee was created
    await expect(page.locator('text=John Doe')).toBeVisible();
    await expect(page.locator('text=john@bidua.com')).toBeVisible();
    
    // Edit employee
    await page.click('[data-testid="edit-employee-john"]');
    await page.fill('[data-testid="employee-salary"]', '650000');
    await page.click('[data-testid="update-employee"]');
    
    // Verify update
    await expect(page.locator('text=₹650,000')).toBeVisible();
  });

  test('should handle employee attendance workflow', async ({ page }) => {
    // Navigate to attendance
    await page.click('[data-testid="hrms-menu"]');
    await page.click('[data-testid="attendance-tab"]');
    
    // Mark attendance
    await page.click('[data-testid="mark-attendance-button"]');
    await page.selectOption('[data-testid="employee-select"]', 'BID001');
    await page.fill('[data-testid="clock-in"]', '09:00');
    await page.click('[data-testid="submit-attendance"]');
    
    // Verify attendance record
    await expect(page.locator('text=Present')).toBeVisible();
    await expect(page.locator('text=09:00')).toBeVisible();
  });
});`}
            </pre>
          </div>
        </div>
      </div>

      {/* Performance Testing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Performance Testing
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Load Testing with Artillery</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Install Artillery
npm install -g artillery

# load-test.yml
config:
  target: 'http://localhost:8000'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120
      arrivalRate: 50
    - duration: 60
      arrivalRate: 100
  defaults:
    headers:
      Authorization: 'Bearer {{ $randomString() }}'

scenarios:
  - name: "API Load Test"
    flow:
      - post:
          url: "/api/auth/login"
          json:
            username: "admin"
            password: "bidua123"
          capture:
            - json: "$.access_token"
              as: "token"
      
      - get:
          url: "/api/employees"
          headers:
            Authorization: "Bearer {{ token }}"
      
      - get:
          url: "/api/leads"
          headers:
            Authorization: "Bearer {{ token }}"

# Run load test
artillery run load-test.yml`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Database Performance Testing</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# tests/test_performance.py
import pytest
import time
from app.services.employee_service import EmployeeService

def test_employee_query_performance(db_session):
    """Test that employee queries complete within acceptable time"""
    employee_service = EmployeeService(db_session)
    
    # Create test data
    for i in range(1000):
        create_test_employee(db_session, f"emp{i}")
    
    # Test query performance
    start_time = time.time()
    employees = employee_service.get_employees(limit=100)
    end_time = time.time()
    
    query_time = end_time - start_time
    assert query_time < 0.5  # Should complete in less than 500ms
    assert len(employees) == 100

def test_bulk_operations_performance(db_session):
    """Test bulk operations performance"""
    start_time = time.time()
    
    # Bulk insert 1000 attendance records
    attendance_records = []
    for i in range(1000):
        attendance_records.append(create_attendance_record_data(i))
    
    db_session.bulk_insert_mappings(AttendanceRecord, attendance_records)
    db_session.commit()
    
    end_time = time.time()
    bulk_time = end_time - start_time
    
    assert bulk_time < 2.0  # Should complete in less than 2 seconds`}
            </pre>
          </div>
        </div>
      </div>

      {/* Test Data Management */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Data Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Test Factories</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# tests/factories.py
import factory
from app.models.employee import Employee
from app.models.user import User

class UserFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = User
        sqlalchemy_session_persistence = "commit"

    username = factory.Sequence(lambda n: f"user{n}")
    email = factory.LazyAttribute(lambda obj: f"{obj.username}@bidua.com")
    password_hash = factory.LazyFunction(lambda: get_password_hash("testpass123"))
    role = "employee"
    department = "IT"
    is_active = True

class EmployeeFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = Employee
        sqlalchemy_session_persistence = "commit"

    employee_id = factory.Sequence(lambda n: f"EMP{n:03d}")
    name = factory.Faker("name")
    email = factory.LazyAttribute(lambda obj: f"{obj.name.lower().replace(' ', '.')}@bidua.com")
    phone = factory.Faker("phone_number")
    department = factory.Iterator(["IT", "Sales", "Marketing", "HR"])
    designation = "Employee"
    joining_date = factory.Faker("date_this_year")
    salary = factory.Faker("random_int", min=400000, max=1000000)
    address = factory.Faker("address")
    emergency_contact = factory.Faker("phone_number")

# Usage in tests
def test_with_factory_data(db_session):
    employee = EmployeeFactory.create()
    assert employee.id is not None
    assert employee.salary >= 400000`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Test Database Seeding</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# tests/seed_data.py
def seed_test_database(db_session):
    """Seed database with test data"""
    
    # Create test users
    admin_user = UserFactory.create(
        username="test_admin",
        role="admin",
        department="IT"
    )
    
    manager_user = UserFactory.create(
        username="test_manager",
        role="manager",
        department="Sales"
    )
    
    # Create test employees
    employees = EmployeeFactory.create_batch(50)
    
    # Create test leads
    leads = LeadFactory.create_batch(30)
    
    # Create test attendance records
    for employee in employees[:10]:
        AttendanceFactory.create_batch(
            30, 
            employee_id=employee.id,
            date=factory.Iterator([
                date.today() - timedelta(days=i) 
                for i in range(30)
            ])
        )
    
    db_session.commit()
    return {
        "admin_user": admin_user,
        "manager_user": manager_user,
        "employees": employees,
        "leads": leads
    }`}
            </pre>
          </div>
        </div>
      </div>

      {/* Continuous Testing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Continuous Testing Pipeline</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Pre-commit Hooks</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/psf/black
    rev: 22.12.0
    hooks:
      - id: black
        language_version: python3.11

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort

  - repo: local
    hooks:
      - id: frontend-tests
        name: Frontend Tests
        entry: bash -c 'cd frontend && npm run test'
        language: system
        pass_filenames: false
        
      - id: backend-tests
        name: Backend Tests
        entry: bash -c 'cd backend && pytest'
        language: system
        pass_filenames: false`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Test Coverage Reports</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Generate coverage reports
npm run test:coverage  # Frontend coverage
pytest --cov=app --cov-report=html  # Backend coverage

# Coverage thresholds in package.json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}

# Backend coverage in pytest.ini
[tool:pytest]
addopts = --cov=app --cov-fail-under=80`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingStrategy;