const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");

//@desc   ADD BLOG
//@route  POST /api/blog
//@access protect
exports.addBlog = async (req, res) => {
  try {
    console.log(req.body);
    const response = await Blog.create({ ...req.body, user: req.user._id });
    res.status(200).json({
      success: true,
      message: `successfully added blogs ${response.bookingSlotsName}`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

//@desc GET ALL BLOGS
//@route GET /api/v1/blog
//@access protect
exports.getBlog = async (req, res) => {
  try {
    console.log(req.user);
    const blogs = await Blog.find({ email: req.query.email });
    res.status(200).json({
      success: true,
      message: `updated specific blogs`,
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.toString(),
    });
  }
};

// @desc      UPDATE BLOG
// @route     PUT /api/v1/blog
// @access    protect
// exports.updateBlog = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const response = await Blog.findByIdAndUpdate(id, req.body);
//     res.status(200).json({
//       success: true,
//       message: `updated specific blogs`,
//       response,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(204).json({
//       success: false,
//       message: err,
//     });
//   }
// };

// @desc      DELETE BLOG
// @route     DELETE /api/v1/blog
// @access    protect
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await Blog.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `deleted specific blog`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

//@desc   EDIT BLOG
//@route  PUT /api/blog
//@access protect

exports.editBlog = async (req, res) => {
  try {
    console.log(req.body);
    const { _id, ...blogData } = req.body; // Assuming the blog data is in req.body and you want to exclude the _id field from the update

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id, user: req.user._id }, // Assuming you want to update a blog owned by the authenticated user
      blogData,
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or user is not authorized to edit it",
      });
    }

    res.status(200).json({
      success: true,
      message: `Successfully edited blog`,
      blog: updatedBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while editing the blog",
      error: err,
    });
  }
};
