require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors'); // Add this line

const app = express();
app.use(cors()); // Add this line
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'templates')));
app.use(express.urlencoded({ extended: false }));

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

app.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });
    try {
        await user.save();
        console.log(`User registered successfully: ${email}`);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error(`Error registering user: ${error.message}`);
        res.status(400).send({ message: 'Error registering user', error });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`Invalid email or password: ${email}`);
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Invalid password for email: ${email}`);
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        console.log(`Login successful for email: ${email}`);
        res.send({ token, userName: user.name }); // Return the user's name along with the token
    } catch (error) {
        console.error(`Server error: ${error.message}`);
        res.status(500).send({ message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
