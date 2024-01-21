import axios from "axios";
export const getAllPosts = async () => {
  try {
    const { data, headers } = await axios.get(
      `http://localhost:5000/api/posts`
    );

    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getUserPost = async ({ searchKeyword = "", token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/posts/users?searchKeyword=${searchKeyword}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getPost = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    console.log("Fetching post:", `http://localhost:5000/api/posts/${slug}`);
    const { data } = await axios.get(
      `http://localhost:5000/api/posts/${slug}`,
      config
    );
    console.log("Post data:", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deletePost = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("Fetching post:", `http://localhost:5000/api/posts/${slug}`);
    const { data } = await axios.delete(`/api/posts/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createPost = async ({ token, formData }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    console.log("Fetching post:", `http://localhost:5000/api/posts`);
    const { data } = await axios.post(
      `http://localhost:5000/api/posts`,
      formData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
    throw new Error(error);
  }
};
