import conn from './db/config.js';
import express from 'express';
import UserRoutes from './router/UserRoutes.js';
import CategoryRoutes from './router/CategoryRoutes.js'
import BlogRoutes from './router/BlogRoutes.js';
import cors from "cors";
const app = express();

// Add middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/blog/auth", UserRoutes);
app.use("/blog/auth/category", CategoryRoutes);
app.use("/blog/auth/blog", BlogRoutes);


app.listen(8001);