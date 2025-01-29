const mongoose = require('mongoose');
const db = mongoose.connection;
const mongoURI = "mongodb://localhost:27017/Empl";
mongoose.connect(mongoURI);

db.once('open', () => {
  console.log("Connected to MongoDB.");
});

db.on('error', (error) => {
  console.error("MongoDB connection error:", error);
});

module.exports = db;
