\# AI Development Prompts



This file documents the AI-assisted development used during the VeyraDrive Car Dealership Inventory System project.



The prompts below are preserved as development prompts used while building, debugging, testing, and documenting the application.



\---



\## Project Development



> I am building a car dealership inventory management system. Help me plan the backend, frontend, database, authentication, APIs, testing, and project structure.



\---



\## Vehicle API Development



> Give the full and proper code for the vehicle router with create, get, search, update, and delete vehicle operations using FastAPI, SQLAlchemy, authentication, and admin authorization.



\---



\## Purchase and Restock



> Add purchase and restock functionality to the vehicle inventory system. Purchase should decrease quantity by one and prevent purchases when stock is zero. Restock should increase inventory and should be restricted to administrators.



\---



\## TDD



> Added tests first for successful purchase, out-of-stock handling, admin restock, and regular-user authorization. Implement the corresponding service and API route logic and verify the complete backend test suite.



\---



\## Backend Debugging



> The backend test suite is failing. Help me understand the error, identify the cause, and provide the complete corrected code and commands to verify the fix.



\---



\## Frontend API Integration



> Connect the React inventory page to the purchase and restock APIs. The purchase button should be disabled when quantity reaches zero, and the inventory should refresh after a successful purchase or restock.



\---



\## Authentication Debugging



> After entering my credentials and clicking login, the application returns to the login page. The FastAPI backend is returning 401 for login attempts. Help me diagnose the authentication flow and fix the issue.



\---



\## JWT Authentication



> Review the FastAPI JWT authentication flow including login, token generation, token decoding, current-user dependency, and frontend token persistence. Identify why an authenticated user may be redirected back to the login page.



\---



\## Inventory UI



> Add an inventory action menu where users can purchase vehicles and administrators can restock inventory. Keep admin-only functionality protected by the backend as well as hidden or restricted in the frontend.



\---



\## Testing Verification



> Run and verify the complete backend test suite and confirm that all tests pass after implementing purchase and restock functionality.



\---



\## Documentation



> Create a concise professional README for the car dealership inventory project covering the project overview, features, technology stack, API highlights, setup instructions, testing, screenshots, demo video, and AI usage.



\---



\## Git Workflow



> Help me verify Git status, review changes, create meaningful commits, and push the completed implementation to GitHub.



\---



\## AI Usage Reflection



> Explain how AI assistance can be documented honestly in a software engineering project, including requirement understanding, debugging, test development, API integration, documentation, and code review.



\---



\## Development Verification



AI assistance was used interactively during development. Suggestions were reviewed and adapted while implementing the application.



The implementation was tested locally after changes were made.



Final backend test result:



```text

28 passed

