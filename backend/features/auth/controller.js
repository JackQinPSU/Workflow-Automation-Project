import { createUser, authenticateUser, generateToken } from './service.js';

//Register function, using createUser from service.js
const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields!' });
    }

    try {
        const user = await createUser({ username, email, password });
        return res.status(201).json({ message: 'User Created', username: user.username });
    } catch (error) {
        if (error.code === 'P2002') {
            //Prisma unique constraint violation
            return res.status(409).json({ error: 'Username or email already exists '});
        }
        console.error('Register error:', error);
        return res.status(500).json({ error: 'Registration Failed!' });
    }
};

const login = async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }
    try {
        const user = await authenticateUser( {username, password} );
        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        const token = await generateToken(user);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    } 
};

export { register, login };