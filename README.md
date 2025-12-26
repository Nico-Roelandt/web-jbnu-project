# Wordle-Inspired Web Service

A web service design project inspired by the game **Wordle**.  
Players must guess a hidden word within a limited number of attempts. After each guess, letters are marked to indicate whether they are correct and in the correct position, helping players narrow down the solution.

Each player can create an account and view their ranking among all players.

---

## Developed by

- PASSELEGUE Anne Sarah  
- ROELANDT Nicolas  

---

## How to Install

### 1. Clone the Git Repository

```bash
git clone https://github.com/Nico-Roelandt/web-jbnu-project.git
```

### 2. Import Database

The database must be imported manually on the target machine (local or virtual machine).

When using a VM created with jclouds:

1. Install MySQL on the VM
2. Create the database and user
3. Import the provided SQL dump into the database

Example:

```bash
mysql -u <user> -p <database_name> < database.sql
```

### 3. Set Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=3000
PUBLIC_BASE_URL="http://<VM_PUBLIC_IP>:3000"

DB_HOST=localhost
DB_USER=<db_user>
DB_PASSWORD=<db_password>
DB_NAME=<db_name>
```

> **⚠️ Important:** When deploying on a virtual machine, `PUBLIC_BASE_URL` must use the public IP of the VM, not localhost.

### 4. Run the Backend Server

In a first terminal:

```bash
cd backend
npm install
node server.js
```

The backend server will start on port 3000.

### 5. Run the Frontend Application

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will connect to the backend using the URL defined in `PUBLIC_BASE_URL`.

---

## Known Issues

### Port Configuration

> **⚠️ Known Issue:** Some parts of the backend assume the server is running on port 3000 instead of relying consistently on `process.env.PORT`.

**Impact:**
- Changing the `PORT` value in `.env` may cause unexpected behavior
- The application may not work correctly if deployed on a different port

**Current Workaround:**
Always run the backend on port 3000 and ensure this port is opened on the VM firewall and cloud provider settings.

---

## Notes

- Make sure port 3000 is open on the VM and cloud firewall when deploying remotely
- Ensure the `.env` file is correctly loaded before starting the backend
- Node.js version 18 or higher is recommended