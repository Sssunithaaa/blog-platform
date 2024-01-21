import { uploadPicture } from "../middleware/pictureMiddleware.js";
import User from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, name, password, admin } = req.body;
    console.log(req.body);
    let user = await User.findOne({ email });
    if (user) {
      //return res.status(400).json({Message:"User already exists"})
      throw new Error("User has already registered");
    }
    user = await User.create({
      name,
      email,
      password,
      admin,
    });
    return res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      password: user.password,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await user.verifyPassword(password);
      if (isPasswordValid) {
        return res.status(201).json({
          _id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          verified: user.verified,
          admin: user.admin,
          token: await user.generateJWT(),
        });
      } else {
        throw new Error("Invalid password");
      }
    } else {
      // User not found

      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    let err = new Error(error.message);
    next(err);
  }
};

export const userProfileController = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let err = new Error("User not found");
      err.statusCode = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("User not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be atleast 6 characters");
    } else if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUserProfile = await user.save();
    res.json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: await updatedUserProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(err.message);
        next(error);
      } else {
        if (req.file) {
          const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
              avatar: req.file.filename,
            },
            {
              new: true,
            }
          );
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
