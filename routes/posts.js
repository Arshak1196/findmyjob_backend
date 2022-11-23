import express from 'express'
import { createPost, getPosts, handleLike } from '../controllers/postControllers.js'
import { protect } from '../middlewares/authMiddleware.js'
const router=express.Router()

//get latest 10 posts
router.get('/posts',protect,getPosts)

//Create new Post
router.post('/post',protect,createPost)

//Like and Unlike Post
router.post('/like/:id',protect,handleLike)


export default router