import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants.ts";
import axios from "axios";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (userName, passWord) => {
    axios({
      method: "POST",
      url: `${API_BASE_URL}/api/token/`,
      data: {
        username: userName,
        password: passWord,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          setAuthTokens(response.data);
          setUser(jwt_decode(response.data.access));
          localStorage.setItem("authTokens", JSON.stringify(response.data));
          navigate("/Library");
        }
      })
      .catch(function (error) {
        var stringLogin = "Please check your Login info! \n";
        if (error.response.data.detail) {
          stringLogin = stringLogin + error.response.data.detail;
        }
        alert(stringLogin);
      });
  };

  const registerUser = async (userName, eMail, passWord, passWord2) => {
    axios({
      method: "POST",
      url: `${API_BASE_URL}/api/registration/`,
      data: {
        username: userName,
        email: eMail,
        password: passWord,
        password2: passWord2,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
        }
      })
      .catch(function (error) {
        var string = "Something went wrong! \n";
        if (error.response.data.email) {
          for (let i = 0; i < error.response.data.email.length; i++) {
            string = string + error.response.data.email[i] + "\n";
          }
        }
        if (error.response.data.password) {
          for (let i = 0; i < error.response.data.password.length; i++) {
            string = string + error.response.data.password[i] + "\n";
          }
        }
        if (error.response.data.username) {
          for (let i = 0; i < error.response.data.username.length; i++) {
            string = string + error.response.data.username[i] + "\n";
          }
        }

        alert(string);
      });
    // const response = await fetch(`${API_BASE_URL}/api/registration/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username,
    //     email,
    //     password,
    //     password2,
    //   }),
    // });
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
