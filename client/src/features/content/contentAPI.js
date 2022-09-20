import { request } from "../../utils/network";

export const _createDiscussion = async (token, title) => {
  const response = await request({
    method: "post",
    url: "/discussions",
    data: {
      title,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 201) return response.body;
  else {
    console.log("error");
    throw "error creating discussion";
  }
};

export const _listDiscussions = async (title) => {
  const response = await request({
    method: "get",
    url: "/discussions",
  });
  if (response.status === 200) return response.body;
  else throw "error fetching discussion";
};

export const _createComment = async (discussionId, text) => {
  const response = await request({
    method: "post",
    url: `/discussions/${discussionId}/comments`,
    data: {
      text,
    },
  });
  if (response.status === 201) return response.body;
  else throw "error creating comment";
};

export const _listComments = async (discussionId) => {
  const response = await request({
    method: "get",
    url: `/discussions/${discussionId}/comments`,
  });
  if (response.status === 200) return response.body;
  else throw "error fetching comments";
};

export const _searchDiscussions = async (text) => {
  const response = await request({
    method: "get",
    url: `/discussions?query=${text}`,
  });
  if (response.status === 200) return response.body;
  else throw "error searching discussions";
};
