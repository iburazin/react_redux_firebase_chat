import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../actions";

import Card from "../../components/Card/Card";
import Layout from "../../components/Layout";

import "./style.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const registerUser = e => {
    e.preventDefault();

    const user = {
      username,
      email,
      password
    };
    dispatch(signup(user));
    setUsername("");
    setEmail("");
    setPassword("");
  };

  if (auth.authenticated) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <div className="registerContainer">
        <Card>
          <form onSubmit={registerUser}>
            <h3>Sign up</h3>
            <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <div>
              <button>Sign up</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
