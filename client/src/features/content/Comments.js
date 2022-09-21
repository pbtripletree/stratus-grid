import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  fetchDiscussion,
  listComments,
  createComment,
  selectComments,
  selectDiscussion,
} from "./contentSlice";
import { selectUsername, selectToken } from "../user/userSlice";
import styles from "./Content.module.css";

export function Comments() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const discussion = useSelector(selectDiscussion);
  let comments = useSelector(selectComments);
  const username = useSelector(selectUsername);
  const token = useSelector(selectToken);
  const [text, setText] = useState("");

  useEffect(() => {
    function fetchData() {
      dispatch(listComments(id));
    }
    fetchData();
  }, []);

  useEffect(() => {
    function fetchData() {
      dispatch(fetchDiscussion(id));
    }
    if (!discussion) fetchData();
  }, []);

  return (
    <div>
      <Link to="/discussions">
        <button>Back to discussions</button>
      </Link>
      <h3>{discussion?.title}</h3>
      {!username ? (
        <Link to="/login">
          <button>Login to post</button>
        </Link>
      ) : (
        [
          <input
            placeholder="comment text"
            maxlength="200"
            onChange={(e) => setText(e.target.value)}
          ></input>,
          <button
            onClick={() => {
              dispatch(createComment({ token, id, text }));
              setText("");
            }}
          >
            Post
          </button>,
        ]
      )}
      {comments.map((comment) => (
        <div className={styles.content}>
          <p className={styles.title}>
            <b>{comment.user.username}:</b> {comment.text}
          </p>
        </div>
      ))}
      {!comments.length && <p>be the first comment!</p>}
    </div>
  );
}
