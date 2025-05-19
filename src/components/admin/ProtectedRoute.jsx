import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for both user in Redux store and token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (user === null || user.role !== 'recruiter' || !token) {
            toast.error("You need to login as a recruiter to access this page");
            navigate("/login");
        }
        
        setLoading(false);
    }, [navigate, user]);

    // Show loading state while checking authentication
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    return children;
};

export default ProtectedRoute;