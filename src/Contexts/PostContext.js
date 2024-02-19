import { createContext, useState } from "react";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import BookmarkBorderSharpIcon from "@mui/icons-material/BookmarkBorderSharp";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";

import { dataBase } from "./DB/postDB";
import { Peoples } from "./DB/peopleDB";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(dataBase);
  const [newPost, setNewPost] = useState({
    postDescription: ""
  });
  const [editPost, setEditPost] = useState({ postDescription: "" });
  const [open, setOpen] = useState(false);
  const [likess, setLikess] = useState([]);
  const [follow, setFollow] = useState(["shivam.tripathi"]);

  const handleFollow = (element) => {
    follow.includes(element)
      ? setFollow(follow.filter((item) => item !== element))
      : setFollow([...follow, element]);
  };

  const posts = [...post].filter(({ username }) => follow.includes(username));

  const handleTrend = () => {
    setPost([...post].sort((a, b) => b.likes - a.likes));
  };

  const handleLatest = () => {
    setPost(
      [...post].sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      )
    );
  };

  const handleDelete = (delTask) => {
    setPost(post.filter(({ postId }) => postId !== delTask));
  };

  const handleNewPost = (e) => {
    const findUser = Peoples.find(({ id }) => id === 1);

    setNewPost({
      ...newPost,
      postId: Date.now().toString(),
      username: findUser.userName,
      name: findUser.name,
      picUrl: findUser.userPic,
      likes: 0,
      postDescription: e.target.value,
      createdAt: new Date()
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...newPost };
    setPost([newEntry, ...post]);
    setNewPost({
      postDescription: ""
    });
  };

  const handleLikes = (element) => {
    const Post = post.find((item) => item.postId === element.postId);
    if (Post) {
      setPost(
        post.map((items) => {
          if (items.postId === element.postId) {
            return { ...items, likes: items.likes + 1 };
          } else {
            return { ...items };
          }
        })
      );
      setLikess([...likess, element]);
    }
  };

  const handleUnlike = (element) => {
    const Post = post.find((item) => item.postId === element.postId);
    if (Post) {
      setPost(
        post.map((items) => {
          if (items.postId === element.postId) {
            return { ...items, likes: items.likes - 1 };
          } else {
            return { ...items };
          }
        })
      );
      setLikess(likess.filter(({ postId }) => postId !== element.postId));
    }
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleUpdate = (element) => {
    const Post = post.find((item) => item.postId == element.postId);
    setEditPost({
      postId: Post.postId,
      postDescription: Post.postDescription
    });
  };

  const handleEditPost = (e) => {
    setEditPost({
      ...editPost,
      postDescription: e.target.value
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleModalClose();
    const postIndex = post.findIndex((item) => item.postId == editPost.postId);

    if (postIndex !== -1) {
      post[postIndex] = {
        ...post[postIndex],
        postDescription: editPost.postDescription
      };
    }
  };

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
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
        editPost,
        open,
        handleEditSubmit,
        handleEditPost,
        handleModalClose,
        follow,
        handleFollow,
        FavoriteBorderSharpIcon,
        FavoriteSharpIcon,
        BookmarkBorderSharpIcon,
        BookmarkSharpIcon,
        ForumSharpIcon
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
