const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");

// MongoDB Atlas connection
mongoose.connect(
  "mongodb+srv://kalyanigade354_db_user:tOXIrOW0o5GqsJgl@cluster0.z2riuje.mongodb.net/blogdb?retryWrites=true&w=majority"
);

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Blog API is running" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});