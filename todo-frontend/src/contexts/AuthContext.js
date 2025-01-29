import { createContext, useContext, useState } from 'react';
import { executeJwtAuthService } from '../api/AuthenticationApiService';
import { setApiClientAuthorizationHeader } from '../api/ApiClient';
import { getJWTTokenString } from '../utils';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  async function login(username, password) {
    try {
      const response = await executeJwtAuthService(username, password);

      if (response.status === 200) {
        const jwtToken = getJWTTokenString(response.data.token);

        if (!jwtToken) {
          logout();
          return false;
        }

        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        setApiClientAuthorizationHeader(jwtToken);

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}

// v1
// function login(username, password) {
//   if (username === 'dev' && password === '123') {
//     setAuthenticated(true);
//     setUsername(username);
//     return true;
//   } else {
//     setAuthenticated(false);
//     setUsername(null);
//     return false;
//   }
// }

// v2
// async function login(username, password) {
//   const basicToken = getBasicTokenEncoded(username, password);

//   try {
//     const response = await executeBasicAuthService(basicToken);

//     if (response.status === 200) {
//       setAuthenticated(true);
//       setUsername(username);
//       setToken(basicToken);

//       setApiClientAuthorizationHeader(basicToken);

//       return true;
//     } else {
//       logout();
//       return false;
//     }
//   } catch (error) {
//     logout();
//     return false;
//   }
// }
