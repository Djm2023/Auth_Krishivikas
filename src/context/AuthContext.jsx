import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 🔥 Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setIsAuthLoading(false);
  }, []);

  // 🔥 Login → extract only required data
  const login = (apiResponse) => {
    const userData = apiResponse.result.response.data;
    const token = apiResponse.result.response.token;

    // optional: clean user object (recommended)
    const cleanUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      company: userData.company_name,
    };

    localStorage.setItem("user", JSON.stringify(cleanUser));
    localStorage.setItem("token", token);

    setUser(cleanUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
