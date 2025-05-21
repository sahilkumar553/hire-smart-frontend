# Hire Smart - Frontend

A modern web application for connecting skilled labor workers with potential employers. This frontend application is built with React, Vite, and TailwindCSS.

## 🚀 Features

- User authentication (login/signup)
- Job listings and search functionality
- Profile management for workers and employers
- Job application system
- Company registration and management
- Admin dashboard for oversight
- Real-time notifications
- Responsive design for all devices

## 🛠️ Tech Stack

- **Framework**: React with Vite
- **Styling**: TailwindCSS with custom components
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **UI Components**: Custom components with shadcn/ui patterns
- **HTTP Client**: Axios
- **Notification**: React Toastify
- **Form Management**: Native React state

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahilkumar553/hire-smart-frontend.git
   cd hire-smart-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with:
   ```
   VITE_API_URL=your_backend_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🚦 CI/CD Pipeline

This project uses Jenkins for continuous integration and deployment:

- **Repository**: Changes pushed to GitHub trigger the pipeline
- **Build**: Jenkins builds the application
- **Deployment**: Automatic deployment to Vercel

## 📁 Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, fonts, etc.
│   ├── components/  # React components
│   │   ├── admin/   # Admin dashboard components
│   │   ├── auth/    # Authentication components
│   │   ├── shared/  # Shared/reusable components
│   │   └── ui/      # UI components
│   ├── context/     # React contexts
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utilities and libraries
│   ├── pages/       # Page components
│   ├── redux/       # Redux store and slices
│   ├── utils/       # Utility functions
│   ├── App.jsx      # Main App component
│   └── main.jsx     # Entry point
├── .eslintrc.cjs    # ESLint configuration
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── tailwind.config.js # TailwindCSS configuration
└── vite.config.js   # Vite configuration
```

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🌐 Deployment

The application is deployed to Vercel. Each push to the main branch triggers a deployment through our Jenkins CI/CD pipeline.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Maintainer - Sahil Kumar Gupta
