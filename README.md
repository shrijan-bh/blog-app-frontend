# Blog Post Frontend
This is a Next.js frontend application for a blog post website. It provides functionalities like user authentication, blog creation, and content management, offering a smooth user experience and efficient interaction with a backend API.

## Overview
This project enables users to manage blogs with a rich set of features such as secure user authentication, creating and editing blogs, and image handling. The application ensures that users have an intuitive experience with built-in form validations, easy-to-manage state, and robust error handling for API interactions.

#### The main functionalities of the blog website include:

- **User Authentication**: Securely handles login and logout, storing JWT tokens in cookies.
- **Blog Creation**: Allows users to create blogs with various fields, including title, content, and tags.
- **Validation**: Ensures proper validation of form inputs using Formik and Yup.
- **Data Fetching**: Implements seamless communication with a backend API for managing blogs.



## Installation

Follow these steps to clone, install, and set up the project:

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name 
```

### Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

### Environment Configuration

Create a file named .env.local in the root of your project directory and add the following content to configure the environment variables:

```plaintext
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```
Make sure to replace http://localhost:8000 with your actual backend API base URL if it's hosted elsewhere.

### Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```
The application will be available at http://localhost:3000.

## Folder Structure (App Router)
The project follows the App Router structure introduced in Next.js 13:


```bash
src/
├── app/
│   ├── auth/               # Authentication related components (Login, Register)
│   ├── blog/               # Blog related pages and components (List, Create, [id])
├── components/             # Reusable components 
├── hooks/                  # Custom React hooks (e.g., useAuth for authentication)
├── types/                  # TypeScript types and interfaces
├── utils/                  # Utility functions (e.g., API calls, file upload service)
```

### Scripts
- **Start Development Server***: npm run dev

### Future Enhancements

1. **Add unit and integration testing** with a library like Jest or React Testing Library.
2. **Optimize API interactions** with caching mechanisms like React Query or SWR.
3. **Enhance UI/UX** with animations and better responsiveness.

