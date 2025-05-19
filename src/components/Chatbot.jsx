import { FaCommentDots, FaTimes, FaUser, FaRobot } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { BASE_URL } from "@/utils/constant";
import { toast } from "sonner";

// Fallback responses when backend is unavailable
const fallbackResponses = {
  greeting: [
    "Hello! I'm currently in offline mode, but I can still answer basic questions.",
    "Hi there! I'm operating with limited capabilities right now.",
    "Welcome! I'm currently working in offline mode."
  ],
  default: [
    "I'm sorry, I can't provide a detailed answer right now as I'm in offline mode.",
    "I'd love to help with that, but I'm currently operating with limited capabilities.",
    "That's a good question, but I need to be online to answer it properly.",
    "I'm in offline mode right now. Please try again later when the service is back online."
  ],
  project: [
    "This is the Smart Labour Hiring platform that connects workers with employers efficiently.",
    "The Smart Labour Hiring system helps match skilled laborers with relevant job opportunities."
  ],
  about: [
    "The Smart Labour Hiring System bridges the gap between employers and workers by providing an easy-to-use platform."
  ],
  features: [
    "Some key features include job posting, skill-based matching, secure payments, and ratings for both employers and workers."
  ]
};

function getRandomFallbackResponse(type) {
  const responses = fallbackResponses[type] || fallbackResponses.default;
  return responses[Math.floor(Math.random() * responses.length)];
}

function matchFallbackIntent(input) {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return 'greeting';
  }
  
  if (lowerInput.includes('what is') && (lowerInput.includes('project') || lowerInput.includes('platform'))) {
    return 'project';
  }
  
  if (lowerInput.includes('about')) {
    return 'about';
  }
  
  if (lowerInput.includes('feature')) {
    return 'features';
  }
  
  return 'default';
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatAvailable, setChatAvailable] = useState(true);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if chat endpoint is available when component mounts
  useEffect(() => {
    checkChatAvailability();
  }, []);

  const checkChatAvailability = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${BASE_URL}/health`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setChatAvailable(true);
      } else {
        setChatAvailable(false);
      }
    } catch (error) {
      console.error("Chat service availability check failed:", error);
      setChatAvailable(false);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", text: userInput }];
    setMessages(newMessages);
    const inputText = userInput;
    setUserInput("");
    setLoading(true);
    setError(null);

    if (!chatAvailable) {
      // Use fallback responses when chat is unavailable
      const intent = matchFallbackIntent(inputText);
      const fallbackResponse = getRandomFallbackResponse(intent);
      
      setTimeout(() => {
        setMessages([...newMessages, { 
          role: "bot", 
          text: fallbackResponse 
        }]);
        setLoading(false);
      }, 1000); // Slight delay to make it feel more natural
      return;
    }

    try {
      // Create an AbortController to implement timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
      
      const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { role: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      
      // Handle different types of errors differently
      if (error.name === 'AbortError') {
        setError("Request timed out. The chat service might be busy.");
        setMessages([...newMessages, { 
          role: "bot", 
          text: "I'm sorry, but it's taking too long to get a response. The service might be busy right now. Please try again later." 
        }]);
      } else {
        setError("Unable to connect to the chatbot service.");
        setMessages([...newMessages, { 
          role: "bot", 
          text: "Sorry, I'm having trouble connecting to our services right now. Please try again later." 
        }]);
      }
      
      // Mark chat as unavailable after errors
      setChatAvailable(false);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="fixed p-4 text-white transition duration-300 ease-in-out transform rounded-full shadow-xl bottom-5 right-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 z-50 hover:shadow-indigo-500/30"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
      </button>

      {/* Chatbot Container */}
      <div
        className={`fixed bottom-20 right-5 w-96 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out z-50 overflow-hidden border border-gray-100 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="py-4 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">AI Assistant</h1>
              <div className="flex items-center">
                <p className="text-xs text-indigo-100">
                  {chatAvailable ? "Always here to help" : "Offline mode"}
                </p>
                {!chatAvailable && (
                  <span className="ml-2 inline-flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={toggleChatbot}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close chatbot"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Offline notice with retry button */}
        {!chatAvailable && (
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-200">
            <div className="flex items-center justify-between">
              <p className="text-xs text-amber-800">
                Chat service is currently offline. Using basic responses.
              </p>
              <button 
                onClick={() => {
                  checkChatAvailability();
                  toast.info("Checking if chat service is available...");
                }}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
              >
                Retry connection
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="p-4 space-y-4 overflow-y-auto h-80 bg-gray-50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                <FaRobot className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">Hello there!</h3>
              <p className="text-sm text-gray-500 max-w-xs">I'm your AI assistant. How can I help you today?</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <FaRobot className="text-indigo-600 text-sm" />
                </div>
              )}
              <div 
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-indigo-600 text-white rounded-br-none" 
                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-white text-sm" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-indigo-600 text-sm" />
              </div>
              <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-grow p-3 text-gray-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!userInput.trim()}
              className={`p-3 rounded-full transition-all ${
                userInput.trim() 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
