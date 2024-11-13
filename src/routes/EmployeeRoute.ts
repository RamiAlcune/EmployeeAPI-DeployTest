import express from "express";
import {
  getOneEmployeeByID,
  getAllEmployee,
  DeleteEmployeeByID,
  UpdateEmployeeByID,
} from "../controllers/EmployeeController";

const routes = express.Router();

routes.post("/:id", getOneEmployeeByID).delete("/:id", DeleteEmployeeByID).patch("/:id", UpdateEmployeeByID);
routes.get("/", getAllEmployee);
export default routes;
