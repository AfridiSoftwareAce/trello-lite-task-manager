const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");



dotenv.config();

const app = express();
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


// Middlewares
app.use(cors({
  origin: 'http://localhost:3001',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", taskRoutes);



app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to DB and start server
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
