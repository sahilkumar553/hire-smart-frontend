import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import api from '@/utils/axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                // Get token from localStorage to debug
                const token = localStorage.getItem('authToken');
                console.log('Auth token exists:', !!token);
                
                // Log request URL for debugging
                console.log('Fetching companies from:', `${COMPANY_API_END_POINT}/get`);
                
                const res = await api.get(`${COMPANY_API_END_POINT}/get`);
                console.log('Companies API response:', res.data);
                
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching companies:', error);
                
                // Provide more specific error messages
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Error response:', error.response.status, error.response.data);
                    
                    if (error.response.status === 401) {
                        toast.error("Authentication required. Please log in again.");
                    } else {
                        toast.error(error.response.data?.message || "Failed to load companies");
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    toast.error("Network error. Please check your connection.");
                } else {
                    // Something happened in setting up the request
                    console.error('Request setup error:', error.message);
                    toast.error("Failed to send request to server");
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchCompanies();
    },[dispatch]);
    
    return { loading, error };
};

export default useGetAllCompanies