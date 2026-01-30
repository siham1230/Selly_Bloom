import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { register, login } from "../controllers/authController.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../models/User.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AUTH CONTROLLER UNIT TESTS", () => {
    let req, res;
    let consoleErrorSpy;
    let consoleLogSpy;

    beforeEach(() => {
        jest.clearAllMocks();

        // Suppress console.error and console.log during tests
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        process.env.JWT_SECRET = "test_secret";

        User.findOne = jest.fn();
        User.create = jest.fn();
        bcrypt.genSalt = jest.fn();
        bcrypt.hash = jest.fn();
        bcrypt.compare = jest.fn();
        jwt.sign = jest.fn();
    });

    afterEach(() => {
        // Restore console methods after each test
        consoleErrorSpy.mockRestore();
        consoleLogSpy.mockRestore();
    });

    // REGISTER TESTS
    describe("REGISTER", () => {
        it("should register user successfully", async () => {
            req.body = {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                role: "user",
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue("salt");
            bcrypt.hash.mockResolvedValue("hashedPassword");
            User.create.mockResolvedValue({
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                role: "user",
            });
            jwt.sign.mockReturnValue("fake_token");

            await register(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: "john@example.com" } });
            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith("password123", "salt");
            expect(User.create).toHaveBeenCalledWith({
                name: "John Doe",
                email: "john@example.com",
                password: "hashedPassword",
                role: "user",
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "User registered successfully",
                    token: "fake_token",
                    user: expect.objectContaining({
                        email: "john@example.com",
                    }),
                })
            );
        });

        it("should return 400 if email already exists", async () => {
            req.body = {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                role: "user"
            };
            User.findOne.mockResolvedValue({ id: 1, email: "john@example.com" });

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Email already registered"
            });
        });

        it("should handle database errors gracefully", async () => {
            req.body = {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                role: "user"
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue("salt");
            bcrypt.hash.mockResolvedValue("hashedPassword");

            const dbError = new Error("Database connection failed");
            dbError.name = "SequelizeConnectionError";
            User.create.mockRejectedValue(dbError);

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Server error during registration"
            });
            // Verify that console.error was called with the error
            expect(consoleErrorSpy).toHaveBeenCalledWith('Register error:', dbError);
        });

        it("should handle SequelizeValidationError", async () => {
            req.body = {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                role: "user"
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue("salt");
            bcrypt.hash.mockResolvedValue("hashedPassword");

            const validationError = new Error("Validation error");
            validationError.name = "SequelizeValidationError";
            User.create.mockRejectedValue(validationError);

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Email already registered"
            });
        });
    });

    // LOGIN TESTS
    describe("LOGIN", () => {
        it("should login user successfully", async () => {
            req.body = { email: "john@example.com", password: "password123" };

            const mockUser = {
                id: 1,
                email: "john@example.com",
                password: "hashedPassword",
                role: "user",
                name: "John Doe",
                isActive: true,
                lastLogin: null,
                save: jest.fn().mockResolvedValue(true),
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue("fake_token");

            await login(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: "john@example.com" } });
            expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword");
            expect(mockUser.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Login successful",
                    token: "fake_token",
                    user: expect.objectContaining({
                        email: "john@example.com",
                    }),
                })
            );
        });

        it("should return 401 if user not found", async () => {
            req.body = { email: "notfound@example.com", password: "password123" };
            User.findOne.mockResolvedValue(null);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                error: "Invalid credentials"
            });
        });

        it("should return 403 if account is deactivated", async () => {
            req.body = { email: "john@example.com", password: "password123" };
            User.findOne.mockResolvedValue({
                id: 1,
                email: "john@example.com",
                isActive: false,
            });

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                error: "Account has been deactivated"
            });
        });

        it("should return 401 if password invalid", async () => {
            req.body = { email: "john@example.com", password: "wrongpassword" };
            User.findOne.mockResolvedValue({
                id: 1,
                email: "john@example.com",
                password: "hashedPassword",
                isActive: true,
            });
            bcrypt.compare.mockResolvedValue(false);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                error: "Invalid credentials"
            });
        });

        it("should handle database errors during login", async () => {
            req.body = { email: "john@example.com", password: "password123" };

            const dbError = new Error("Database error");
            User.findOne.mockRejectedValue(dbError);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Server error during login"
            });
            // Verify that console.error was called
            expect(consoleErrorSpy).toHaveBeenCalledWith('Login error:', dbError);
        });
    });
});