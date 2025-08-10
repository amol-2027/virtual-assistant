# AI Assistant - Personal Virtual Assistant

A full-stack AI-powered virtual assistant application built with React, Node.js, and Google Gemini AI. This project allows users to create personalized AI assistants with custom names and images, capable of handling various tasks through natural language processing.

## 🚀 Features

### Core Features

- **Personalized AI Assistant**: Create and customize your own AI assistant with a unique name and image
- **Natural Language Processing**: Interact with your assistant using natural language commands
- **Multi-Intent Recognition**: Supports various types of requests including:
  - General knowledge questions
  - Web searches (Google, YouTube)
  - Utility functions (time, date, weather, calculator)
  - Social media access (Instagram, Facebook)
  - Voice-friendly responses

### User Management

- **Authentication System**: Secure signup and signin with JWT tokens
- **User Profiles**: Store user preferences and assistant customizations
- **Session Management**: Persistent login with secure cookie handling

### AI Capabilities

- **Smart Intent Classification**: Automatically categorizes user requests
- **Contextual Responses**: Provides relevant, voice-friendly responses
- **Multi-Platform Integration**: Seamlessly handles various service requests

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage
- **Google Gemini AI** - AI language model integration

## 📁 Project Structure

```
ai-assistant/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context for state management
│   │   ├── pages/           # Application pages
│   │   └── assets/          # Static assets and images
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── backend/                  # Node.js backend server
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── gemini.js            # AI integration
│   └── package.json         # Backend dependencies
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Google Gemini AI API key
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-assistant
   ```

2. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_URL=your_gemini_api_endpoint
   GEMINI_API_KEY=your_gemini_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will open in your browser at `http://localhost:5173`

## 📱 Usage

### 1. Account Creation

- Navigate to the signup page
- Create an account with your email and password
- Sign in to access your personalized dashboard

### 2. Customize Your Assistant

- Set a unique name for your AI assistant
- Upload a custom image or choose from available options
- Personalize the appearance to match your preferences

### 3. Interact with Your Assistant

- Use natural language to communicate with your assistant
- Ask questions, request information, or give commands
- The AI will intelligently categorize your requests and provide appropriate responses

### 4. Supported Commands

- **General Questions**: "What's the capital of France?"
- **Web Searches**: "Search for latest tech news"
- **YouTube**: "Play Despacito on YouTube"
- **Utilities**: "What time is it?", "What's today's date?"
- **Social Media**: "Open Instagram"
- **Calculations**: "Open calculator"

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### User Management

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/assistant` - Update assistant settings

### AI Integration

- `GET /` - AI response endpoint (with query parameters)

## 🎨 Customization

The application supports extensive customization:

- **Assistant Personality**: Custom names and characteristics
- **Visual Appearance**: Personal images and styling
- **Response Types**: Configurable AI behavior patterns
- **User Interface**: Modern, responsive design with Tailwind CSS

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **CORS Protection**: Cross-origin resource sharing security
- **Input Validation**: Server-side request validation
- **Secure File Uploads**: Safe image handling with Cloudinary

## 🚀 Deployment

### Frontend Deployment

```bash
cd frontend
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Backend Deployment

- Deploy to platforms like Heroku, Railway, or AWS
- Ensure environment variables are properly configured
- Set up MongoDB Atlas for production database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Amol Rathod** - Full-stack developer and AI enthusiast

## 🙏 Acknowledgments

- Google Gemini AI for providing the language model
- React and Node.js communities for excellent documentation
- Tailwind CSS for the beautiful UI framework

## 📞 Support

For support and questions, please open an issue in the repository or just drop an email at amolr778899@gmail.com

---

**Happy coding! 🎉**
