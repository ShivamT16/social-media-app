import { useContext } from "react";
import "./peopleProfile.css";

import { PostContext, BookmarkContext, UserContext } from "..";

export const PeopleProfile = () => {
  const {
    post,
    handleLikes,
    likess,
    handleUnlike,
    follow,
    handleFollow,
    FavoriteBorderSharpIcon,
    FavoriteSharpIcon,
    BookmarkBorderSharpIcon,
    BookmarkSharpIcon,
    ForumSharpIcon
  } = useContext(PostContext);
  const { handleBookmark, deleteBookmark, bookmark } = useContext(
    BookmarkContext
  );
  const { user, person } = useContext(UserContext);
  return (
    <div className="middle">
      <div className="Profile">
        {user
          .filter(({ id, userName }) => userName === person)
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
                    Following:{following} | Posts: {posts} | Followers:
                    {followers}
                  </h4>
                </div>
                <div>
                  <button
                    className="followBtn"
                    onClick={() => handleFollow(userName)}
                  >
                    {follow.find((element) => element === userName)
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>
              </div>
            )
          )}
      </div>
      {post
        .filter(({ id, username }) => username === person)
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

              <p className="profilePost"> {postDescription} </p>
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
    </div>
  );
};
