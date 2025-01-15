import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import { PsyuseAuthContext } from '../../context/PsyAuthContext';

function SendRequest() {
  const { authUser } = useAuthContext();
  const { authPsychics } = PsyuseAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/send-request', {
        userId: authUser.userId,
        psychicId: authPsychics.psychicId,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending request:', error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleSendRequest}
      disabled={isLoading}
    >
      {isLoading ? 'Sending Request...' : 'Send Request'}
    </Button>
  );
}

export default SendRequest;
