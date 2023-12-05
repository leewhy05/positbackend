const express = require("express");
const {
  createPost,
  getAllDescription,
  singlePost,
  getUserPosts,
  deleteUserPost,
  updateUserPost,
} = require("../controller/postController");
const router = express.Router();
const auth = require("../middleware/auth");











// create post -- C

router.post("/posts", auth, createPost);
router.get("/allposts", getAllDescription);
router.get("/getpost/:postId", singlePost);
router.get("/userpost/:userId", auth, getUserPosts);
router.delete("/delete/:postId", auth, deleteUserPost);
router.patch("/update/:postId", auth, updateUserPost);

module.exports = router;
