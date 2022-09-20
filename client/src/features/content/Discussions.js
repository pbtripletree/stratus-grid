import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  listDiscussions,
  searchDiscussions,
  createDiscussion,
  selectDiscussions,
  setDiscussion,
} from "./contentSlice";
import { selectUsername, selectToken } from "../user/userSlice";
import styles from "./Content.module.css";

export function Discussions() {
  const dispatch = useDispatch();
  const discussions = useSelector(selectDiscussions);
  const username = useSelector(selectUsername);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const token = useSelector(selectToken);

  useEffect(() => {
    function fetchData() {
      dispatch(listDiscussions());
    }
    if (!discussions.length) fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h3>Discussions</h3>
      <input
        placeholder="comment text"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button
        onClick={() => {
          dispatch(searchDiscussions(search));
          setSearch("");
        }}
      >
        search
      </button>
      <br />
      {!username ? (
        <Link to="/login">
          <button>Login to post</button>
        </Link>
      ) : (
        [
          <input
            placeholder="discussion title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>,
          <button
            onClick={() => {
              dispatch(createDiscussion({ token, title }));
              setTitle("");
            }}
          >
            Post
          </button>,
        ]
      )}
      <div>
        {discussions.map((discussion) => (
          <div className={styles.content}>
            <p className={styles.title}>
              <b>{discussion.title}</b>
              <br />
              posted by {discussion.user.username}
            </p>
            <Link to={"/discussions/" + discussion.id}>
              <button onClick={() => dispatch(setDiscussion(discussion))}>
                View
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
