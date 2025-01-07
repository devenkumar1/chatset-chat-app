import express from 'express';

import cookieParser from 'cookie-parser';

import { app,server } from './lib/socket.js';
import path from 'path'

app.use(express.json({ limit: '15mb' }));

import cors from 'cors';
const __dirname=path.resolve();
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true               
  }));

  app.use((req, res, next) => {
    res.setTimeout(1000000, () => { // Set a higher timeout value (in ms)
      res.status(408).send('Request Timeout');
    });
    next();
  });
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/Message.routes.js'
import dotenv from 'dotenv';

dotenv.config();
import connectDb from './lib/db.js';



app.use('/api/auth',authRoutes);
app.use("/api/messages",messageRoutes);
app.get('/',(req,res)=>{
    res.send("welcome to backend");
})
const PORT=process.env.PORT

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

server.listen(PORT||5000,()=>{
    console.log(`server started at port : http://localhost:${PORT}`);
    connectDb();
})