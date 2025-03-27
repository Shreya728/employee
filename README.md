EmployWise User Management System
🚀 Overview
This is a React-based user management system that integrates with the Reqres API for authentication, user listing, editing, deleting, and searching users. The app is deployed on Heroku.

🌟 Features
✅ User Authentication – Login using Reqres API
✅ Token-based Authorization – Secure token storage
✅ User Listing – Paginated list with avatars
✅ Search & Filtering – Find users easily
✅ Edit User Details – Update user’s name & email
✅ Delete Users – Remove users dynamically
✅ Material UI for Styling – Modern & responsive UI
✅ React Router – Multi-page navigation
✅ React Query for API Calls – Efficient data fetching

🛠️ Installation
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/Shreya728/employwise-user-management.git
cd employwise-user-management
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Run the Application Locally
sh
Copy
Edit
npm start
The app will be available at http://localhost:3000

The server runs in development mode

🌐 Deployment
This project is deployed on Heroku. You can access it here:
🔗 Live Demo

🔑 Authentication
Use the following credentials to log in:

Email: eve.holt@reqres.in

Password: cityslicka

Upon successful login, an authentication token is stored in localStorage.

📝 API Endpoints Used
Feature	Method	Endpoint	Payload / Params
Login	POST	/api/login	{ email, password }
Get Users (Paginated)	GET	/api/users?page=1	N/A
Update User	PUT	/api/users/{id}	{ first_name, last_name, email }
Delete User	DELETE	/api/users/{id}	N/A
📌 Assumptions & Considerations
API does not persist data, so updates and deletions won't be reflected on refresh.

Client-side search is implemented, but API filtering is not available.

Pagination is supported through Reqres API.

Authentication token is stored in localStorage, but no expiration check is implemented.

CORS Issue Handling: Used cors-anywhere proxy. If facing CORS issues, run:

sh
Copy
Edit
https://cors-anywhere.herokuapp.com/corsdemo
🚀 Future Enhancements
🔹 JWT Expiry Handling
🔹 Better API Caching & Optimization
🔹 Role-based Access Control

📜 License
This project is open-source under the MIT License.

