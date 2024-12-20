import express from 'express';
import videoRoutes from './routes/videoRoutes';
import sequelize from './config/db';
import authRoutes from "./routes/authRoutes"
const app = express();

app.use(express.json());

// API routes
app.use("/auth",authRoutes)
app.use('/api', videoRoutes);

app.get("/api/hit",(req,res)=>{
    res.send({
        message:"Connectd to server"
    })
})
// Sync Sequelize with database

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced!');
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


export default app;