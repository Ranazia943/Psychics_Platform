// src/components/Psychics/Psychicschat/CustomToast.jsx
import React from 'react';
import { Toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({ timerRequest, onAccept, onReject }) => {
  return (
    <div className="d-flex flex-column">
      <div className="toast-body">
        You have a free timer request from {timerRequest.username}.
      </div>
      <div className="d-flex justify-content-between mt-2">
        <button className="btn btn-success" onClick={onAccept}>
          Accept
        </button>
        <button className="btn btn-danger" onClick={onReject}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
