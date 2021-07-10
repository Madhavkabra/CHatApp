import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import signup from "../../services/firebase/user/signup";

const Signup = ({ component: Component, authenticated, ...rest }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const registerUser = async () => {
    try {
      const signupResponse = await signup(email, password);
      history.push('/chat');
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <>
      <button onClick={() => history.push("/")}>Back to home</button>
      <div>

        Signup
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
          <button onClick={registerUser}>Register</button>
        </div>
      </div>
    </>
  );
};

export default Signup;