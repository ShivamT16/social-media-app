import { useContext } from "react";
import { Modal } from "@material-ui/core";

import { PostContext } from "..";

export const Modals = () => {
  const {
    editPost,
    open,
    handleEditSubmit,
    handleEditPost,
    handleModalClose
  } = useContext(PostContext);
  return (
    <div>
      <Modal onClose={handleModalClose} open={open} className="modal">
        <div>
          <h3> Edit Post </h3>
          <form
            action="submit"
            className="modalPost"
            onSubmit={handleEditSubmit}
          >
            <div>
              <label htmlFor="NewPost"> </label>
              <input
                type="text"
                autoComplete="off"
                className="modalInput"
                value={editPost.postDescription}
                onChange={handleEditPost}
                name="NewPost"
                id="NewPost"
              />
            </div>
            <button type="submit" className="input-Btn">
              Post
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
