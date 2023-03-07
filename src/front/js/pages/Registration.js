import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [is_org, setIs_org] = useState('');
  const { store, actions } = useContext(Context);
  console.log(is_org);

  function handleClick(e) {
    e.preventDefault();
    actions.createUser(is_org, name, email, password);
  }

  return (
    <div>
      <form>
        <h1>User Registration</h1>
        <h3>Are you and Organization</h3>
        <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="orgRadio"
              id="orgRadio1"
              value={is_org}
              onChange={() => setIs_org('true')}
            />
            <label className="form-check-label" for="exampleRadios1">
              Yes
            </label>
        </div>
        <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="orgRadio"
              id="orgRadio2"
              value={is_org}
              onChange={() => setIs_org('false')}
            />
            <label className="form-check-label" for="exampleRadios1">
              No
            </label>
        </div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Link to="/login">
            <span>Go Back to Login</span>
          </Link>
          <button onClick={(e) => handleClick(e)}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default registration;
