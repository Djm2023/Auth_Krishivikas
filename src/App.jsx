import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginContainer from "./components/LoginContainer";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
