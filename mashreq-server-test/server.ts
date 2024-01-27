import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { notFound, errorHandler } from './middlewares/ErrorMiddleware';
import UserRoutes from './routes/UserRoutes';
import cors from 'cors';
const webPush = require('web-push');


const app: Application = express();

const allowedOrigins = ['http://localhost:3000'];

const options = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));


// Initialize web-push with your VAPID keys
const publicKey = 'BLEumnOwqStiMd8nKZ7js024eJTXXkpF50nzmCk8uTGUkXU7WQkT1JHOgEMtdantfnaA0Lu7qUoRG-gcgHL6nRM';
const privateKey = 'qDRppKgeSnwJS48OQ2zBk0w42INWhFw2ijaTAsuomV0';
webPush.setVapidDetails('mailto:naved971@gmail.com', publicKey, privateKey);

// Store subscriptions
const subscriptions : any = [];

// Handle subscription requests
app.post('/subscribe', (req, res) => {
  const { subscription } = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

// Send push notifications
app.post('/sendNotification', (req, res) => {
  const { notification } = req.body;

  subscriptions.forEach((subscription : any) => {
    webPush.sendNotification(subscription, JSON.stringify(notification))
      .catch((err : any) => console.error(err));
  });

  res.status(201).json({});
});


dotenv.config();

connectDB();

app.use(express.json());


// Default
app.get("/api", (req: Request, res: Response) =>  {
    res.status(201).json({ message: "Welcome to Auth ts" });
})

// User Route
app.use("/api/auth", UserRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));