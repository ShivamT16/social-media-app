import { useContext } from "react";
import { Modal } from "@material-ui/core";
import "./profile.css";

import { PostContext, BookmarkContext, UserContext } from "..";
import { Modals } from "./Modal";

export const Profile = () => {
  const {
    post,
    handleDelete,
    handleLikes,
    handleUpdate,
    handleModalOpen,
    likess,
    handleUnlike,
    FavoriteBorderSharpIcon,
    FavoriteSharpIcon,
    BookmarkBorderSharpIcon,
    BookmarkSharpIcon,
    ForumSharpIcon
  } = useContext(PostContext);
  const { handleBookmark, deleteBookmark, bookmark } = useContext(
    BookmarkContext
  );
  const {
    user,
    profile,
    dp,
    setDp,
    setProfilePic,
    open,
    handleProfileModalOpen,
    handleProfileUpdate,
    handleUpdateChange,
    handleSubmitProfile,
    handleModalClose
  } = useContext(UserContext);

  return (
    <div className="middle">
      {user
        .filter(({ id }) => id === 1)
        .map(
          ({
            id,
            name,
            userName,
            userPic,
            bio,
            link,
            following,
            posts,
            followers
          }) => (
            <div className="profile" key={id}>
              <>
                <img
                  className="profilePic"
                  src={userPic}
                  alt="ProfilePicture"
                />
              </>
              <div>
                <h2> {name} </h2>
                <> @{userName} </>
                <p className="bio"> {bio} </p>
                <a href={link} target="blank">
                  {link}
                </a>
                <h4>
                  Following:{following} | Posts: {posts} | Followers:{" "}
                  {followers}
                </h4>
              </div>
              <div>
                <button
                  className="editProfileBtn"
                  onClick={() => {
                    setDp(user);
                    handleProfileModalOpen();
                    handleProfileUpdate();
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )
        )}
      {post
        .filter(({ id, username }) => username === "shivam.tripathi")
        .map((item) => {
          const {
            postId,
            username,
            name,
            picUrl,
            likes,
            pic,
            postDescription,
            comments
          } = item;
          return (
            <div className="homePost" key={postId}>
              <img className="userImage" alt="user-img" src={picUrl} />
              <p className="userName">
                <strong>{name}</strong> @{username}
              </p>
              {item.username === "shivam.tripathi" ? (
                <div>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(postId)}
                  >
                    DELETE
                  </button>
                  <button
                    className="updateBtn"
                    onClick={() => {
                      handleUpdate(item);
                      handleModalOpen();
                    }}
                  >
                    UPDATE
                  </button>{" "}
                </div>
              ) : (
                <div>
                  <button className="deleteBtn1"></button>
                </div>
              )}
              <p className="postt"> {postDescription} </p>
              {pic ? <img className="postImage" src={pic} alt="" /> : ""}
              <div className="action">
                {likess.find((element) => element.postId === item.postId) ? (
                  <p className="action1" onClick={() => handleUnlike(item)}>
                    <FavoriteSharpIcon /> {likes}
                  </p>
                ) : (
                  <p className="action1" onClick={() => handleLikes(item)}>
                    <FavoriteBorderSharpIcon /> {likes}
                  </p>
                )}
                <p className="action1">
                  <ForumSharpIcon /> {comments ? comments.length : 0}
                </p>
                {bookmark.find((element) => element.postId === item.postId) ? (
                  <p className="action1" onClick={() => deleteBookmark(postId)}>
                    <BookmarkSharpIcon />
                  </p>
                ) : (
                  <p className="action1" onClick={() => handleBookmark(item)}>
                    <BookmarkBorderSharpIcon />
                  </p>
                )}
              </div>
            </div>
          );
        })}
      <Modal onClose={handleModalClose} open={open} className="modal">
        <div>
          <h3>Select Avatar</h3>
          <div className="avatars">
            {dp.map(({ id, userPic }) => (
              <div key={id}>
                <img
                  className="avatarImg"
                  onClick={() => setProfilePic(userPic)}
                  src={userPic}
                  alt=""
                />
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmitProfile}>
            <div>
              <h3>Bio </h3>
              <label htmlFor="bio"></label>
              <input
                type="text"
                className="Input"
                autoComplete="off"
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleUpdateChange}
              />
              <h3>Portfolio URL </h3>
              <label htmlFor="link"></label>
              <input
                type="text"
                className="Input"
                autoComplete="off"
                id="link"
                name="link"
                value={profile.link}
                onChange={handleUpdateChange}
              />
              <button className="saveBtn" type="submit">
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modals />
    </div>
  );
};
