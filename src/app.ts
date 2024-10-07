import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db';
import swaggerSpec from './config/swagger';
import eventRoutes from './routes/eventRoutes';
import skillRoutes from './routes/skillRoutes';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import commentRoutes from './routes/commentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.get('/', (req, res , next)=> res.json({message: "✅ Server is healthy"}))

app.use('/api/events', eventRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/comments', commentRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;