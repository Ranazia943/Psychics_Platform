import React, { useState } from 'react';

const Payment_gateway = () => {
  const [paymentMethod, setPaymentMethod] = useState(''); // State to store selected payment method
  const [formData, setFormData] = useState({
    
    clientId: '',
    bankAccountNumber: '',
    paypalEmail: '',
    stripeApiKey: '',
  });

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Withdrawal request submitted successfully!');
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="col-md-12" data-aos="fade-up" data-aos-duration="1000">
            {/* Form for withdrawal request */}
            <form className="form-horizontal" onSubmit={handleSubmit}>
              {/* Email */}
             

              {/* Client ID */}
              <div className="form-group row">
                <label htmlFor="clientId" className="col-sm-2 col-form-label">
                  Client ID
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Payment Method Dropdown */}
              <div className="form-group row">
                <label htmlFor="paymentMethod" className="col-sm-2 col-form-label">
                  Gateway
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    required
                  >
                    <option value="">Select Payment Method</option>
                  
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>
              </div>

              {paymentMethod === 'paypal' && (
                <div className="form-group row">
                  <label htmlFor="paypalEmail" className="col-sm-2 col-form-label">
                    PayPal Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      name="paypalEmail"
                      value={formData.paypalEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'stripe' && (
                <div className="form-group row">
                  <label htmlFor="stripeApiKey" className="col-sm-2 col-form-label">
                    Stripe API Key
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      name="stripeApiKey"
                      value={formData.stripeApiKey}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              
                  <button type="submit" className="btn btn-danger">
                    Apply for Withdrawal
                  </button>
                
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment_gateway;