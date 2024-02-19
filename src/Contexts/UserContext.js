import { createContext, useContext, useState } from "react";
import { Peoples } from "./DB/peopleDB";

import { PostContext } from "..";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { post, setPost } = useContext(PostContext);

  const [user, setUser] = useState(Peoples);
  const [profile, setProfile] = useState({
    bio: "",
    link: ""
  });
  const [dp, setDp] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState();

  const handlePerson = (element) => {
    setPerson(element);
  };
  const handleProfileModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleProfileUpdate = () => {
    const userFind = user.find(({ id }) => id === 1);
    setProfile({
      bio: userFind.bio,
      link: userFind.link
    });
  };

  const handleUpdateChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    handleModalClose();

    const userFind = user.find(({ id }) => id === 1);

    if (userFind) {
      if (userFind && profilePic) {
        user[0] = {
          ...user[0],
          bio: profile.bio,
          link: profile.link,
          userPic: profilePic
        };
        setPost(
          post.map((items) => {
            if (items.username === "shivam.tripathi") {
              return { ...items, picUrl: profilePic };
            } else {
              return { ...items };
            }
          })
        );
      } else {
        user[0] = {
          ...user[0],
          bio: profile.bio,
          link: profile.link
        };
      }
    } else {
      setUser([...user]);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        dp,
        setDp,
        profilePic,
        setProfilePic,
        open,
        setOpen,
        handleProfileModalOpen,
        handleProfileUpdate,
        handleUpdateChange,
        handleSubmitProfile,
        handleModalClose,
        person,
        handlePerson
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
