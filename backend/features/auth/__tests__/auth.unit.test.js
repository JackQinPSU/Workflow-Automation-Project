import { createUser, authenticateUser, generateToken } from '../service.js';


// Unit test for service.js
// testing createUser function, should return error when inputs are missing
describe('createUser', () => {
    test('throws error if username or password is missing',  async () => {
        await expect(createUser({ username: '', email: '', password: ''}))
            .rejects.toThrow('Missing required fields');
    });

    test('returns user object with hashed password', async () => {
        const user = await createUser({ username: 'jack', email: 'jack123@gmail.com', password: 'secure123'});
        expect(user.username).toBe('jack');
        expect(user.email).toBe('jack123@gmail.com');
        expect(user.passwordHash).not.toBe('secure123'); //password should be hashed, so it should be different from input password
    });
});

//Testing authenticateUser, should only authenticate user if exists and password matches
describe('authenticateUser', () => {
    test('returns null if user not found', async () => {
        const result = await authenticateUser('ghost', 'password');
        expect(result).toBeNull();
    });

    test('return user if password matches', async () => {
        const result = await authenticateUser('jack', 'secure123');
        expect(result).toHaveProperty('username', 'jack');
    });
});

//Testing generateToken, should return a valid JWT token
describe('generateToken', () => {
    test('returns a signed JWT string', async () => {
        const token = await generateToken({ id: 1, username: 'jack' });
        expect(typeof token).toBe('string');
        expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });
});

//Testing verifyToken middleware
import { verifyToken } from '../middleware.js';
import httpMocks from 'node-mocks-http';
import jwt from 'jsonwebtoken';
jest.mock('jsonwebtoken');
//mocking jwt.verify so we can use the mock token later
jwt.verify.mockImplementation(() => ({ id: 1, username: 'jack' }));


describe('verifyToken middleware', () => {
    test('Blocks request with no token', () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse();
        const next = jest.fn();

        verifyToken(req, res, next);
        expect(res._getStatusCode()).toBe(401); //Blocks request with 401
    });

    test('Calls next() if token is valid', () => {
        const token = 'valid.jwt.token'; //mock token
        const req = httpMocks.createRequest({
            headers: { authorization: `Bearer ${token}` }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        verifyToken(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});


//Testing register and login in controller.js
import { register, login } from '../controller.js';

describe('Auth Controller', () =>{
    test('register returns error for missing fields', async () => {
        const req = httpMocks.createRequest(
            { body: { username: '', email: '', password: '' } }
        );
        const res = httpMocks.createResponse();
        await register(req, res);
        expect(res._getStatusCode()).toBe(400);
    });

    test('register creates user and returns success', async () => {
        const req = httpMocks.createRequest(
            { body: { username: 'testuser', email: 'test123@gmail.com', password: 'test123' } }
        );
        const res = httpMocks.createResponse();
        await register(req, res);
        expect(res._getStatusCode()).toBe(201);
    });
});