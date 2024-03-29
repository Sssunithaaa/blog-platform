# Blog platform

This project is a full-stack blog platform developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It incorporates additional functionalities such as Tailwind CSS for styling and React-Redux for state management. The platform enables users to create, edit, and manage blog posts, fostering a dynamic and interactive blogging experience.

## Features

- User authentication and authorization for secure access.
- Dynamic rendering of blog posts with React components.
- CRUD operations for creating, editing, and deleting blog posts.
- Responsive design and styling with Tailwind CSS.
- State management using React-Redux for a seamless user experience.

## Technologies Used

- **Frontend:**
  - React.js
  - React Router
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose for ODM)

- **State Management:**
  - Redux
  - React-Redux

- **Authentication:**
  - JSON Web Tokens (JWT)

- **Additional Tools:**
  - Axios for API requests
  - Bcrypt for password hashing

## Docker Compose

The MERN stack blog platform can be easily deployed using Docker Compose. Ensure that you have Docker and Docker Compose installed on your machine.

### Running the Application

 1. Clone the repository:
   - git clone https://github.com/Sssunithaaa/blog-platform.git
   - cd blog-platform

  Run the following command to start the application:
  docker-compose up
  This will build and start the Docker containers for MongoDB, the backend server, and the frontend.

  Open your browser and visit localhost:3000 to access the blog platform.
