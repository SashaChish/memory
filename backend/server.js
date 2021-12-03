const express = require("express");
const connectDB = require('./config/db.js');

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

//Define Routes
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/auth', require('./routes/api/auth.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));