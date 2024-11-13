import { Request, Response } from "express";
import connection from "../utils/database";
import { OkPacket, OkPacketParams, QueryResult, ResultSetHeader } from "mysql2";

interface Employee {
  id_employee: string;
  first_name: string;
  last_name: string;
  Age: number;
  Address: string;
}

export const getOneEmployee = async (ID: number): Promise<Employee | null> => {
  const [rows]: any = await connection.query(
    "SELECT *, salary FROM employees INNER JOIN salary USING(id_employee) WHERE id_employee = ?",
    [ID]
  );
  return rows[0] || null;
};

export const getAllEmployees = async (): Promise<Employee | null> => {
  const [rows]: any = await connection.query(
    "select id_employee,first_name,last_name,Age,Salary from employees INNER JOIN salary USING(id_employee)"
  );
  return rows;
};

export const deleteEmployee = async (ID: number): Promise<ResultSetHeader | null> => {
  const [result] = await connection.execute<ResultSetHeader>("DELETE FROM employees WHERE id_employee = ?", [ID]);
  if (!result) {
    return null;
  }
  return result;
};

export const updateEmployee = async (ID: number, UpdatedData: Partial<Employee>): Promise<ResultSetHeader | null> => {
  const [result] = await connection.query<ResultSetHeader>("Update employees SET ? WHERE id_employee = ?", [
    UpdatedData,
    ID,
  ]);
  if (!result) return null;
  return result;
};
