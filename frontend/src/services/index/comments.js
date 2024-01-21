import axios from "axios";

export const createComment = async ({
  token,
  description,
  slug,
  parent,
  replyOnUser,
  check,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/comments/create",
      { description, slug, parent, replyOnUser, check },
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const deleteComment = async ({ token, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    //console.log(id)
    const { data } = await axios.delete(
      `http://localhost:5000/api/comments/delete/${commentId}`,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.message);
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateComment = async ({ token, description, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/comments/update/${commentId}`,
      { description },
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.message);
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
