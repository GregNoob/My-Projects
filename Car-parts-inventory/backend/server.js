const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const partsRoutes = require('./routes/parts');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Database
mongoose.connect('mongodb://localhost/car_parts_inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Use routes
app.use('/api/parts', partsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));