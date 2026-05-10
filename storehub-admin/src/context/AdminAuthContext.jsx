import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({
  children,
}) => {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  //  Login
  const login = (data) => {
    localStorage.setItem(
      "adminToken",
      data.token
    );

    localStorage.setItem(
      "admin",
      JSON.stringify(data.admin)
    );

    setAdmin(data.admin);
  };

  //  Logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () =>
  useContext(AdminAuthContext);