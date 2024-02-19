import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";

import { sidePic } from "./DB/postDB";
import { dummyData } from "./DB/peopleDB";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [userRecord, setUserRecord] = useState(dummyData);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });
  const [allEntry, setAllEntry] = useState([]);
  const navigate = useNavigate();

  const handleSigninInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    if (
      userRegistration.name !== "" &&
      userRegistration.userName !== "" &&
      userRegistration.email !== "" &&
      userRegistration.password !== "" &&
      userRegistration.confirmPassword !== ""
    ) {
      if (userRegistration.password === userRegistration.confirmPassword) {
        const newRegistration = {
          ...userRegistration,
          id: new Date().getTime().toString()
        };
        setUserRecord([...userRecord, newRegistration]);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        emptyForm();
      } else {
        console.log("error");
      }
    } else {
      console.log("Please fill all the fields");
    }
  };

  const handleLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const newEntry = { ...userLogin };
    setAllEntry([...allEntry, newEntry]);

    if (newEntry.email !== "" && newEntry.password !== "") {
      if (
        userRecord.find(
          ({ email, password }) =>
            email === newEntry.email && password === newEntry.password
        )
      ) {
        console.log("success");
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        emptyForm();
      } else {
        console.log("Invalid Email and Password");
      }
    } else {
      console.log("Please fill all the fields");
    }
  };

  const handleGuestUser = () => {
    setUserLogin({
      email: "shivam@tripathi",
      password: "123QE"
    });
    setIsLoggedIn(true);
    navigate("/", { replace: true });
    emptyForm();
  };

  const emptyForm = () => {
    setUserRegistration({
      name: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setUserLogin({
      email: "",
      password: ""
    });
  };

  const SidePic = sidePic;

  return (
    <AuthContext.Provider
      value={{
        userRegistration,
        handleSigninInput,
        handleSigninSubmit,
        userLogin,
        handleLoginInput,
        handleLoginSubmit,
        isLoggedIn,
        setIsLoggedIn,
        handleGuestUser,
        SidePic
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
