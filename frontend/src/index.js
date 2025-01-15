import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { PsyAuthContextProvider } from "./context/PsyAuthContext.jsx";
import { AdminAuthContextProvider } from "./context/AdminAuthContext.jsx"; // Import your Admin Auth Context

ReactDOM.render(
  <PsyAuthContextProvider>
    <AuthContextProvider>
      <SocketContextProvider>
        <AdminAuthContextProvider> {/* Wrap App with AdminAuthContextProvider */}
          <App />
        </AdminAuthContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </PsyAuthContextProvider>,
  document.getElementById('root')
);
