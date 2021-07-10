import React from "react";
import { useHistory } from "react-router-dom";

const Home = ({ component: Component, authenticated, ...rest }) => {
  const history = useHistory()
  return (
    <div>
      <div>
        <button onClick={() => history.push('/login')}>Login</button>
        <button onClick={() => history.push('/signup')}>Signup</button>
      </div>

    </div>
  );
};

export default Home;