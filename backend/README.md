# DARS Backend Server

The DARS backend is a Node.js/Express server that serves as the central hub for authentication, disaster reporting, and global alert aggregation.

## Core Features
1.  **HA Fallback Engine**: Automatically maintains a local JSON database if MongoDB Atlas is unreachable.
2.  **Stateless Auth**: JWT-based authentication for secure reporting.
3.  **Alert Aggregator**: Fetches and transforms data from USGS and GDACS.

## Structure
- `/routes`: API endpoint definitions.
- `/models`: Database schema (Mongoose).
- `/middleware`: Authentication and logging guards.
- `/data`: Local JSON storage for fallback mode.
- `/tests`: Utility scripts for verifying external API connectivity.

## Environment Variables
- `MONGO_URI`: Primary database connection.
- `JWT_SECRET`: Secret for signing tokens.
- `PORT`: Server port (default 5000).
