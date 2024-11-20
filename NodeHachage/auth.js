const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.post('/hash', async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        res.json({ hashedPassword });
    } catch (error) {
        res.status(500).json({ error: 'Error hashing password' });
    }
});

app.post('/verify', async (req, res) => {
    const { password, hashedPassword } = req.body;

    if (!password || !hashedPassword) {
        return res.status(400).json({ error: 'Password and hashedPassword are required' });
    }

    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        res.json({ isMatch });
    } catch (error) {
        res.status(500).json({ error: 'Error verifying password' });
    }
});

app.listen(PORT, () => {
    console.log(`Auth server running on port ${PORT}`);
});
