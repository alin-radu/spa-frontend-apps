import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as HelloApiService from '../../api/HelloApiService';
import { useAuth } from '../../contexts/AuthContext';

const Button = ({ label, onClickHandler }) => (
  <button className="btn btn-success m-5" onClick={onClickHandler}>
    {label}
  </button>
);

const WelcomePage = () => {
  const { username } = useParams();
  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  function callHelloRestApi() {
    HelloApiService.retrieveHello()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('---> WelcomePage | cleanup'));
  }

  function callHelloBeanRestApi() {
    HelloApiService.retrieveHelloBean()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('---> WelcomePage | cleanup'));
  }

  function callHelloPathVariable() {
    let token = null;
    if (authContext?.token) {
      token = authContext?.token;
    }

    HelloApiService.retrieveHelloPathVariable('AlinDev', token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('---> WelcomePage | cleanup'));
  }

  function successfulResponse(response) {
    console.log('%c-> developmentConsole: response= ','color:#77dcfd', response)
    if (response.headers?.['content-type'].includes('text/plain')) {
      setMessage(response.data);
    } else {
      setMessage(response.data.message);
    }
  }

  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage your todos - <Link to="/todos">Go here</Link>
      </div>
      <div>
        <Button label={'Call "/hello"'} onClickHandler={callHelloRestApi} />

        <Button label={'Call "/hello-bean"'} onClickHandler={callHelloBeanRestApi} />

        <Button
          label={'Call "/hello/path-variable/..."'}
          onClickHandler={callHelloPathVariable}
        />
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
};

export default WelcomePage;
