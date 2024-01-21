import { uploadPicture } from "../middleware/pictureMiddleware.js";
import Post from "../models/Posts.js";
import { fileRemover } from "../utils/fileRemover.js";
import { v4 as uuidv4 } from "uuid";
import Comments from "../models/Comments.js";
const createPost = async (req, res, next) => {
  try {
    const { title, description, link, board, topics, categories } = req.body;
    const post = new Post({
      title: "sample title",
      description: "sample description",
      link: "sample link",
      board: "sample board",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });
    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post aws not found");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, topics, categories } =
        JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.topics = topics || post.topics;

      post.categories = categories || post.categories;
      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        // every thing went well
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          if (req.body?.document) {
            handleUpdatePostData(req.body.document);
          } else {
            // Respond with an appropriate message when document is not true
            res
              .status(400)
              .json({ error: "Invalid request, document not provided" });
          }
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          if (req.body?.document) {
            handleUpdatePostData(req.body.document);
          } else {
            // Respond with an appropriate message when document is not true
            res
              .status(400)
              .json({ error: "Invalid request, document not provided" });
          }
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      let err = new Error("Post was not found");
      return next(err);
    }
    const comments = await Comments.deleteMany({ post: post._id });
    return res.json({
      message: "Post is successfully deleted",
    });
  } catch (error) {}
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);
    if (!post) {
      let err = new Error("Post was not found");
      return next(err);
    }
    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    {
      /*const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    } */
    }

    {
      /*const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = await Post.countDocuments().maxTimeMS(30000); // 30 seconds timeout
    const pages = Math.ceil(total / pageSize);
    res.setHeader("x-totalCount", JSON.stringify(total));
    res.setHeader("x-currentPage", JSON.stringify(page));
    res.setHeader("x-pageSize", JSON.stringify(pageSize));
    res.setHeader("x-totalpagecount", JSON.stringify(pages)); */
    }

    {
      /*.skip(skip)
      .limit(pageSize) */
    }
    const result = await Post.find()
      .maxTimeMS(20000)
      .populate({
        path: "user",
        select: ["avatar", "name"],
      });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const createPosts = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("postPicture");
    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(err.message);
        next(error);
      } else {
        const { title, description, link, board, topics } = req.body;

        // Check if a file is included in the request
        if (!req.file) {
          return res
            .status(400)
            .json({ message: "Please upload an image file" });
        }

        const post = new Post({
          title,
          description,
          link,
          board,
          topics: topics.split(","), // Convert topics to an array
          slug: uuidv4(),
          body: {
            type: "doc",
            content: [],
          },
          photo: req.file.filename, // Store the filename in the photo field
          user: req.user._id,
        });

        const createdPost = await post.save();
        res.json(createdPost);
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUserPosts = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = { user: req.user._id }; // Assuming user ID is present in req.user
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    const result = await Post.find(where)
      .populate({
        path: "user",
        select: ["avatar", "name"],
      })
      .sort({ updatedAt: -1 });

    if (filter !== undefined) {
      res.setHeader("x-filter", filter);
    }
    console.log(result);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export {
  createPosts,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  getUserPosts,
};
