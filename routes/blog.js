const express = require("express");

const router = express.Router();

const {
  addBlog,
  getBlog,
  deleteBlog,
  editBlog,
} = require("../controllers/blog");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, addBlog)
  .get(protect, getBlog)
  .delete(protect, deleteBlog)
  .put(protect, editBlog);

module.exports = router;
