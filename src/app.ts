import express, { Application, RequestHandler } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import employeeRoutes from "./routes/EmployeeRoute";
import authRoutes from "./routes/authRoute";
import { authMiddleware } from "./middlewares/authMiddleWare";

dotenv.config();
const app: Application = express();

// Middlewares
app.use(express.json());
app.set("trust proxy", 1); // Trust the first proxy

app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  })
);

// Routes
app.use("/api/v1/employee", authMiddleware as RequestHandler, employeeRoutes); // Protected route
app.use("/api/v1/users", authRoutes); // Unprotected route for login/register

// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
