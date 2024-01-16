const POSTS = require("../model/post");
const cloudinary = require("cloudinary").v2;

// create -- C

const createPost = async (req, res) => {
  req.body.createdBy = req.user.userId;
  // const {id} = req.user
  try {
    // const {secure_url} = await cloudinary.uploader.upload(
    //     req.files.image.tempFilePath,
    //     {
    //       use_filename:true ,
    //       folder:"storiesAsset"
    //     }
    // )

    // req.body.image = secure_url
    // req.body.createdBy = id
    const post = await POSTS.create({ ...req.body });
    res.status(201).json({ message: "post created successfully", post });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get all description
const getAllDescription = async (req, res) => {
  try {
    const allPosts = await POSTS.find({}).populate("createdBy");
    res.status(200).json({ msg: "all post", allPosts });
  } catch (error) {
    res.json({ error });
  }
};
//single posts
const singlePost = async (req,res) => {
  const { postId } = req.params;
  try {
    const posts = await POSTS.findById({ _id: postId }).populate("createdBy");
    res.status(200).json({ msg: "a user post", posts });
  } catch (error) {
    res.json({ error });
  }
};

// get all post by a user
const getUserPosts = async (req, res) => {
    const { userId } = req.user;
    try {
        const post = await POSTS.find({createdBy:userId}).populate('createdBy');
        res.status(200).json({msg:'user post',post})
    } catch (error) {
        res.json({ error });
    }
}

//delete a user post
const deleteUserPost = async (req, res)=>{
     const {postId} = req.params;
     const {userId} = req.user

     try {
        const post = await POSTS.findOneAndDelete({
            _id:postId,
            createdBy:userId
        });
        res.status(200).json({msg:"deleted successfully", post})
     } catch (error) {
        res.json({ error });
     }

}

//update a user post
const updateUserPost = async (req, res) =>{
  const {postId} = req.params;
  const {userId} = req.user
  try {
    const updatedPost = await POSTS.findOneAndUpdate({
      _id:postId,
      createdBy:userId
    });
    res.status(200).json({msg:"update successfully", updatedPost})
  }catch(error){
    res.json({ error });
  }

}



module.exports = {
  createPost,
  getAllDescription,
  singlePost,
  getUserPosts,
  deleteUserPost,
  updateUserPost
};
