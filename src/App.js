import "./styles.css";
import { Routes, Route, NavLink } from "react-router-dom";

import { Home } from "./Pages/Home";
import { Explore } from "./Pages/Explore";
import { Bookmark } from "./Pages/Bookmark";
import { People } from "./Pages/People";
import { PeopleProfile } from "./Pages/PeopleProfile";
import { Profile } from "./Pages/Profile";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { AuthContext } from "..";

import { RequiresAuth } from "./Components/RequiresAuth";
import { useContext } from "react";

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <div className="App">
      {isLoggedIn && (
        <nav className="nav">
          <NavLink className="NavLink" to="/">
            Home
          </NavLink>
          <NavLink className="NavLink" to="/explore">
            Explore
          </NavLink>
          <NavLink className="NavLink" to="/bookmark">
            Bookmark
          </NavLink>
          <NavLink className="NavLink" to="/profile">
            Profile
          </NavLink>
          <NavLink className="NavLink" onClick={() => setIsLoggedIn(false)}>
            Logout
          </NavLink>
        </nav>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <Home />
            </RequiresAuth>
          }
        />
        <Route
          path="/explore"
          element={
            <RequiresAuth>
              <Explore />
            </RequiresAuth>
          }
        />
        <Route
          path="/bookmark"
          element={
            <RequiresAuth>
              <Bookmark />
            </RequiresAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
        <Route
          path="/peopleProfile"
          element={
            <RequiresAuth>
              <PeopleProfile />
            </RequiresAuth>
          }
        />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {isLoggedIn && (
        <div className="route">
          <People />
        </div>
      )}
    </div>
  );
}
