<h1 align="center">VeyraDrive</h1>



<p align="center">

&#x20; <strong>Car Dealership Inventory Management System</strong>

</p>



<p align="center">

&#x20; Full-stack web application for managing vehicle inventory,

&#x20; purchases, stock levels, and administrative operations.

</p>



<p align="center">

&#x20; <a href="https://car-dealership-frontend-jvvk.onrender.com/">

&#x20;   Live Demo

&#x20; </a>

&#x20; \&nbsp; • \&nbsp;

&#x20; <a href="https://car-dealership-api-ab6n.onrender.com/docs">

&#x20;   API Documentation

&#x20; </a>

&#x20; \&nbsp; • \&nbsp;

&#x20; <a href="https://drive.google.com/file/d/1R6y4OwZA6g4P16\_POnQJg5ZSlsl3oS2U/view?usp=sharing">

&#x20;   Demo Video

&#x20; </a>

</p>



<hr>



<h2>Overview</h2>



<p>

&#x20; VeyraDrive is a full-stack car dealership inventory management system

&#x20; built with React, FastAPI, PostgreSQL, SQLAlchemy, and JWT authentication.

</p>



<p>

&#x20; The application allows authenticated users to manage vehicles, search and

&#x20; filter inventory, purchase vehicles, and perform stock operations based on

&#x20; their assigned permissions.

</p>



<h2>Key Features</h2>



<ul>

&#x20; <li>JWT-based authentication</li>

&#x20; <li>Role-based authorization and admin access control</li>

&#x20; <li>Create, view, update, and delete vehicle records</li>

&#x20; <li>Vehicle search and category-based filtering</li>

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



<p>

&#x20; The application also implements role-based authorization for administrative

&#x20; inventory operations.

</p>



<ul>

&#x20; <li><strong>Users:</strong> View, search, purchase, and manage permitted vehicles</li>

&#x20; <li><strong>Administrators:</strong> Additional access to restocking and deletion operations</li>

</ul>



<h2>Inventory Management</h2>



<p>

&#x20; Vehicle inventory supports the complete lifecycle of adding, updating,

&#x20; purchasing, restocking, and removing vehicles.

</p>



<p>

&#x20; Purchasing decreases the available quantity and prevents purchases when

&#x20; inventory reaches zero. Restocking increases inventory and is restricted

&#x20; to administrators.

</p>



<h2>Cloud Deployment</h2>



<p>

&#x20; The application is deployed on Render with separate frontend and backend

&#x20; services.

</p>



<p>

&#x20; <strong>Frontend</strong><br>

&#x20; <a href="https://car-dealership-frontend-jvvk.onrender.com/">

&#x20;   https://car-dealership-frontend-jvvk.onrender.com/

&#x20; </a>

</p>



<p>

&#x20; <strong>Backend API</strong><br>

&#x20; <a href="https://car-dealership-api-ab6n.onrender.com/">

&#x20;   https://car-dealership-api-ab6n.onrender.com/

&#x20; </a>

</p>



<p>

&#x20; <strong>Swagger API Documentation</strong><br>

&#x20; <a href="https://car-dealership-api-ab6n.onrender.com/docs">

&#x20;   https://car-dealership-api-ab6n.onrender.com/docs

&#x20; </a>

</p>



<p>

&#x20; The backend uses the <code>DATABASE\_URL</code> environment variable for

&#x20; database connectivity. Database credentials and application secrets are

&#x20; stored outside the source code.

</p>



<h2>Testing</h2>



<p>

&#x20; The backend is tested using Pytest.

</p>



<p>

&#x20; <strong>Current result: 28 tests passed</strong>

</p>



<p>

&#x20; Tests cover authentication, vehicle operations, authorization,

&#x20; purchase behaviour, stock validation, and administrative restocking.

</p>



<p>

&#x20; Test output:

&#x20; <code>backend/test-report.txt</code>

</p>



<h2>Demo Video</h2>



<p>

&#x20; <a href="https://drive.google.com/file/d/1R6y4OwZA6g4P16\_POnQJg5ZSlsl3oS2U/view?usp=sharing">

&#x20;   Open project demonstration video

&#x20; </a>

</p>



<p>

&#x20; The demonstration covers authentication, inventory management,

&#x20; vehicle purchase, stock updates, and administrative restocking.

</p>



<h2>Project Structure</h2>



<p>

&#x20; The project is organized into separate frontend, backend, testing,

&#x20; and deployment configuration components.

</p>



<pre>

car-dealership-inventory/

├── backend/

│   ├── app/

│   └── tests/

├── frontend/

│   └── src/

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

