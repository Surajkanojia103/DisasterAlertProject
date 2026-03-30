# API Reference

The DARS API provides endpoints for authentication, report management, and real-time alert aggregation.

## Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register new account | Public |
| `POST` | `/api/auth/login` | Login & receive JWT | Public |
| `PUT` | `/api/auth/profile` | Update user profile | User |

## Disaster Reports
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/reports` | Submit a local report | User |
| `GET` | `/api/reports/my-reports`| View personal report history | User |
| `GET` | `/api/reports` | View all reports | Admin |
| `PUT` | `/api/reports/:id/status`| Verify/Reject a report | Admin |

## Global Alerts
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/alerts` | Fetch global disaster data | Public |

## Administration
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/auth/users` | List all users | Admin |
| `PUT` | `/api/auth/admin/volunteer-status/:id` | Approve/Reject Volunteer | Admin |

---
*Base URL (Production):* `https://dars-backend.onrender.com/api`
