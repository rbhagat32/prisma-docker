import { prisma } from "@/config/prisma.js";
import { ErrorHandler } from "@/middlewares/error-handler.js";
import { excludePassword } from "@/utils/sanitize.js";
import { TryCatch } from "@/utils/try-catch.js";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

const getAllUsers = TryCatch(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({});
  return res.status(200).json(users.map((user) => excludePassword(user)));
});

const getUserById = TryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });

  if (!user) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(excludePassword(user));
});

const createUser = TryCatch(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const newUser = await prisma.user.create({
    data: { name, email, password: await bcrypt.hash(password, 10) },
  });

  if (!newUser) throw new ErrorHandler(400, "Error creating user !");
  return res.status(201).json(excludePassword(newUser));
});

const updateUser = TryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name, email, password: await bcrypt.hash(password, 10) },
  });

  if (!updatedUser) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json(excludePassword(updatedUser));
});

const deleteUser = TryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({
    where: { id },
  });

  if (!deletedUser) throw new ErrorHandler(404, "User not found !");
  return res.status(200).json({ message: `User deleted successfully: ${deletedUser.name}` });
});

export { createUser, deleteUser, getAllUsers, getUserById, updateUser };
