import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const usePsyGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setConversations(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch conversations initially
    fetchConversations();

    // Polling: Fetch conversations every 5 seconds
    const interval = setInterval(fetchConversations, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { loading, conversations, setConversations };
};

export default usePsyGetConversations;