import { io } from 'socket.io-client';
import { BASE_URL } from './constant';

// Create a socket instance
const socket = io(BASE_URL, {
  withCredentials: true,
  autoConnect: false // Don't connect automatically
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      // Authenticate with user ID
      socket.emit('authenticate', userId);
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  
  return socket;
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;