import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AcceptedApplicationsTable from './components/admin/AcceptedApplicationsTable';
import PaymentSuccess from './components/admin/PaymentSuccess';
import StudentsList from './components/StudentsList';
import AboutUs from './pages/AboutUs';
import Contact from './components/Contact';
import BlogSection from './components/BlogSection';
import HelpCenter from './pages/HelpCenter';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/authSlice';
import api from './utils/axios';

// Configure global axios defaults to include auth token
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Authentication debugging component
function AuthDebug() {
  const [authState, setAuthState] = useState({
    token: null,
    tokenStatus: 'checking',
    user: null,
    apiTest: { status: 'not-run', result: null }
  });
  
  useEffect(() => {
    // Check token
    const token = localStorage.getItem('authToken');
    setAuthState(prev => ({ ...prev, token: token ? `${token.substring(0, 15)}...` : 'No token' }));
    
    // Check token validity
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          const expiry = new Date(payload.exp * 1000);
          const now = new Date();
          setAuthState(prev => ({ 
            ...prev, 
            tokenStatus: expiry > now ? 'valid' : 'expired',
            tokenData: payload
          }));
        } else {
          setAuthState(prev => ({ ...prev, tokenStatus: 'invalid-format' }));
        }
      } catch (err) {
        setAuthState(prev => ({ ...prev, tokenStatus: 'invalid', error: err.message }));
      }
    } else {
      setAuthState(prev => ({ ...prev, tokenStatus: 'missing' }));
    }
  }, []);
  
  const testApi = async (endpoint) => {
    setAuthState(prev => ({ ...prev, apiTest: { status: 'loading', endpoint } }));
    try {
      const response = await api.get(endpoint);
      setAuthState(prev => ({ 
        ...prev, 
        apiTest: { 
          status: 'success', 
          endpoint,
          result: response.data,
          statusCode: response.status
        } 
      }));
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        apiTest: { 
          status: 'error', 
          endpoint,
          error: error.response?.data || error.message,
          statusCode: error.response?.status
        } 
      }));
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Authentication Debugger</h1>
      
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Token Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Token:</p>
            <div className="text-xs mt-1 p-2 bg-gray-100 rounded">{authState.token}</div>
          </div>
          <div>
            <p className="text-sm font-medium">Status:</p>
            <div className={`text-sm mt-1 p-1 rounded inline-block ${
              authState.tokenStatus === 'valid' ? 'bg-green-100 text-green-800' :
              authState.tokenStatus === 'expired' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {authState.tokenStatus}
            </div>
          </div>
        </div>
        
        {authState.tokenData && (
          <div className="mt-4">
            <p className="text-sm font-medium">Token Data:</p>
            <pre className="text-xs mt-1 p-2 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(authState.tokenData, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">API Test</h2>
        <div className="flex space-x-2 mb-4">
          <button 
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm" 
            onClick={() => testApi(`${USER_API_END_POINT}/me`)}
          >
            Test /me
          </button>
          <button 
            className="px-3 py-1 bg-green-600 text-white rounded text-sm" 
            onClick={() => testApi('/api/v1/company/get')}
          >
            Test company
          </button>
        </div>
        
        {authState.apiTest.status !== 'not-run' && (
          <div className="mt-2">
            <p className="text-sm font-medium">
              {authState.apiTest.endpoint} - 
              Status: {authState.apiTest.statusCode || 'N/A'} 
              ({authState.apiTest.status})
            </p>
            <pre className="text-xs mt-1 p-2 bg-gray-100 rounded overflow-auto h-40">
              {JSON.stringify(authState.apiTest.result || authState.apiTest.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="flex space-x-4">
        <button 
          className="px-4 py-2 bg-red-600 text-white rounded" 
          onClick={() => {
            localStorage.removeItem('authToken');
            window.location.reload();
          }}
        >
          Clear Token & Reload
        </button>
        <button 
          className="px-4 py-2 bg-gray-600 text-white rounded" 
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    )
  },
  {
    path: '/auth-debug',
    element: <AuthDebug />
  },
  {
    path: '/login',
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    )
  },
  {
    path: '/signup',
    element: (
      <MainLayout>
        <Signup />
      </MainLayout>
    )
  },
  {
    path: "/jobs",
    element: (
      <MainLayout>
        <Jobs />
      </MainLayout>
    )
  },
  {
    path: "/description/:id",
    element: (
      <MainLayout>
        <JobDescription />
      </MainLayout>
    )
  },
  {
    path: "/browse",
    element: (
      <MainLayout>
        <Browse />
      </MainLayout>
    )
  },
  {
    path: "/profile",
    element: (
      <MainLayout>
        <Profile />
      </MainLayout>
    )
  },
  {
    path: "/students",
    element: (
      <MainLayout>
        <StudentsList />
      </MainLayout>
    )
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/blog",
    element: <BlogSection />
  },
  {
    path: "/help",
    element: <HelpCenter />
  },
  // Admin routes
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Companies />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CompanyCreate />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CompanySetup />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <AdminJobs />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <PostJob />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/post-job",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <PostJob />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Applicants />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/accepted",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <AcceptedApplicationsTable />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/payment-success/:applicationId",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <PaymentSuccess />
        </MainLayout>
      </ProtectedRoute>
    )
  }
]);

function App() {
  const dispatch = useDispatch();

  // Check authentication status on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Verify token and get current user data
          const response = await api.get(`${USER_API_END_POINT}/me`);
          if (response.data.success) {
            dispatch(setUser(response.data.user));
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          // Clear invalid token
          localStorage.removeItem('authToken');
        }
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
}

export default App;
