// server.js (or index.js)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

// Import routes and utils
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import adminRoute from './routes/admin.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';
import { getAllOutTour } from './controller/tourController.js';
import { verifyAdmin, verifyUser } from './utils/verifyToken.js';

// Import Mongo connection helper
import { connectMongo } from './connectMongo.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = { origin: true, credentials: true };

// HTTP & Socket.IO setup
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.send('API RUNNING'));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/toursall', getAllOutTour);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

// Socket.IO events
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);
  socket.on('review', (msg) => console.log('📩 New review:', msg));
});

// Start server & connect to MongoDB
dbConnectAndStart();

async function dbConnectAndStart() {
  await connectMongo();
  server.listen(port, () => console.log(`🚀 Server running on port ${port}`));
}
