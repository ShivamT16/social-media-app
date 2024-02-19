import { useContext } from "react";

import { PostContext, BookmarkContext } from "..";
import { Modals } from "./Modal";

export const Bookmark = () => {
  const {
    likess,
    handleLikes,
    handleUnlike,
    handleModalOpen,
    handleUpdate,
    FavoriteBorderSharpIcon,
    FavoriteSharpIcon,
    BookmarkBorderSharpIcon,
    BookmarkSharpIcon,
    ForumSharpIcon
  } = useContext(PostContext);
  const { bookmark, deleteBookmark } = useContext(BookmarkContext);

  return (
    <div className="middle">
      <h2 className="h2"> Bookmark</h2>
      <h2>{bookmark.length > 0 ? "" : "No Bookmark Post Here"}</h2>
      {bookmark.map((item) => {
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
      <Modals />
    </div>
  );
};
