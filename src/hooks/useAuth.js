import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const user_name = response?.data?.user_name;
      const role = response?.data?.role;

      setAuth({ email, password, role, user_name });

      return [true,role]; // Return true to indicate successful login
    } catch (err) {
      console.error("Login failed:", err);
      return [false,undefined]; // Return false to indicate login failure
    }
  };
  const logout = () => {
    // Clear the auth state when logging out
    setAuth({});
    navigate("/login");
  };

  const fetchUserWithRoles = async () => {
    try {
      
      const response = await axios.get(`http://localhost:5000/api/user/${id}`); // Replace with your actual API endpoint for fetching user info
      const userData = response?.data;

      setAuth(userData);
      // console.log("UserData",userData)
      return userData.role;
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  return { auth, login,logout, fetchUserWithRoles };
//   return { auth, login };


};

export default useAuth;
