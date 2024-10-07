// server/src/routes/blogRoutes.ts
import express from 'express';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, searchBlogPosts, getRelatedPosts, incrementShareCount, incrementViewCount, getBlogPostById } from '../controllers/blogController';
import authMiddleware from '../middleware/authMiddleware';

const blogRouter = express.Router();

blogRouter.get('/', getBlogPosts);
blogRouter.get('/:id', getBlogPostById);
blogRouter.get('/search', searchBlogPosts);
blogRouter.get('/:id/related', getRelatedPosts);

blogRouter.post('/', authMiddleware, createBlogPost);
blogRouter.post('/:id/share', incrementShareCount);
blogRouter.post('/:id/view', incrementViewCount);

blogRouter.put('/:id', authMiddleware, updateBlogPost);

blogRouter.delete('/:id', authMiddleware, deleteBlogPost);

export default blogRouter;