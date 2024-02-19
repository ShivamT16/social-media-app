import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

import { AuthContext } from "..";

export const Signup = () => {
  const {
    userRegistration,
    handleSigninInput,
    handleSigninSubmit,
    SidePic
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signIn">
      <div>
        <img className="sidePic" src={SidePic} />
      </div>
      <div className="signUp">
        <h1> SignUp </h1>
        <form action="submit" onSubmit={handleSigninSubmit}>
          <label htmlFor="name"></label>
          <input
            type="text"
            className="signupInput"
            autoComplete="off"
            id="name"
            name="name"
            value={userRegistration.name}
            onChange={handleSigninInput}
            placeholder="Name"
          />
          <label htmlFor="userName"></label>
          <input
            type="text"
            className="signupInput"
            autoComplete="off"
            id="userName"
            name="userName"
            value={userRegistration.userName}
            onChange={handleSigninInput}
            placeholder="Username"
          />
          <label htmlFor="email"></label>
          <input
            type="email"
            className="signupInput"
            autoComplete="off"
            id="email"
            name="email"
            value={userRegistration.email}
            onChange={handleSigninInput}
            placeholder="Email"
          />
          <label htmlFor="password"></label>
          <input
            type={showPassword ? "text" : "password"}
            className="signupInput"
            autoComplete="off"
            id="password"
            name="password"
            value={userRegistration.password}
            onChange={handleSigninInput}
            placeholder="Password"
          />
          <label htmlFor="confirmPassword"></label>
          <input
            type={showPassword ? "text" : "password"}
            className="signupInput"
            autoComplete="off"
            id="confirmPassword"
            name="confirmPassword"
            value={userRegistration.confirmPassword}
            onChange={handleSigninInput}
            placeholder="Confirm Password"
          />{" "}
          <button
            type="button"
            className="showBtn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <button type="submit" className="signupBtn">
            SignUp
          </button>
        </form>
        <p className="P">
          Already have an account?
          <Link className="link" to="/login">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};
