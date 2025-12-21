# Troubleshooting Guide

## Chatboard Not Accessible

### 1. Check Container Status
```bash
docker ps | grep chatboard
docker logs chatboard-backend
docker logs chatboard-frontend
docker logs chatboard-postgres
```

### 2. Test Container Connectivity
```bash
# Test backend from nginx container
docker exec midori-nginx-1 wget -O- http://chatboard-backend:3000/api/chats

# Test frontend from nginx container  
docker exec midori-nginx-1 wget -O- http://chatboard-frontend:3000

# Test backend directly
docker exec chatboard-backend wget -O- http://localhost:3000/api/chats
```

### 3. Check SSL Certificate
```bash
# Check if cert exists for chatboard
docker exec midori-nginx-1 ls -la /etc/letsencrypt/live/chatboard.coutshoko.dev/

# If cert doesn't exist, generate it:
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --email ramielshoko7@gmail.com --agree-tos --no-eff-email -d chatboard.coutshoko.dev
docker-compose restart nginx
```

### 4. Check Nginx Configuration
```bash
# Test nginx config
docker exec midori-nginx-1 nginx -t

# Check nginx error logs
docker logs midori-nginx-1 2>&1 | grep -i error
```

### 5. Verify DNS
```bash
# Check if DNS is pointing to your VPS
dig chatboard.coutshoko.dev
nslookup chatboard.coutshoko.dev
```

### 6. Check Environment Variables
```bash
# Verify backend has correct DATABASE_URL
docker exec chatboard-backend env | grep DATABASE_URL

# Verify frontend was built with correct VITE_API_URL
docker exec chatboard-frontend cat /usr/share/nginx/html/index.html | grep -i api
```

### 7. Rebuild Containers
```bash
# Rebuild specific service
docker-compose build --no-cache chatboard-backend
docker-compose build --no-cache chatboard-frontend
docker-compose up -d chatboard-backend chatboard-frontend
```

## Common Issues

### Bad Gateway (502)
- Container is not running
- Container is not accessible from nginx
- Wrong port or service name in nginx config

### SSL Certificate Error
- Certificate doesn't include the domain
- Certificate expired
- Need to regenerate certificate

### Frontend Shows but API Calls Fail
- CORS issue (check backend CORS config)
- Wrong API URL in frontend build
- Backend not accessible

### Database Connection Error
- PostgreSQL not running
- Wrong DATABASE_URL
- Database doesn't exist
- Wrong password

