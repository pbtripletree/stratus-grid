import contentReducer, {
  createDiscussion,
  fetchDiscussion,
  listDiscussions,
  createComment,
  listComments,
  searchDiscussions,
  setDiscussion,
} from "./contentSlice";

describe("content reducer", () => {
  it("sets selected discussion", () => {
    const discussion = { title: "test discussion", user_id: 1 };
    const state = contentReducer(
      { selectedDiscussion: null },
      setDiscussion(discussion)
    );
    expect(state).toEqual({
      selectedDiscussion: discussion,
    });
  });

  it("adds new discussion to first index", () => {
    const discussion = { title: "test discussion", user_id: 1 };
    const action = {
      type: createDiscussion.fulfilled.type,
      payload: discussion,
    };
    const state = contentReducer(
      { discussions: [{ title: "first discussion", user_id: 1 }] },
      action
    );
    expect(state).toEqual({
      discussions: [discussion, { title: "first discussion", user_id: 1 }],
      status: "idle",
    });
  });

  it("sets selectedDiscussion when fetched", () => {
    const discussion = { title: "test discussion", user_id: 1 };
    const action = {
      type: fetchDiscussion.fulfilled.type,
      payload: discussion,
    };
    const state = contentReducer({ selectedDiscussion: null }, action);
    expect(state).toEqual({
      selectedDiscussion: { title: "test discussion", user_id: 1 },
      status: "idle",
    });
  });

  it("sets discussions to list response", () => {
    const discussions = [
      { title: "test discussion 1", user_id: 1 },
      { title: "test discussion 2", user_id: 1 },
    ];
    const action = {
      type: listDiscussions.fulfilled.type,
      payload: discussions,
    };
    const state = contentReducer({ discussions: [] }, action);
    expect(state).toEqual({
      discussions,
      status: "idle",
    });
  });

  it("sets discussions to searched response", () => {
    const discussions = [
      { title: "test discussion 1", user_id: 1 },
      { title: "test discussion 2", user_id: 1 },
    ];
    const action = {
      type: searchDiscussions.fulfilled.type,
      payload: [{ title: "test discussion 1", user_id: 1 }],
    };
    const state = contentReducer({ discussions: discussions }, action);
    expect(state).toEqual({
      discussions: [{ title: "test discussion 1", user_id: 1 }],
      status: "idle",
    });
  });

  it("adds new comment to state", () => {
    const comment = { title: "test comment", user_id: 1, discussion_id: 1 };
    const action = {
      type: createComment.fulfilled.type,
      payload: comment,
    };
    const state = contentReducer(
      { comments: [{ title: "first comment", user_id: 1, discussion_id: 1 }] },
      action
    );
    expect(state).toEqual({
      comments: [
        { title: "first comment", user_id: 1, discussion_id: 1 },
        comment,
      ],
      status: "idle",
    });
  });

  it("sets comments to list response", () => {
    const comments = [
      { text: "test discussion 1", user_id: 1, discussion_id: 1 },
      { text: "test discussion 2", user_id: 1, discussion_id: 1 },
    ];
    const action = {
      type: listComments.fulfilled.type,
      payload: comments,
    };
    const state = contentReducer({ comments: [] }, action);
    expect(state).toEqual({
      comments,
      status: "idle",
    });
  });
});
