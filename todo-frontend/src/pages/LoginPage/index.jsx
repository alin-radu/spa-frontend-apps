import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../security/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const authContext = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    const isAuth = await authContext.login(username, password);

    if (isAuth) {
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="Login">
      <h2>Time to Login!</h2>
      {showErrorMessage && (
        <div className="alert alert-danger">
          Authentication Failed. Please check your credentials.
        </div>
      )}
      <div className="LoginForm">
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          className="btn btn-warning"
          type="button"
          name="login"
          onClick={handleSubmit}
        >
          login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
