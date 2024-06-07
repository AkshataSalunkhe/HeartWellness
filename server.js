require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'templates')));
app.use(express.urlencoded({ extended: false }));

// Update the connection string to your MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/heart-wellness';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String
});

const User = mongoose.model('User', UserSchema);

// User Signup Route
app.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;
    console.log('Received signup data:', req.body);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, phone });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).send({ message: 'Error registering user', error: error.message });
    }
});

// User Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login data:', req.body);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.send({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
