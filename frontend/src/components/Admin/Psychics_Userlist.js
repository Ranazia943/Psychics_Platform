import React, { useEffect, useState } from 'react';
import avatar from '../Images/avatar.png';
import axios from 'axios';
import { useAdminAuthContext } from '../../context/AdminAuthContext';
import { jsPDF } from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Psychics_Userlist = () => {
  const { adminUser } = useAdminAuthContext();
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchConversations = async (page) => {
      if (!adminUser) return;

      setLoadingConversations(true);
      try {
        const response = await axios.post('/api/messages/conversations', {
          adminId: adminUser._id,
          page: currentPage,
          limit: 6,
        });

        setConversations(response.data.conversations);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Could not fetch conversations.');
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchConversations(currentPage);
  }, [adminUser, currentPage]);

  const downloadPDF = async (conversation) => {
    const doc = new jsPDF();
    let yOffset = 20;
    const pageWidth = doc.internal.pageSize.getWidth() - 20; // Leave some margin

    doc.setFontSize(14);
    doc.text(`Conversation ID: ${conversation._id}`, 10, yOffset);
    yOffset += 10;

    // Get sender and receiver details from the first message
    const sender = conversation.messages[0].senderId || {};
    const receiver = conversation.messages[0].receiverId || {};

    // Add sender's profile picture
    let senderProfilePic = avatar;
    if (sender.profilePic) {
      try {
        senderProfilePic = await getImageBase64(sender.profilePic);
      } catch (err) {
        console.error('Error converting sender image to base64:', err);
      }
    }
    doc.addImage(senderProfilePic, 'PNG', 10, yOffset, 15, 15);
    doc.text(`${sender.username || 'Unknown Sender'} sending messages to`, 30, yOffset + 10);

    // Add receiver's profile picture
    let receiverProfilePic = avatar;
    if (receiver.profilePic) {
      try {
        receiverProfilePic = await getImageBase64(receiver.profilePic);
      } catch (err) {
        console.error('Error converting receiver image to base64:', err);
      }
    }
    doc.addImage(receiverProfilePic, 'PNG', 10, yOffset + 20, 15, 15);
    doc.text(receiver.username || 'Unknown Receiver', 30, yOffset + 30);

    yOffset += 50; // Move down for the messages

    // Add messages to the PDF
    for (const message of conversation.messages) {
      const senderName = message.senderId ? message.senderId.username : 'Psychic';
      const messageContent = message.message || '';
      const messageTime = new Date(message.createdAt).toLocaleString();

      doc.setFontSize(12);
      // Add sender name
      doc.text(`${senderName}:`, 10, yOffset);

      // Add message content with word wrapping
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(messageContent, pageWidth - 30); // Adjust width for margins
      doc.text(lines, 20, yOffset + 5);

      // Add message time
      doc.text(messageTime, 20, yOffset + lines.length * 10 + 10); // Move below the message content

      // Increase the vertical position for the next message with extra spacing
      yOffset += lines.length * 10 + 25; // Increase spacing after each message

      // Check if a new page is needed
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20; // Reset yOffset for the new page
      }
    }

    doc.save(`conversation_${conversation._id}.pdf`);
  };

  const getImageBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const deleteConversation = async (conversationId) => {
    try {
      const response = await axios.delete(`/api/messages/conversations/${conversationId}`);
      if (response.status === 200) {
        // Update the conversations state to remove the deleted conversation
        setConversations((prevConversations) => 
          prevConversations.filter(convo => convo._id !== conversationId)
        );
        toast.success('Conversation deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting conversation:', err);
      toast.error('Failed to delete conversation. Please try again.');
    }
  };

  return (
    <div className="content-wrapper">
      <ToastContainer />
      <section className="content-header">
        <div className="container-fluid">
          <div className="selected-conversation">
            {loadingConversations && <p>Loading conversations...</p>}
            {error && <p>{error}</p>}

            <h2>All Conversations</h2>
            <div className="conversation-container">
              {conversations.map((conversation) => {
                const sender = conversation.messages[0].senderId || {};
                const receiver = conversation.messages[0].receiverId || {};
                return (
                  <div className="conversation-card" key={conversation._id}>
                    <div className="messages">
                      <h4>Messages:</h4>
                      {conversation.messages.length > 0 ? (
                        <>
                          {/* Display Sender's Name and Profile Picture */}
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img
                              src={sender.profilePic || avatar}
                              alt={sender.username || 'Unknown Sender'}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                marginRight: '10px',
                                objectFit: 'cover',
                              }}
                            />
                            <strong>{sender.username || 'Unknown Sender'}</strong>
                            <span style={{ margin: '0 10px' }}>sending messages to</span>
                            <img
                              src={receiver.profilePic || avatar}
                              alt={receiver.username || 'Unknown Receiver'}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                marginRight: '10px',
                                objectFit: 'cover',
                              }}
                            />
                            <strong>{receiver.username || 'Unknown Receiver'}</strong>
                          </div>

                          {/* Display All Messages */}
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {conversation.messages.map((message) => {
                              return (
                                <li key={message._id} style={{ marginBottom: '10px' }}>
                                  <div style={{ marginLeft: '40px' }}>
                                    <div>{message.message}</div>
                                    <small>{new Date(message.createdAt).toLocaleString()}</small>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <p>No messages available.</p>
                      )}
                    </div>

                    <button className='btn' onClick={() => downloadPDF(conversation)}>Download PDF</button>
                    <button className='btn' onClick={() => deleteConversation(conversation._id)}> <i className="fas fa-trash-alt text-white"></i></button>
                  </div>
                );
              })}
            </div>
            <br />
            <div className="pagination-controls">
              <button
                className="btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                className="btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Psychics_Userlist;
