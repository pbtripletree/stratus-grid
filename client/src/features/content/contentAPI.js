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
    throw "error creating discussion";
  }
};

export const _fetchDiscussion = async (id) => {
  const response = await request({
    method: "get",
    url: `/discussions/${id}`,
  });
  if (response.status === 200) return response.body;
  else throw "error fetching discussion";
};

export const _listDiscussions = async (title) => {
  const response = await request({
    method: "get",
    url: "/discussions",
  });
  if (response.status === 200) return response.body;
  else throw "error fetching discussions";
};

export const _createComment = async (token, id, text) => {
  const response = await request({
    method: "post",
    url: `/discussions/${id}/comments`,
    data: {
      text,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 201) return response.body;
  else throw "error creating comment";
};

export const _listComments = async (id) => {
  const response = await request({
    method: "get",
    url: `/discussions/${id}/comments`,
  });
  if (response.status === 200) return response.body;
  else throw "error fetching comments";
};

export const _searchDiscussions = async (text) => {
  const response = await request({
    method: "get",
    url: `/search/discussions/?query=${text}`,
  });
  console.log(response);
  if (response.status === 200) return response.body;
  else throw "error searching discussions";
};
