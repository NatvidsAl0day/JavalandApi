import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import adminRoute from './routes/admin.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';
import { Socket } from 'dgram';
import { getAllOutTour } from './controller/tourController.js';
import { verifyAdmin, verifyUSer } from './utils/verifyToken.js';



// const server = http.createServer(app);
// const io = new Server(server);

dotenv.config()
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true
}

const server = http.createServer(app);
const io = new Server(server);
// test


app.get('/', (req, res) => {
    res.send('API RUNNING');
})

//database connect
mongoose.set("strictQuery", false);
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })

        console.log('Mongo Connect')

    } catch (err) {
        console.log('Connect Failed')

    }
}

//middleware

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/toursall', getAllOutTour);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

io.on('connection', (socket => {
    // console.log('a user connect', socket.id)
    socket.on('review', (msg) => {
        console.log('komentar-baru', msg)
    })
}))

app.listen(port, () => {
    connect();
    console.log(`Server is running on ${port}`)
});
