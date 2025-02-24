# Build Complete Pixora Project

## 📌 Overview
This project is designed to empower users with a seamless and intuitive platform for creating and managing digital content. Inspired by Canva, it aims to bridge the gap between simplicity and functionality, allowing both casual users and professionals to design with ease. The ultimate goal is to provide an accessible, efficient, and visually engaging tool that enhances creativity and productivity.

## 🚀 Technologies Used
- **Frontend:** React.js, Functional Components, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Middleware for protected routes, User Register/Login
- **Cloud Storage:** Cloudinary for image uploads

## 🔥 Features
- **User Authentication**: Register and Login functionality with protected routes.
- **Design Tools**:
  - Move, Resize, Rotate elements
  - Add Text with opacity, padding, and font weight options
  - Image upload and manipulation
- **Data Storage**: Store user-generated content in MongoDB.
- **Responsive UI**: Built with Tailwind CSS for a modern and sleek user experience.

## 📂 Project Structure
```
project-folder/
│── controllers/       	   # Business logic
│── middleware/           # Middleware for authentication
│── models/               # Database models (MongoDB)
│── routes/               # API Routes
│── server.js             # Main entry point''
│── package.json          # Dependencies and scripts
│── .env                  # Environment variables
│── .gitignore            # Ignore unnecessary files
│
│── frontend/             # Frontend
│   ├── src/
│   │   ├── components/  # Functional components
│   │   ├── pages/       # Page views
│   │   ├── assets/      # Images, icons
│   │   ├── api/         # Restful api 
│   │   ├── App.js       # Main React App
```

## 🛠 Installation & Setup
### 1. Development Environment
- Recommended IDEs:
  - [Download Visual Studio Code](https://code.visualstudio.com/)
- Required tools:
  - [Download Node.js](https://nodejs.org/)
  - [Download MongoDB](https://www.mongodb.com/try/download/community)
  - [Download Git](https://git-scm.com/downloads)

### 2. Clone the repository
```sh
git clone https://github.com/websitecuakhoi/Presentation-Software.git
```

### 3. Install dependencies
#### Backend Setup
```sh
npm install
```
#### Frontend Setup
```sh
cd frontend
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in `backend/`directories and configure necessary variables:

#### Backend `.env`
```plaintext
LOCAL_DB_URI=your_mongodb_connection_string
NODE_ENV = 'local'
cloud_name=your_cloudinary_name
api_key=your_api_key
api_secret=your_api_secret
PORT = 5000
```

### 5. Start the Application
#### Run Backend Server
```sh
npm run server
```
#### Run Frontend
```sh
cd frontend
npm run dev
```
#### Run Both Frontend and Backend Concurrently
```sh
npm run dev
```
#### Build Frontend for Production
```sh
npm run client-build
```
The application will be accessible at `http://localhost:5173`

### 6. Troubleshooting
If you encounter any issues, check the following:
- Ensure Node.js is installed (`node -v` to verify).
- Check MongoDB connection in your `.env` file.
- Review console logs for any dependency errors.

### 🚀 Transforming Ideas into Reality! ✨

