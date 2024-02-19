import { useContext, useState } from "react";

import { PostContext, BookmarkContext } from "..";
import { Modals } from "./Modal";
import "./home.css";

export const Home = () => {
  const {
    posts,
    newPost,
    handleSubmit,
    handleNewPost,
    handleDelete,
    handleLatest,
    handleTrend,
    handleLikes,
    likess,
    handleUnlike,
    handleUpdate,
    handleModalOpen,
    FavoriteBorderSharpIcon,
    FavoriteSharpIcon,
    BookmarkBorderSharpIcon,
    BookmarkSharpIcon,
    ForumSharpIcon
  } = useContext(PostContext);
  const { handleBookmark, deleteBookmark, bookmark } = useContext(
    BookmarkContext
  );

  return (
    <div className="middle">
      <h2 className="h2">Home</h2>
      <form action="submit" className="newPost" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="NewPost"> </label>
          <input
            type="text"
            autoComplete="off"
            className="postInput"
            value={newPost.postDescription}
            onChange={handleNewPost}
            name="NewPost"
            id="NewPost"
            placeholder="Create new Post..."
          />
        </div>
        <button type="submit" className="inputBtn">
          Post
        </button>
      </form>
      <button className="filterBtn" onClick={handleTrend}>
        Trending
      </button>
      <button className="filterBtn" onClick={handleLatest}>
        Latest
      </button>
      {posts.map((item) => {
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
                <p onClick={() => handleUnlike(item)}>
                  <FavoriteSharpIcon />{" "}
                  <span className="action1">{likes} </span>
                </p>
              ) : (
                <p onClick={() => handleLikes(item)}>
                  <FavoriteBorderSharpIcon />{" "}
                  <span className="action1">{likes}</span>
                </p>
              )}
              <p>
                <ForumSharpIcon />
                <span className="action1">
                  {" "}
                  {comments ? comments.length : 0}
                </span>
              </p>
              {bookmark.find((element) => element.postId === item.postId) ? (
                <p onClick={() => deleteBookmark(postId)}>
                  <BookmarkSharpIcon />
                </p>
              ) : (
                <p onClick={() => handleBookmark(item)}>
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
