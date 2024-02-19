import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

export const Login = () => {
  const {
    userLogin,
    handleLoginInput,
    handleLoginSubmit,
    handleGuestUser,
    SidePic
  } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signIn">
      <div>
        <img className="sidePic" src={SidePic} />
      </div>
      <div className="signUp">
        <h1>Login </h1>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="email"></label>
          <input
            type="email"
            className="signupInput"
            autoComplete="off"
            id="email"
            name="email"
            value={userLogin.email}
            onChange={handleLoginInput}
            placeholder="Email"
          />
          <label htmlFor="password"></label>
          <input
            type={showPassword ? "text" : "password"}
            className="signupInput"
            autoComplete="off"
            id="password"
            name="password"
            value={userLogin.password}
            onChange={handleLoginInput}
            placeholder="Password"
          />
          <button
            type="button"
            className="showBtn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <button type="submit" className="signupBtn">
            Login
          </button>
        </form>
        <button type="button" className="signup-Btn" onClick={handleGuestUser}>
          Login as a Guest User
        </button>
        <p className="P">
          Don't have an account?
          <Link className="link" to="/signup">
            SignUp here
          </Link>
        </p>
      </div>
    </div>
  );
};
