import express, { json } from "express";
import cors from "cors";
import figurinhaRouter from "routes/figurinha.router";
import userRouter from "routes/user.router";
import albumRouter from "routes/album.router";


const app = express();
app.use(json())
app.use(cors())
app.use([figurinhaRouter, userRouter, albumRouter])

export default app;