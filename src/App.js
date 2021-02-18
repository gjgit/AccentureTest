import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchImages,
  imagesSelector,
  setIncrement,
  sortByLikes,
  sortByComments,
  setComment,
  deleteComment,
} from "./features/getImages/getImages";

import styles from "./features/getImages/getImages.module.css";

import Popup from "./popup";

const App = () => {
  // initialize the redux hook
  const dispatch = useDispatch();
  const { images, loading, hasErrors } = useSelector(imagesSelector);
  const [value, setValue] = useState("");
  const [postComment, setPostComment] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const [todos, setTodos] = useState([{}]);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteitem, setDeleteitem] = useState([{}]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // dispatch our thunk when component first mounts
  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setComment(todos));
  }, [todos]);

  useEffect(() => {
    dispatch(deleteComment(deleteitem));
  }, [deleteitem]);

  // error handling & map successful query data
  const renderImages = () => {
    if (loading) return <p>Loading images...</p>;
    if (hasErrors) return <p>Cannot display images...</p>;

    return images
      .filter((image) => {
        if (image.category.toLowerCase().includes(value)) {
          return true;
        }
      })
      .map((image) => (
        <li key={image.id} className={styles.listitem}>
          <div className={styles.listcontent}>
            <img
              src={image.url}
              alt=""
              onClick={() => {
                togglePopup();
                setImgUrl(image.url);
              }}
            />
            <div className={styles.likesCat}>
              <span className={styles.likes}>{image.likes}</span>
              <button
                data-testid="count"
                onClick={() => dispatch(setIncrement(image.id))}
                className={styles.Cat}
              >
                {image.isliked ? "Unlike" : "Like"}
              </button>
              <span className={styles.floatleft}>{image.category}</span>
            </div>
            <div className={styles.postComment}>
              <input
                onChange={(e) => setPostComment(e.target.value)}
                style={{ width: "85%" }}
                placeholder="Type your comment here..."
                type="text"
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTodos({ imageID: image.id, comments: postComment });
                  Array.from(document.querySelectorAll("input")).forEach(
                    (input) => (input.value = "")
                  );
                }}
              >
                POST
              </button>
            </div>
            <ul className={styles.comment}>
              {image.comments.map((comment) => (
                <li key={comment}>
                  {comment}
                  <button
                    className={styles.DeleteButton}
                    onClick={() =>
                      setDeleteitem({ imageID: image.id, comments: comment })
                    }
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ));
  };

  return (
    <>
      <nav className={styles.heading}>Imaginary</nav>
      <header className={styles.border}>
        <div className={styles.sorting}>
          <button
            className={styles.buttonLikes}
            onClick={() => dispatch(sortByLikes())}
          >
            Most Liked
          </button>
          <button
            className={styles.buttonCommented}
            onClick={() => dispatch(sortByComments())}
          >
            Most Commented
          </button>
          <input
            onChange={(e) => setValue(e.target.value)}
            className={styles.Inputfliter}
            placeholder="Search Images..."
            type="text"
          />
        </div>
      </header>
      <main className={styles.border}>
        <ul className={styles.list}>
          {renderImages()}
          {renderImages().length === 0 && (
            <h2 className={styles.textCenter}>Sorry No items found</h2>
          )}
        </ul>
        {isOpen && (
          <Popup
            content={
              <>
                <img src={imgurl} alt="" />
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </main>
    </>
  );
};

export default App;
