import { PrismaClient } from "@prisma/client";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

// Sign-Up a new User
export async function signUpUser(req, res) {
  try {
    let user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await prisma.user.create({
      data: { ...req.body, password: hashPassword },
    });

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// Sign-In an existing User
export async function signInUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) return res.status(401).send({ message: "Invalid email..." });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "Invalid password..." });

    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = Jwt.sign(tokenData, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.status(200).send({
      data: {
        token: token,
        id: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture,
      },
      message: "signed in successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}
