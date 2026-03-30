# System Architecture & Design

## 1. Overview
The **Disaster Alert & Reporting System (DARS)** follows a modern MERN stack architecture designed for high availability and real-time data processing.

## 2. Technical Stack
- **Frontend**: React.js (v18), Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Primary), Local JSON Files (Fallback).
- **Authentication**: Stateless JWT with Bcrypt hashing.

## 3. High-Availability Fallback Mechanism
DARS implements a unique fallback system. If the MongoDB connection fails, the backend automatically switches to a local file-system storage (`/backend/data/*.json`). This ensures:
- Users can still log in (if they registered locally).
- Reports can still be submitted and stored.
- Admins can still manage data.

## 4. UI Design System
The project uses a **Neon Glass (Glassmorphism)** aesthetic:
- **Core Colors**: Deep Slate backgrounds with Neon Blue/Red/Amber accents.
- **Layout**: Fluid, responsive grid with translucent panels.
- **Micro-interactions**: CSS animations and hover effects for critical alerts.

## 5. Security Model
- All private routes are guarded by JWT middleware.
- Passwords are salted and hashed using 10 rounds of Bcrypt.
- Role-based access control (RBAC) separates regular users from administrative staff.

---
*For setup instructions, see [Setup Guide](./setup_guide.md).*
*For API details, see [API Reference](./api_reference.md).*
