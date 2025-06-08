
import "reflect-metadata";
import "./config/container";
import express from "express"
import { envConfig } from "./config/envConfig";
import morgan from "morgan"

import userRoutes from "./context/user/presentation/routes"
import { errorHandler } from "./shared/error.middleware";

const app = express()


app.use(express.json());
app.use(morgan("dev"))


app.use("/users", userRoutes);
app.use(errorHandler); 

app.set("port", envConfig.PORT)

app.listen(envConfig.PORT, () => {
    console.log(`Server running on port -> ${envConfig.PORT}`);
});
