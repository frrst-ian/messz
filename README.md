# Messz — Backend API

A messaging REST API built with Express.js, Prisma, PostgreSQL, and JWT auth.

**Live demo:** [messz.netlify.app](https://messz.netlify.app) 

**Frontend repo:** [github.com/frrst-ian/messz-client](https://github.com/frrst-ian/messz-client)

---

## Setup
```bash
git clone https://github.com/frrst-ian/messz
cd messz
npm install
npx prisma migrate deploy
npm start
```

---

## Environment Variables
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host:port/db
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Stack
Node.js, Express, PostgreSQL, Prisma, JWT, Cloudinary, Multer

---

## API Reference
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login with email and password |
| GET | `/api/conversations` | Get all conversations |
| GET | `/api/conversations/:id` | Get conversation by ID |
| POST | `/api/conversations` | Create a conversation |
| POST | `/api/message` | Send a message |
| GET | `/api/users` | Search users by name |
| GET | `/api/users/:id` | Get user profile |

Protected routes require `Authorization: Bearer <token>`. 