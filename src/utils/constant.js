// Get the base API URL from environment variables or use localhost as default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Production URL for deployment
const PRODUCTION_API_URL = 'https://hire-smart-backend-production.up.railway.app';

// Use the appropriate base URL depending on environment
export const BASE_URL = import.meta.env.PROD ? PRODUCTION_API_URL : API_BASE_URL;

export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
export const NOTIFICATION_API_END_POINT = `${BASE_URL}/api/v1/notifications`;
