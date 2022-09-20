import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  _createDiscussion,
  _listDiscussions,
  _createComment,
  _listComments,
  _searchDiscussions,
} from "./contentAPI";

const initialState = {
  status: "idle",
  discussions: [],
  comments: [],
};

export const listDiscussions = createAsyncThunk(
  "content/listDiscussions",
  async () => {
    return _listDiscussions();
  }
);

export const createDiscussion = createAsyncThunk(
  "content/createDiscussion",
  async ({ token, title }) => {
    return _createDiscussion(token, title);
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(listDiscussions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(listDiscussions.fulfilled, (state, action) => {
        state.discussions = action.payload;
        state.status = "idle";
      })
      .addCase(createDiscussion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createDiscussion.fulfilled, (state, action) => {
        state.discussions.push(action.payload);
        state.status = "loading";
      });
  },
});

export const selectDiscussions = (state) => {
  return state.content.discussions;
};

export const selectStatus = (state) => {
  return state.content.status;
};

export default contentSlice.reducer;
