import { Request, Response } from 'express';
import Comment, { IComment } from '../models/Comment';

export const getComments = async (req: Request, res: Response) => {
    try {
        const blogPostId = req.params.blogPostId;
        const comments = await Comment.find({ blogPost: blogPostId, isApproved: true, parentComment: null })
            .sort({ createdAt: -1 })
            .populate({
                path: 'replies',
                match: { isApproved: true },
                options: { sort: { createdAt: 1 } },
            });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        const { blogPostId, author, content, parentCommentId } = req.body;
        const comment: IComment = new Comment({
            blogPost: blogPostId,
            author,
            content,
            parentComment: parentCommentId || null,
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating comment', error });
    }
};



export const deleteComment = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await Comment.deleteMany({ parentComment: req.params.id });
        res.json({ message: 'Comment and its replies deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting comment', error });
    }
};


export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all comments', error });
    }
};

export const approveComment = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(400).json({ message: 'Error approving comment', error });
    }
};

export const disapproveComment = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { isApproved: false },
            { new: true }
        );
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(400).json({ message: 'Error disapproving comment', error });
    }
};