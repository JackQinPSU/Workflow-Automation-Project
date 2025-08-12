//Auth logics that will be called in controller.js
import prisma from './model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Create new user 
const createUser = async({ username, email, password }) => {
        if (!username || !email || !password) {
            throw new Error('Missing required fields');
        }

        const passWordHash = await bcrypt.hash(password, process.env.SALT_ROUNDS);
        return prisma.user.create({
            data: { email, passWordHash, username},
        });
}

//Authenticate
const authenticateUser = async({ username, password }) => {
        const user =  await prisma.user.findUnique({ where: { username } });
        if (!user) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        return valid ? user : null;
}

//generate token method
const generateToken = async(user) => {
        return jwt.sign({
                            id: user.id, 
                            username: user.username 
                        }, 
                        process.env.JWT_SECRET, 
                        {expiresIn: '1h'}
                    );
}

export { createUser, authenticateUser, generateToken };