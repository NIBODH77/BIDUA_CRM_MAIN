import React from 'react';
import { Monitor, Code, Database, Settings, Download, CheckCircle, AlertTriangle } from 'lucide-react';

const DevelopmentSetup: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Development Setup</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete development environment setup guide for BIDUA ERP system including all prerequisites, 
          tools, and configuration for both frontend and backend development.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Prerequisites
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Required Software</h4>
            <ul className="text-blue-800 space-y-2">
              <li>• <strong>Node.js 18+</strong> - JavaScript runtime for frontend</li>
              <li>• <strong>Python 3.11+</strong> - Backend programming language</li>
              <li>• <strong>PostgreSQL 14+</strong> - Database server</li>
              <li>• <strong>Git</strong> - Version control system</li>
              <li>• <strong>Docker Desktop</strong> - Containerization (optional)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Development Tools</h4>
            <ul className="text-blue-800 space-y-2">
              <li>• <strong>VS Code</strong> - Recommended IDE</li>
              <li>• <strong>Postman/Insomnia</strong> - API testing</li>
              <li>• <strong>pgAdmin</strong> - Database management</li>
              <li>• <strong>Terminal/Command Prompt</strong> - Command line interface</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Installation Steps
        </h3>
        
        <div className="space-y-6">
          {/* Node.js Installation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">1. Install Node.js</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Windows</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Download from nodejs.org
# Or use Chocolatey
choco install nodejs

# Verify installation
node --version
npm --version`}
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">macOS</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Using Homebrew
brew install node

# Or download from nodejs.org
# Verify installation
node --version
npm --version`}
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Linux (Ubuntu)</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version`}
                </pre>
              </div>
            </div>
          </div>

          {/* Python Installation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">2. Install Python</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Windows</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Download from python.org
# Or use Microsoft Store
# Or use Chocolatey
choco install python

# Verify installation
python --version
pip --version`}
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">macOS</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Using Homebrew
brew install python@3.11

# Or download from python.org
# Verify installation
python3 --version
pip3 --version`}
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Linux (Ubuntu)</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Install Python 3.11
sudo apt update
sudo apt install python3.11 python3.11-venv python3-pip

# Verify installation
python3 --version
pip3 --version`}
                </pre>
              </div>
            </div>
          </div>

          {/* PostgreSQL Installation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">3. Install PostgreSQL</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Windows</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Download installer from postgresql.org
# Or use Chocolatey
choco install postgresql

# Start PostgreSQL service
net start postgresql-x64-14`}
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">macOS</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Using Homebrew
brew install postgresql@14
brew services start postgresql@14

# Or use Postgres.app
# Download from postgresapp.com`}
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Linux (Ubuntu)</h5>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start and enable service
sudo systemctl start postgresql
sudo systemctl enable postgresql`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Setup</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">1. Clone Repository</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Clone the repository
git clone https://github.com/your-org/bidua-erp.git
cd bidua-erp

# Create development branch
git checkout -b feature/your-feature-name`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">2. Frontend Setup</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">3. Backend Setup</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Run database migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload`}
            </pre>
          </div>
        </div>
      </div>

      {/* IDE Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">IDE Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">VS Code Extensions</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-900">Frontend Extensions</h5>
                <ul className="text-blue-800 mt-2 space-y-1">
                  <li>• ES7+ React/Redux/React-Native snippets</li>
                  <li>• TypeScript Importer</li>
                  <li>• Tailwind CSS IntelliSense</li>
                  <li>• Auto Rename Tag</li>
                  <li>• Bracket Pair Colorizer</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-semibold text-green-900">Backend Extensions</h5>
                <ul className="text-green-800 mt-2 space-y-1">
                  <li>• Python</li>
                  <li>• Pylance</li>
                  <li>• Python Docstring Generator</li>
                  <li>• autoDocstring</li>
                  <li>• Python Test Explorer</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">VS Code Settings</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// .vscode/settings.json
{
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Environment Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Frontend Environment (.env.local)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=BIDUA ERP
VITE_APP_VERSION=1.0.0

# Environment
VITE_ENVIRONMENT=development
VITE_DEBUG=true

# Features
VITE_USE_MOCK_DATA=false
VITE_ENABLE_ANALYTICS=false`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Backend Environment (.env)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Database
DATABASE_URL=postgresql://bidua_user:password@localhost:5432/bidua_erp
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bidua_erp
DB_USER=bidua_user
DB_PASSWORD=your_secure_password

# Security
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application
APP_NAME=BIDUA ERP API
DEBUG=True
ALLOWED_HOSTS=["http://localhost:5173"]`}
            </pre>
          </div>
        </div>
      </div>

      {/* Docker Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Docker Development Environment</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Docker Compose Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# docker-compose.dev.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_BASE_URL=http://localhost:8000

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://bidua_user:password@db:5432/bidua_erp
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=bidua_erp
      - POSTGRES_USER=bidua_user
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Start Development Environment</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down`}
            </pre>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Common Issues & Troubleshooting
        </h3>
        
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Port Already in Use</h4>
            <p className="text-sm text-red-800 mb-2">If you get "port already in use" errors:</p>
            <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`# Find process using port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5173 | xargs kill -9`}
            </pre>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Database Connection Issues</h4>
            <p className="text-sm text-yellow-800 mb-2">If PostgreSQL connection fails:</p>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Check if PostgreSQL service is running</li>
              <li>• Verify database credentials in .env file</li>
              <li>• Ensure database 'bidua_erp' exists</li>
              <li>• Check firewall settings for port 5432</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Module Import Errors</h4>
            <p className="text-sm text-blue-800 mb-2">If you encounter import errors:</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure virtual environment is activated</li>
              <li>• Run `pip install -r requirements.txt` again</li>
              <li>• Check Python path configuration</li>
              <li>• Clear npm cache: `npm cache clean --force`</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Development Workflow */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Workflow</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Daily Development</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Pull latest changes from main branch</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Start development servers (frontend & backend)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Make changes and test locally</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Run tests and linting</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Commit and push changes</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Useful Commands</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Frontend commands
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking

# Backend commands
uvicorn app.main:app --reload  # Start dev server
pytest                         # Run tests
alembic revision --autogenerate # Create migration
alembic upgrade head          # Apply migrations

# Database commands
psql -U bidua_user -d bidua_erp  # Connect to database
pg_dump bidua_erp > backup.sql   # Create backup`}
            </pre>
          </div>
        </div>
      </div>

      {/* Team Collaboration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Collaboration Guidelines</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Git Workflow</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>Main Branch:</strong> Production-ready code only</li>
              <li>• <strong>Develop Branch:</strong> Integration branch for features</li>
              <li>• <strong>Feature Branches:</strong> feature/feature-name</li>
              <li>• <strong>Hotfix Branches:</strong> hotfix/issue-description</li>
              <li>• <strong>Pull Requests:</strong> Required for all changes</li>
              <li>• <strong>Code Review:</strong> Minimum 2 approvals</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Code Quality Standards</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>TypeScript:</strong> Strict mode enabled</li>
              <li>• <strong>ESLint:</strong> No warnings allowed</li>
              <li>• <strong>Prettier:</strong> Consistent formatting</li>
              <li>• <strong>Tests:</strong> 80%+ code coverage</li>
              <li>• <strong>Documentation:</strong> JSDoc for complex functions</li>
              <li>• <strong>Commits:</strong> Conventional commit messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentSetup;