import express, { response } from 'express';
import { getCountryStatistics, getOverview, getVisitStatistics } from '../controllers/analyticsController';

const analyTicsRouter = express.Router();

analyTicsRouter.get('/overview', getOverview);
analyTicsRouter.get('/visit/:startDate/:endDate', getVisitStatistics);
analyTicsRouter.get('/country', getCountryStatistics);

export default analyTicsRouter;


