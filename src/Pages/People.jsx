import { useContext } from "react";
import { Link } from "react-router-dom";
import "./people.css";

import { PostContext, UserContext } from "..";

export const People = () => {
  const { user, handlePerson } = useContext(UserContext);
  const { follow, handleFollow } = useContext(PostContext);
  return (
    <div>
      <h3>People You may Know</h3>
      <div className="people">
        {user
          .filter(({ id }) => id !== 1)
          .map(({ id, name, userName, userPic }) => (
            <div
              key={id}
              className="people1"
              onClick={() => handlePerson(userName)}
            >
              <Link
                className="peopleLink"
                to="/peopleProfile"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <img className="peoplePic" src={userPic} alt="" />
                <div className="peopleName">
                  <strong> {name} </strong>
                  <p className="PeopleName"> @{userName} </p>
                </div>
              </Link>
              <button
                className="follow-Btn"
                onClick={() => handleFollow(userName)}
              >
                {follow.find((element) => element === userName)
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
