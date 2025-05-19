import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import api from '@/utils/axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchSingleCompany = async () => {
            if (!companyId) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                // Use the configured API instance
                const res = await api.get(`${COMPANY_API_END_POINT}/get/${companyId}`);
                
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error("Error fetching company:", error);
                setError(error);
                
                if (error.response?.status === 401) {
                    toast.error("Authentication required. Please log in again.");
                } else if (error.response) {
                    toast.error(error.response.data?.message || "Failed to load company data");
                } else {
                    toast.error("Network error. Please check your connection.");
                }
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchSingleCompany();
    }, [companyId, dispatch]);
    
    return { isLoading, error };
}

export default useGetCompanyById