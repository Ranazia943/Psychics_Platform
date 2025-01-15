import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { PsyuseAuthContext } from "./PsyAuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastSeenTimes, setLastSeenTimes] = useState({});
  const [typingUsers, setTypingUsers] = useState([]);
  const { authUser } = useAuthContext();
  const { authPsychics } = PsyuseAuthContext();

  useEffect(() => {
    const initializeSocket = () => {
      if (authUser || authPsychics) {
        const userId = authUser?._id || authPsychics?._id;
        const socketInstance = io("http://localhost:3000", {
          query: { userId },
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
        });

        setSocket(socketInstance);

        socketInstance.on("connect", () => {
          console.log("Socket connected:", socketInstance.id);
        });

        socketInstance.on("disconnect", () => {
          console.log("Socket disconnected");
        });

        socketInstance.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        socketInstance.on("lastSeenUpdate", (lastSeenData) => {
          setLastSeenTimes(lastSeenData);
        });

        socketInstance.on("typing", ({ senderId, isTyping }) => {
          setTypingUsers((prevTypingUsers) => {
            if (isTyping) {
              return [...prevTypingUsers, senderId];
            } else {
              return prevTypingUsers.filter((user) => user !== senderId);
            }
          });
        });

        socketInstance.on("timerRequest", (data) => {
          console.log("Timer request received:", data);
          // Handle the timer request data and show a toast notification
        });

        const handlePageClose = () => {
          if (socketInstance) {
            console.log("Emitting userDisconnected event");
            socketInstance.emit("userDisconnected", userId);
          }
        };

        window.addEventListener("beforeunload", handlePageClose);

        return () => {
          window.removeEventListener("beforeunload", handlePageClose);
          if (socketInstance) {
            socketInstance.disconnect();
          }
        };
      }
    };

    initializeSocket();
  }, [authUser, authPsychics]);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, lastSeenTimes, typingUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
};
