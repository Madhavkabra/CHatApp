import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import login from "../../services/firebase/user/login";

const Login = ({ component: Component, authenticated, ...rest }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const loginUser = async () => {
    try {
      const loginResponse = await login(email, password)
      history.push('/chat');
    } catch (error) {
      window.alert(error.message)
    }
  }

  return (
    <>
      <button onClick={() => history.push('/')}>Back to home</button>
      <div>

        Login
        <div>
          Email :
          <div>
            <input onChange={e => setEmail(e.target.value)} value={email} />
          </div>
        </div>
        <div>
          Password :
          <div>
            <input onChange={e => setPassword(e.target.value)} value={password} />
          </div>
        </div>
        <div>
          <button onClick={loginUser}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Login;