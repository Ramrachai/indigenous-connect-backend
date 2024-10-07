import { Request, Response } from 'express';
import BlogPost, { IBlogPost } from '../models/BlogPost';
import mongoose from 'mongoose';

export const getBlogPosts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;

  try {
    const total = await BlogPost.countDocuments();
    const blogPosts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .populate('author', 'username') 
      .populate('comments'); 

    res.json({
      blogPosts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
};

export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const user = req.user; 
    console.log("---user from middleware to createPost--", user);

    const blogPost: IBlogPost = new BlogPost({
      ...req.body,
      author: user._id,
    });
    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating blog post', error });
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('author', 'username') 
      .populate('comments');

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(400).json({ message: 'Error updating blog post', error });
  }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting blog post', error });
  }
};

export const searchBlogPosts = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const blogPosts = await BlogPost.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ]
    }).sort({ createdAt: -1 })
      .populate('author', 'username'); 

    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error searching blog posts', error });
  }
};

export const getRelatedPosts = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await BlogPost.findById(id).populate('author', 'username'); 
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const relatedPosts = await BlogPost.find({
      _id: { $ne: id },
      category: post.category, 
    }).limit(3).populate('author', 'username'); 

    res.json(relatedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching related posts', error });
  }
};

export const incrementShareCount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { platform } = req.body; 

  try {
    if (!['facebook', 'twitter', 'linkedin'].includes(platform)) {
      return res.status(400).json({ message: 'Invalid sharing platform' });
    }

    const blogPost = await BlogPost.findByIdAndUpdate(id, { $inc: { shares: 1 } }, { new: true });
    
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ shares: blogPost.shares });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing share count', error });
  }
};

export const incrementViewCount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blogPost = await BlogPost.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }, { new: true });
    
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ viewCount: blogPost.viewCount });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing view count', error });
  }
};

export const getBlogPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "No id provided" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post id format" });
  }
  const objectId = new mongoose.Types.ObjectId(id);

  try {
    const post = await BlogPost.findById(objectId)
      .populate('author', 'username') 
      .populate('comments');

    if (!post) {
      return res.status(404).json({ message: `No post found with id: ${id}` });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting blog post by id', error });
  }
};
