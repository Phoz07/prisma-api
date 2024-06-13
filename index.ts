import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT: number = 8000;
const prisma = new PrismaClient();

//Get many users
app.get("/get-users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        pets: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.log("error", error);
  }
});

//Get one user
app.get("/get-users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    res.json(user);
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
