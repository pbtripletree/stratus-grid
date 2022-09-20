import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  listDiscussions,
  createDiscussion,
  selectStatus,
  selectDiscussions,
} from "./contentSlice";

import { selectUsername, selectToken } from "../user/userSlice";

export function Discussions() {
  const dispatch = useDispatch();
  const discussions = useSelector(selectDiscussions);
  const status = useSelector(selectStatus);
  const username = useSelector(selectUsername);
  const [title, setTitle] = useState("");
  const token = useSelector(selectToken);

  useEffect(() => {
    function fetchData() {
      dispatch(listDiscussions());
    }
    fetchData();
  }, []);

  return (
    <div>
      <span>Discussions</span>
      <div>
        {discussions.map((discussion) => [
          <h3>{discussion.title}</h3>,
          <p>by {discussion.user.username}</p>,
        ])}
      </div>
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
          <button onClick={() => dispatch(createDiscussion({ token, title }))}>
            Post
          </button>,
        ]
      )}
    </div>
  );
}
