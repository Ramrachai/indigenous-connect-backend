import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';
import Event from '../models/Event';
import UserAnalytics from '../models/UserAnalytics';
import Comment from '../models/Comment';
import User from '../models/User';
import { parseDateRange } from '../utils/date';

export const getOverview = async (req: Request, res: Response) => {
    try {
        const blogCount = await BlogPost.countDocuments();
        
        const projectCount = await Event.countDocuments();

        const totalVisits = await UserAnalytics.aggregate([
            { $group: { _id: null, totalPageViews: { $sum: '$pageViews' } } }
        ]);

        const totalTimeVisits = await UserAnalytics.aggregate([
            { $group: { _id: null, totalTime: { $sum: '$totalTimeSpent' } } }
        ]);

        const commentCount = await Comment.countDocuments();

        const totalUsers = await User.countDocuments();

        const totalShares = await BlogPost.aggregate([
            {
                $group: {
                    _id: null,
                    totalShares: { $sum: '$shares' }
                }
            }
        ]);

        const mostViewedPosts = await BlogPost.find()
            .sort({ viewCount: -1 })
            .limit(5)
            .select('title viewCount');

        const mostSharedPosts = await BlogPost.find()
            .sort({ shares: -1 })
            .limit(5)
            .select('title shares');

        res.json({
            blogCount,
            commentCount,
            projectCount,
            totalUsers,
            totalVisits: totalVisits[0]?.totalPageViews || 0,
            totalTimeVisits: Math.round((totalTimeVisits[0]?.totalTime || 0) / 3600), 
            totalShares: totalShares[0]?.totalShares || 0,
            mostSharedPosts,
            mostViewedPosts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching overview data', error });
    }
};


export const getVisitStatistics = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.params;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required' });
        }

        const { start, end } = parseDateRange(startDate as string, endDate as string);

        const visitStats = await UserAnalytics.aggregate([
            {
                $addFields: {
                    lastVisitDate: {
                        $cond: {
                            if: { $eq: [{ $type: "$lastVisit" }, "string"] },
                            then: { $dateFromString: { dateString: "$lastVisit" } },
                            else: "$lastVisit"
                        }
                    }
                }
            },
            {
                $match: {
                    lastVisitDate: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$lastVisitDate" } },
                    visitors: { $sum: 1 },
                    pageViews: { $sum: "$pageViews" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.json(visitStats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching visit statistics' });
    }
};

export const getCountryStatistics = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required' });
        }

        const { start, end } = parseDateRange(startDate as string, endDate as string);

        const countryStats = await UserAnalytics.aggregate([
            {
                $addFields: {
                    lastVisitDate: {
                        $cond: {
                            if: { $eq: [{ $type: "$lastVisit" }, "string"] },
                            then: { $dateFromString: { dateString: "$lastVisit" } },
                            else: "$lastVisit"
                        }
                    }
                }
            },
            {
                $match: { lastVisitDate: { $gte: start, $lte: end } }
            },
            {
                $group: {
                    _id: "$country",
                    visitors: { $sum: 1 },
                    pageViews: { $sum: "$pageViews" }
                }
            },
            {
                $sort: { visitors: -1 }
            }
        ]);

        res.json(countryStats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching country statistics' });
    }
};