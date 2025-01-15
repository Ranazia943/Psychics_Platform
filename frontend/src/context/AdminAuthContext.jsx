import { createContext, useContext, useState } from "react";

export const AdminAuthContext = createContext();

export const useAdminAuthContext = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthContextProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem("admin-user")) || null
  );

  return (
    <AdminAuthContext.Provider value={{ adminUser, setAdminUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
