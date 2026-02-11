const express = require('express');
const connectDB = require('./config/db'); // Need to create config
const app = express();

// Connect Database
// connectDB(); // Uncomment when config is ready

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
