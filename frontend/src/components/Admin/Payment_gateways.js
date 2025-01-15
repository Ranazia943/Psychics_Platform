import React, { useEffect, useState } from 'react';

const Payment_gateways = () => {
  const [transactions, setTransactions] = useState([]); // State to store transactions
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch all transactions from the backend API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/paypal/transactions'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data); // Set the fetched transactions to state
      } catch (error) {
        setError(error.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchTransactions();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Display error message if there's an error
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Payment Gateways</h1>
              </div>
            </div>
          </div>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card shadow-sm">
                      <div className="card-header  text-white">
                      
  <h6 style={{ color: "white" }}>Transaction ID: {transaction.transactionId}</h6>

                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          <strong>Amount:</strong> {transaction.amount} {transaction.currency}
                        </p>
                        <p className="card-text">
                          <strong>Status:</strong>{' '}
                          <span
                            className={`badge ${
                              transaction.paymentStatus === 'COMPLETED'
                                ? 'bg-success'
                                : 'bg-warning'
                            }`}
                          >
                            {transaction.paymentStatus}
                          </span>
                        </p>
                        <p className="card-text">
                          <strong>Date:</strong>{' '}
                          {new Date(transaction.createdAt).toLocaleString()}
                        </p>
                        <p className="card-text">
                          <strong>User:</strong> {transaction.user.username} (
                          {transaction.user.email})
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-info text-center" role="alert">
                    No transactions found.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment_gateways;