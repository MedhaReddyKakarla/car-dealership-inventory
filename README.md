<h1 align="center">VeyraDrive</h1>



<p align="center">

&#x20; <strong>Car Dealership Inventory Management System</strong>

</p>



<p align="center">

&#x20; Full-stack web application for managing vehicle inventory, purchases,

&#x20; stock levels, authentication, and administrative operations.

</p>



<p align="center">

&#x20; <a href="https://car-dealership-frontend-jvvk.onrender.com/">Live Demo</a>

&#x20; \&nbsp; • \&nbsp;

&#x20; <a href="https://car-dealership-api-ab6n.onrender.com/docs">API Documentation</a>

&#x20; \&nbsp; • \&nbsp;

&#x20; <a href="https://drive.google.com/file/d/1R6y4OwZA6g4P16\_POnQJg5ZSlsl3oS2U/view?usp=sharing">Demo Video</a>

</p>



<hr>



<h2>Overview</h2>



<p>

&#x20; VeyraDrive is a full-stack car dealership inventory management system

&#x20; built with React, FastAPI, PostgreSQL, SQLAlchemy, and JWT authentication.

</p>



<p>

&#x20; The application provides authenticated users with vehicle management,

&#x20; inventory search and filtering, vehicle purchasing, stock tracking,

&#x20; and role-based administrative operations.

</p>



<h2>Key Features</h2>



<ul>

&#x20; <li>JWT-based user authentication</li>

&#x20; <li>Role-based authorization with admin access control</li>

&#x20; <li>Create, view, update, and delete vehicles</li>

&#x20; <li>Vehicle search and category filtering</li>

&#x20; <li>Price range filtering</li>

&#x20; <li>Vehicle purchase with automatic stock reduction</li>

&#x20; <li>Out-of-stock protection</li>

&#x20; <li>Admin-only vehicle restocking</li>

&#x20; <li>Protected REST API endpoints</li>

&#x20; <li>Automatic inventory refresh after stock changes</li>

</ul>



<h2>Technology Stack</h2>



<table>

&#x20; <tr>

&#x20;   <th>Layer</th>

&#x20;   <th>Technology</th>

&#x20; </tr>

&#x20; <tr>

&#x20;   <td>Frontend</td>

&#x20;   <td>React, Vite, JavaScript, CSS</td>

&#x20; </tr>

&#x20; <tr>

&#x20;   <td>Backend</td>

&#x20;   <td>Python, FastAPI</td>

&#x20; </tr>

&#x20; <tr>

&#x20;   <td>Database</td>

&#x20;   <td>PostgreSQL</td>

&#x20; </tr>

&#x20; <tr>

&#x20;   <td>ORM</td>

&#x20;   <td>SQLAlchemy</td>

&#x20; </tr>

&#x20; <tr>

&#x20;   <td>Authentication</td>

&#x20;   <td>JWT</td>

&#x20; </tr>

&#x20; <tr>

&#x20;   <td>Testing</td>

&#x20;   <td>Pytest</td>

&#x20; </tr>

&#x20; <tr>

&#x20;   <td>Deployment</td>

&#x20;   <td>Render</td>

&#x20; </tr>

&#x20; <tr>

&#x20;   <td>Version Control</td>

&#x20;   <td>Git, GitHub</td>

&#x20; </tr>

</table>



<h2>Authentication \& Authorization</h2>



<p>

&#x20; Authentication is implemented using JWT access tokens. Protected API

&#x20; requests require a valid bearer token.

</p>



<ul>

&#x20; <li>

&#x20;   <strong>Users:</strong> View, search, purchase, and manage permitted vehicles

&#x20; </li>

&#x20; <li>

&#x20;   <strong>Administrators:</strong> Additional access to vehicle restocking

&#x20;   and deletion operations

&#x20; </li>

</ul>



<h2>Inventory Operations</h2>



<p>

&#x20; The system supports the complete inventory lifecycle:

</p>



<ul>

&#x20; <li>Add new vehicles to inventory</li>

&#x20; <li>Update vehicle information and stock quantity</li>

&#x20; <li>Purchase vehicles and automatically decrease stock</li>

&#x20; <li>Prevent purchases when stock reaches zero</li>

&#x20; <li>Restock vehicles through admin-only operations</li>

&#x20; <li>Delete vehicles through authorized administrative operations</li>

</ul>



<h2>Cloud Deployment</h2>



<p>

&#x20; The application is deployed on Render using separate frontend and backend

&#x20; services.

</p>



<p>

&#x20; <strong>Frontend:</strong><br>

&#x20; <a href="https://car-dealership-frontend-jvvk.onrender.com/">

&#x20;   Live Application

&#x20; </a>

</p>



<p>

&#x20; <strong>Backend API:</strong><br>

&#x20; <a href="https://car-dealership-api-ab6n.onrender.com/">

&#x20;   Backend Service

&#x20; </a>

</p>



<p>

&#x20; <strong>Swagger Documentation:</strong><br>

&#x20; <a href="https://car-dealership-api-ab6n.onrender.com/docs">

&#x20;   API Documentation

&#x20; </a>

</p>



<p>

&#x20; The backend connects to PostgreSQL through the

&#x20; <code>DATABASE\_URL</code> environment variable. Database credentials,

&#x20; JWT secrets, and other sensitive configuration are kept outside the

&#x20; source code.

</p>



<h2>Testing</h2>



<p>

&#x20; The backend includes automated tests using Pytest.

</p>



<p>

&#x20; <strong>28 tests passed</strong>

</p>



<p>

&#x20; Tests cover authentication, vehicle operations, authorization,

&#x20; purchasing, stock validation, and administrative restocking.

</p>



<p>

&#x20; Test output is available in

&#x20; <code>backend/test-report.txt</code>.

</p>



<h2>Demo Video</h2>



<p>

&#x20; <a href="https://drive.google.com/file/d/1R6y4OwZA6g4P16\_POnQJg5ZSlsl3oS2U/view?usp=sharing">

&#x20;   Watch the project demonstration

&#x20; </a>

</p>



<p>

&#x20; The demonstration covers authentication, vehicle inventory management,

&#x20; purchasing, stock updates, and administrative restocking.

</p>



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



<strong>Backend</strong>



<pre>

cd backend

venv\\Scripts\\activate

python -m uvicorn app.main:app --reload

</pre>



<strong>Frontend</strong>



<pre>

cd frontend

npm install

npm run dev

</pre>



<strong>Run Tests</strong>



<pre>

cd backend

python -m pytest -q

</pre>



<strong>Build Frontend</strong>



<pre>

cd frontend

npm run build

</pre>



<hr>



<p align="center">

&#x20; <strong>VeyraDrive — Full-Stack Vehicle Inventory Management</strong>

</p>

