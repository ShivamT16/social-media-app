import { createContext, useState } from "react";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmark, setBookmark] = useState([]);

  const handleBookmark = (element) => {
    const findPost = bookmark.find((item) => item.postId === element.postId);
    if (findPost) {
      setBookmark(
        bookmark.map((item) => {
          if (item.postId === element.postId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return { ...item };
          }
        })
      );
    } else {
      setBookmark([...bookmark, { ...element, quantity: 1 }]);
    }
  };
  const deleteBookmark = (element) => {
    const Delete = bookmark.filter(({ postId }) => postId !== element);
    setBookmark(Delete);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmark, handleBookmark, deleteBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
