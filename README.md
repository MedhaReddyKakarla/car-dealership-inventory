<h1 align="center">VeyraDrive</h1>



<p align="center">

&#x20; <strong>Car Dealership Inventory Management System</strong>

</p>



<p align="center">

&#x20; A full-stack inventory management application for managing vehicles,

&#x20; stock, users, purchases, and administrative inventory operations.

</p>



<p align="center">

&#x20; <a href="https://car-dealership-frontend-jvvk.onrender.com/">Live Demo</a>

&#x20; \&nbsp; | \&nbsp;

&#x20; <a href="https://car-dealership-api-ab6n.onrender.com/docs">API Documentation</a>

&#x20; \&nbsp; | \&nbsp;

&#x20; <a href="https://drive.google.com/file/d/1R6y4OwZA6g4P16\_POnQJg5ZSlsl3oS2U/view?usp=sharing">Demo Video</a>

</p>



<hr>



<h2>Overview</h2>



VeyraDrive is a full-stack car dealership inventory management system built

with React, FastAPI, PostgreSQL, SQLAlchemy, and JWT-based authentication.



The application provides secure user authentication, vehicle inventory

management, search and filtering, purchasing, and role-based administrative

stock operations.



The application is deployed to the cloud with the frontend and backend

hosted on Render.



<h2>Key Features</h2>



<ul>

&#x20; <li>JWT-based user authentication</li>

&#x20; <li>Role-based authorization with admin access control</li>

&#x20; <li>Create, view, update, and delete vehicle records</li>

&#x20; <li>Vehicle search and category-based filtering</li>

&#x20; <li>Minimum and maximum price filtering</li>

&#x20; <li>Vehicle purchase functionality with automatic stock reduction</li>

&#x20; <li>Out-of-stock protection</li>

&#x20; <li>Admin-only vehicle restocking</li>

&#x20; <li>Inventory refresh after purchase and restock operations</li>

&#x20; <li>Protected REST API endpoints</li>

&#x20; <li>Automated backend testing with Pytest</li>

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



<h2>Application Architecture</h2>



<pre>

&#x20;                   User

&#x20;                    |

&#x20;                    v

&#x20;           React / Vite Frontend

&#x20;                    |

&#x20;               HTTPS / REST

&#x20;                    |

&#x20;                    v

&#x20;            FastAPI Backend

&#x20;                    |

&#x20;         +----------+----------+

&#x20;         |                     |

&#x20;         v                     v

&#x20;    JWT Authentication     SQLAlchemy

&#x20;                               |

&#x20;                               v

&#x20;                        PostgreSQL Database

</pre>



<h2>Cloud Deployment</h2>



The application is deployed using Render.



<strong>Frontend</strong><br>

<a href="https://car-dealership-frontend-jvvk.onrender.com/">

https://car-dealership-frontend-jvvk.onrender.com/

</a>



<br><br>



<strong>Backend API</strong><br>

<a href="https://car-dealership-api-ab6n.onrender.com/">

https://car-dealership-api-ab6n.onrender.com/

</a>



<br><br>



<strong>Swagger API Documentation</strong><br>

<a href="https://car-dealership-api-ab6n.onrender.com/docs">

https://car-dealership-api-ab6n.onrender.com/docs

</a>



<br><br>



The backend uses the <code>DATABASE\_URL</code> environment variable for

database connectivity. Database credentials and application secrets are

kept outside the source code.



<h2>Authentication and Authorization</h2>



The application uses JWT-based authentication.



After successful login, the frontend stores the authentication token and

uses it when communicating with protected backend endpoints.



Role-based authorization is implemented for administrative operations.



<strong>Regular users</strong> can:



<ul>

&#x20; <li>View inventory</li>

&#x20; <li>Search vehicles</li>

&#x20; <li>Purchase vehicles</li>

&#x20; <li>Manage vehicles according to ownership permissions</li>

</ul>



<strong>Administrators</strong> can additionally:



<ul>

&#x20; <li>Restock vehicles</li>

&#x20; <li>Delete vehicles</li>

&#x20; <li>Perform administrative inventory operations</li>

</ul>



<h2>Inventory Operations</h2>



The system supports the complete inventory lifecycle:



<pre>

Create Vehicle

&#x20;     |

&#x20;     v

Available Inventory

&#x20;     |

&#x20;     +------> Purchase ------> Quantity decreases

&#x20;     |

&#x20;     +------> Admin Restock -> Quantity increases

&#x20;     |

&#x20;     +------> Update

&#x20;     |

&#x20;     +------> Delete

</pre>



Purchasing is protected against negative inventory. When the available

quantity reaches zero, further purchases are rejected.



Restocking is restricted to users with administrator privileges.



<h2>Testing</h2>



The backend is tested using Pytest.



Current test result:



<strong>28 tests passed</strong>



The test suite covers authentication, vehicle operations, authorization,

purchase behaviour, stock validation, and administrative restocking.



Test output is available in:



<code>backend/test-report.txt</code>



<h2>Development Approach</h2>



The purchase and restock functionality was developed using a

test-driven development approach.



Tests were added for:



<ul>

&#x20; <li>Successful vehicle purchase</li>

&#x20; <li>Out-of-stock purchase handling</li>

&#x20; <li>Successful administrator restocking</li>

&#x20; <li>Authorization of regular users attempting administrative operations</li>

</ul>



The frontend was then connected to the protected backend APIs and inventory

state was refreshed after successful stock operations.



<h2>Demo Video</h2>



<p>

&#x20; <strong>Demo:</strong>

&#x20; <a href="https://drive.google.com/file/d/1R6y4OwZA6g4P16\_POnQJg5ZSlsl3oS2U/view?usp=sharing">Open project demonstration video</a>

</p>



<p>

&#x20; The demo demonstrates authentication, inventory management, vehicle

&#x20; purchase, stock updates, and administrative restocking.

</p>



<h2>Project Structure</h2>



<pre>

car-dealership-inventory/

|

+-- backend/

|   +-- app/

|   |   +-- models/

|   |   +-- routers/

|   |   +-- schemas/

|   |   +-- services/

|   |   +-- dependencies/

|   |   +-- database.py

|   |   +-- main.py

|   |

|   +-- tests/

|   +-- test-report.txt

|

+-- frontend/

|   +-- src/

|       +-- components/

|       +-- pages/

|       +-- services/

|       +-- App.jsx

|

+-- screenshots/

|

+-- PROMPTS.md

+-- README.md

+-- docker-compose.yml

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



<strong>Run Backend Tests</strong>



<pre>

cd backend

python -m pytest -q

</pre>



<strong>Build Frontend</strong>



<pre>

cd frontend

npm run build

</pre>



<h2>Project Highlights</h2>



<ul>

&#x20; <li>Full-stack React and FastAPI architecture</li>

&#x20; <li>RESTful API design</li>

&#x20; <li>JWT authentication and role-based authorization</li>

&#x20; <li>PostgreSQL database integration using SQLAlchemy</li>

&#x20; <li>Cloud deployment using Render</li>

&#x20; <li>Inventory transaction handling</li>

&#x20; <li>Automated backend testing</li>

&#x20; <li>Clean separation between frontend, API, services, and database layers</li>

</ul>



<hr>



<p align="center">

&#x20; <strong>VeyraDrive — Full-Stack Vehicle Inventory Management</strong>

</p>

