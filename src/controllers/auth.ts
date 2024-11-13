import { Request, Response } from "express";
import { getUserByUserName, createUser } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const existUser = await getUserByUserName(username);
  if (existUser) {
    res.status(400).json({ message: "الحساب الذي تريد انشاءه موجود في قاعدة البيانات", status: false });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ username, password: hashedPassword });

  res.status(201).json({ message: "تم انشاء اليوزر بنجاح", status: true });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await getUserByUserName(username);
  if (!user) {
    res.status(404).json({ message: "لا وجود لليوزر الذي تريد تسجيل الدخول فيه", status: false });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({ message: "الباسورد غير متطابق", status: false });
    return;
  }

  const token = generateToken(user.id!);
  res.status(200).json({ message: "تم التسجيل بنجاح", token, status: true });
};
