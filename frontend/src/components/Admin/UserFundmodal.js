import React from 'react';

const UserFundmodal = ({ show, onClose, onAddFunds, user }) => {
  const [amount, setAmount] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    onAddFunds(user._id, parsedAmount);
    setAmount('');
    onClose();
  };

  // Inline styles
  const modalStyle = {
    display: show ? 'block' : 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  };

  const modalContentStyle = {
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
  };

  const modalHeaderStyle = {
    borderBottom: 'none',
    
    color: 'purple',
    borderRadius: '8px 8px 0 0',
    padding: '10px',
  };

  const closeButtonStyle = {
    color: 'white',
    filter: 'brightness(0) invert(1)',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={modalStyle} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={modalContentStyle}>
          <div className="modal-header" style={modalHeaderStyle}>
            <h6 className="modal-title">Add Funds to {user.username}'s Wallet</h6>
            <button type="button" className="btn-close " onClick={onClose} style={closeButtonStyle}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label" style={{color:"purple"}}>Amount ($)</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="Enter amount"
                  style={inputStyle}
                />
              </div>
              <button type="submit" className='btn btn-purple'>Add Funds</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFundmodal;
