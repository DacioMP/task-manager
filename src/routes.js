import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = database.select("tasks");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body;

      const now = new Date();
      const [day, month, year] = [
        now.getDate(),
        now.getMonth() + 1,
        now.getFullYear(),
      ];
      const [hour, minutes, seconds] = [
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
      ];

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`,
        updated_at: null,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
];
