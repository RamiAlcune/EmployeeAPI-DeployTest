import { Request, Response } from "express";
import { getOneEmployee, getAllEmployees, deleteEmployee, updateEmployee } from "../models/employeesModels";
import { QueryResult, ResultSetHeader } from "mysql2";
import { StatusCodes } from "http-status-codes";
import { stat } from "fs";
export const getOneEmployeeByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "قم بكتابة الايدي قبل ارسال الطلب", status: false });
      return;
    }
    const user = await getOneEmployee(Number(id));
    res.status(200).json({ user, status: true });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ message: "يوجد خطأ في السيرفر", status: false });
    throw error;
  }
};

export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    const Employees = await getAllEmployees();
    if (!Employees) {
      res.status(405).json({ message: "لا يوجد موظفيين في قاعدة البيانات", status: false });
      return;
    }
    res.status(200).json({ Employees, status: true });
  } catch (error) {
    res.status(405).json({ message: "يوجد خطأ في السيرفر", status: false });
    throw error;
  }
};

export const DeleteEmployeeByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rowEffected = await deleteEmployee(Number(id));
    if (!rowEffected?.affectedRows)
      res.status(405).json({ message: "لم يتم حذف اي شيء (لا يوجد ايدي)", status: false });
    res.status(202).json({ message: "Employee has been deleted from MYSQL database.", status: true });
  } catch (error) {
    res.status(405).json({ message: "يوجد خطأ في السيرفر", status: false });
  }
};
export default { getOneEmployeeByID, getAllEmployee, deleteEmployee };

export const UpdateEmployeeByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await updateEmployee(Number(id), req.body);
    if (!result?.affectedRows) {
      res.status(404).json({ message: "الموظف الذي تريد حذفه ليس موجود", status: false });
    }
    const UserAfterUpdate = await getOneEmployee(Number(id));
    res.status(202).json({ message: `تم تحديث بيانات الموظف: ${id}`, status: true, Updated: UserAfterUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "يوجد خطأ في السيرفر", status: false });
  }
};
