import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import Session from 'express-session';
import siweRoutes from './routes/siweRoutes';
import userRoutes from './routes/userRoutes';
import { FRONTEND_HOST, FRONTEND_PORT, BACKEND_PORT } from './config';

declare module 'express-session' {
    export interface SessionData {
        nonce: string;
        siwe: any;
    }
}

const app = express();
app.use(express.json());
app.use(cors({
    origin: `${FRONTEND_HOST}:${FRONTEND_PORT}`,
    credentials: true,
}))

app.use(Session({
    name: 'siwe',
    secret: "siwe-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true }
}));

app.use(siweRoutes);
app.use(userRoutes);

app.listen(BACKEND_PORT);