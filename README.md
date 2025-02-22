# Task Management Application (Client)

## Live Link
[Task Management App](https://task-management-2edae.web.app/)

## Description
This is the frontend of the Task Management Application, built using **Vite.js** and **React**. It provides an interactive UI for managing tasks, allowing users to add, edit, delete, and reorder them using drag-and-drop functionality. The application supports real-time synchronization with a **MongoDB backend** and **Firebase Authentication**.

## Features
- **Authentication**: Google Sign-In via Firebase.
- **Task Management**:
  - Add, edit, and delete tasks.
  - Drag-and-drop to reorder or change categories.
  - Real-time syncing with MongoDB.
- **Database & Persistence**:
  - Uses MongoDB via an Express.js backend.
  - Ensures real-time updates with WebSockets.
- **Responsive UI**:
  - Works seamlessly on both desktop and mobile.
  - Minimalist design with a maximum of four colors.
- **Bonus Features**:
  - Dark mode toggle.

## Technologies Used
- **Frontend**: Vite.js, React, Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Firebase Authentication

## Installation Steps
### Clone the repository
```sh
git clone https://github.com/rudraprotapchakraborty/task-management-client.git
cd task-management-client
```

### Install dependencies
```sh
npm install
```

### Create an `.env` file and add the Firebase config
```sh
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_SERVER_URL=https://your-backend-url.com
```

### Run the application
```sh
npm run dev
```

## License
This project is licensed under the MIT License.

