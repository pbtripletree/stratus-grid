import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import {
  _createDiscussion,
  _fetchDiscussion,
  _listDiscussions,
  _createComment,
  _listComments,
  _searchDiscussions,
} from "./contentAPI";

const initialState = {
  status: "idle",
  discussions: [],
  comments: [],
  selectedDiscussion: null,
};

export const createDiscussion = createAsyncThunk(
  "content/createDiscussion",
  async ({ token, title }) => {
    return _createDiscussion(token, title);
  }
);

export const fetchDiscussion = createAsyncThunk(
  "content/fetchDiscussion",
  async (id) => {
    return _fetchDiscussion(id);
  }
);

export const listDiscussions = createAsyncThunk(
  "content/listDiscussions",
  async () => {
    return _listDiscussions();
  }
);

export const listComments = createAsyncThunk(
  "content/listComments",
  async (id) => {
    return _listComments(id);
  }
);

export const createComment = createAsyncThunk(
  "content/createComment",
  async ({ token, id, text }) => {
    return _createComment(token, id, text);
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setDiscussion: (state, action) => {
      console.log(action);
      state.selectedDiscussion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDiscussion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createDiscussion.fulfilled, (state, action) => {
        state.discussions.unshift(action.payload);
        state.status = "idle";
      })
      .addCase(fetchDiscussion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDiscussion.fulfilled, (state, action) => {
        state.selectedDiscussion = action.payload;
        state.status = "idle";
      })
      .addCase(listDiscussions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(listDiscussions.fulfilled, (state, action) => {
        state.discussions = action.payload;
        state.status = "idle";
      })
      .addCase(listComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(listComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = "idle";
      })
      .addCase(createComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status = "idle";
      });
  },
});

export const { setDiscussion } = contentSlice.actions;

export const selectDiscussion = (state) => {
  return state.content.selectedDiscussion;
};

export const selectDiscussions = (state) => {
  return state.content.discussions;
};

export const selectComments = (state) => {
  return state.content.comments;
};

export const selectStatus = (state) => {
  return state.content.status;
};

export default contentSlice.reducer;
