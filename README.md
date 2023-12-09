# CareerNest - Job Application and Management System

## Overview

CareerNest is a full-stack web application designed to streamline job application processes and manage job listings effectively. It provides a user-friendly platform for job seekers to apply for positions and for employers to post and manage job listings. The application is built using React for the frontend and Express with MongoDB for the backend.

## Features

- **User Authentication:** Secure user authentication and registration system.
- **Job Listings:** Employers can post, edit, and delete job listings with details such as title, description, posting date, and application deadline.
- **Job Application:** Job seekers can apply for positions through a user-friendly interface.
- **User Profiles:** Users can view and edit their profiles, including name, email, and applied jobs.
- **Email Notifications:** Automated email notifications for successful job applications.
- **Role-Based Access Control:** Employers and job seekers have distinct roles and permissions.

## Tech Stack

- **Frontend:** React.js, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Email Service:** Email.js for sending email notifications

## Installation

### Client-side

1. Navigate to the `career-nest-client` directory:

   ```bash
   cd career-nest-client
   ```
2. Install dependencies:
    ```bash
    npm install react-router-dom localforage match-sorter sort-by
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm i -D daisyui@latest
    npm install
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```

### Server-side
1. Navigate to the MediScan-server directory:

```bash
cd career-nest-server
```

2. Install dependencies:

```bash
npm install express cors mongodb dotenv emailjs-com
```

3. Update the start script in package.json:



4. Run the server using nodemon:

```bash
npm start
```  



Feel free to ask if you have any further requests or modifications!
