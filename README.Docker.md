
# Docker Setup Guide for BIDUA ERP

## 🐳 Quick Start

### Development Environment
```bash
# Start all services in development mode
docker-compose -f docker-compose.dev.yml up --build

# Access:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:8000
# - API Docs: http://localhost:8000/docs
# - Database: localhost:5432
```

### Production Environment
```bash
# Build and start production services
docker-compose up --build -d

# Access:
# - Application: http://localhost
# - Backend API: http://localhost:8000
```

## 📦 Available Commands

### Development
```bash
# Start services
docker-compose -f docker-compose.dev.yml up

# Stop services
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Rebuild specific service
docker-compose -f docker-compose.dev.yml up --build backend
```

### Production
```bash
# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend

# Execute migrations
docker-compose exec backend alembic upgrade head

# Run seed data
docker-compose exec backend python -m app.seeds.run_all_seeds
```

## 🔧 Database Management

### Backup Database
```bash
docker-compose exec db pg_dump -U postgres bidua_db > backups/backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database
```bash
docker-compose exec -T db psql -U postgres bidua_db < backups/backup_file.sql
```

### Access Database Shell
```bash
docker-compose exec db psql -U postgres -d bidua_db
```

## 🧹 Cleanup

```bash
# Stop and remove all containers
docker-compose down

# Remove volumes (WARNING: deletes all data)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Full cleanup
docker system prune -a --volumes
```

## 🚀 Deployment Notes

**Important:** Replit mein Docker use karne ki zarurat nahi hai. Ye files sirf:
- Local development ke liye
- Production deployment on other platforms
- Team collaboration with Docker users

Replit par directly Run button use karo deployment ke liye.
