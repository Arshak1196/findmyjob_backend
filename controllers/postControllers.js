import { createError } from "../middlewares/error.js"
import Post from "../models/Post.js"


//@route   GET /post/posts
//@access  Private
//@desc    Get Latest 10 Posts by users.
export const getPosts = async (req, res, next) => {
    try {
        let posts = await Post.find().populate("userId", "name")
            .sort({ createdAt: -1 }).limit(10)
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

//@route   POST /post/post
//@access  Private
//@desc    Create new Post
export const createPost = async (req, res, next) => {
    try {
        const data = req.body;
        data.userId = req.user._id;
        const post = await new Post(data).save()
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

//@route   POST /post/like
//@access  Private
//@desc    Like and Unlike Post
export const handleLike = async(req,res,next)=>{
    try {
        const postId=req.params.id
        let post = await Post.findById(postId)
        if(!post) return next(createError(400,'No Post Found'))
        const saved=post.likes.includes(req.user._id)
        if(saved){
            await Post.findByIdAndUpdate(postId,{
                $pull:{
                    likes:req.user._id
                }
            })
            res.status(200).json({liked:false})
        }else{
            await Post.findByIdAndUpdate(postId,{
                $push:{
                    likes:req.user._id
                }
            })
            res.status(200).json({liked:true})
        }

        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}