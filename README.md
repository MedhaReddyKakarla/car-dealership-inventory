<h1 align="center">VeyraDrive</h1>

<p align="center">
  <strong>Car Dealership Inventory Management System</strong>
</p>

<p align="center">
  Full-stack web application for managing vehicle inventory, purchases,
  stock levels, authentication, and administrative operations.
</p>

<p align="center">
  <a href="https://car-dealership-frontend-jvvk.onrender.com/">Live Demo</a>
  &nbsp; • &nbsp;
  <a href="https://car-dealership-api-ab6n.onrender.com/docs">API Documentation</a>
  &nbsp; • &nbsp;
  <a href="https://youtu.be/ALBwLfQwyg4">Demo Video</a>
</p>

<hr>

<h2>Overview</h2>

<p>
VeyraDrive is a full-stack car dealership inventory management system
built with React, FastAPI, PostgreSQL, SQLAlchemy, and JWT authentication.
</p>

<p>
The application allows authenticated users to manage vehicles, search and
filter inventory, purchase vehicles, track stock levels, and perform
role-based administrative operations.
</p>

<h2>Key Features</h2>

<ul>
  <li>JWT-based user authentication</li>
  <li>Role-based authorization with admin access control</li>
  <li>Create, view, update, and delete vehicles</li>
  <li>Vehicle search and category filtering</li>
  <li>Minimum and maximum price filtering</li>
  <li>Vehicle purchase with automatic stock reduction</li>
  <li>Out-of-stock protection</li>
  <li>Admin-only vehicle restocking</li>
  <li>Protected REST API endpoints</li>
  <li>Automatic inventory refresh after stock changes</li>
</ul>

<h2>Technology Stack</h2>

<table>
  <tr>
    <th>Layer</th>
    <th>Technology</th>
  </tr>
  <tr>
    <td>Frontend</td>
    <td>React, Vite, JavaScript, CSS</td>
  </tr>
  <tr>
    <td>Backend</td>
    <td>Python, FastAPI</td>
  </tr>
  <tr>
    <td>Database</td>
    <td>PostgreSQL</td>
  </tr>
  <tr>
    <td>ORM</td>
    <td>SQLAlchemy</td>
  </tr>
  <tr>
    <td>Authentication</td>
    <td>JWT</td>
  </tr>
  <tr>
    <td>Testing</td>
    <td>Pytest</td>
  </tr>
  <tr>
    <td>Deployment</td>
    <td>Render</td>
  </tr>
  <tr>
    <td>Version Control</td>
    <td>Git, GitHub</td>
  </tr>
</table>

<h2>Authentication & Authorization</h2>

<p>
Authentication is implemented using JWT access tokens. Protected API
requests require a valid bearer token.
</p>

<ul>
  <li>
    <strong>Users:</strong> View inventory, search vehicles, purchase vehicles,
    and manage vehicles according to their permissions.
  </li>
  <li>
    <strong>Administrators:</strong> Additional access to vehicle restocking,
    deletion, and administrative inventory operations.
  </li>
</ul>

<h2>Inventory Management</h2>

<p>
The system supports the complete inventory lifecycle including adding,
updating, purchasing, restocking, and removing vehicles.
</p>

<ul>
  <li>Vehicle quantity decreases automatically after purchase.</li>
  <li>Purchases are prevented when inventory reaches zero.</li>
  <li>Administrators can increase stock through restocking.</li>
  <li>Inventory is refreshed automatically after stock changes.</li>
</ul>

<h2>Cloud Deployment</h2>

<p>
The application is deployed on Render using separate frontend and backend
services.
</p>

<p>
<strong>Frontend</strong><br>
<a href="https://car-dealership-frontend-jvvk.onrender.com/">
https://car-dealership-frontend-jvvk.onrender.com/
</a>
</p>

<p>
<strong>Backend API</strong><br>
<a href="https://car-dealership-api-ab6n.onrender.com/">
https://car-dealership-api-ab6n.onrender.com/
</a>
</p>

<p>
<strong>Swagger API Documentation</strong><br>
<a href="https://car-dealership-api-ab6n.onrender.com/docs">
https://car-dealership-api-ab6n.onrender.com/docs
</a>
</p>

<p>
The backend uses the <code>DATABASE_URL</code> environment variable for
PostgreSQL database connectivity. Database credentials, JWT secrets,
and other sensitive configuration are kept outside the source code.
</p>

<h2>Testing</h2>

<p>
The backend includes automated tests using Pytest.
</p>

<p>
<strong>Test Result: 28 tests passed</strong>
</p>

<p>
The test suite covers authentication, vehicle operations, authorization,
purchase behaviour, stock validation, and administrative restocking.
</p>

<p>
Test output:
<code>backend/test-report.txt</code>
</p>

<h2>Demo Video</h2>

<p>
The project demonstration covers authentication, vehicle inventory
management, purchasing, stock updates, and administrative restocking.
</p>

<p>
<strong>Watch the Demo:</strong>
<a href="https://youtu.be/ALBwLfQwyg4">
VeyraDrive Project Demonstration
</a>
</p>

<p>
<strong>Local Demo Video Path:</strong>
</p>

<pre>
"C:\Users\medha\Videos\Screen Recordings\Car_Inventory - Demo_Video.mp4"
</pre>

<h2>Project Structure</h2>

<pre>
car-dealership-inventory/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── dependencies/
│   └── tests/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
├── PROMPTS.md
├── README.md
└── docker-compose.yml
</pre>

<h2>Local Development</h2>

<p><strong>Backend</strong></p>

<pre>
cd backend
venv\Scripts\activate
python -m uvicorn app.main:app --reload
</pre>

<p><strong>Frontend</strong></p>

<pre>
cd frontend
npm install
npm run dev
</pre>

<p><strong>Run Tests</strong></p>

<pre>
cd backend
python -m pytest -q
</pre>

<p><strong>Build Frontend</strong></p>

<pre>
cd frontend
npm run build
</pre>

<hr>

<p align="center">
  <strong>VeyraDrive — Full-Stack Vehicle Inventory Management</strong>
</p>
