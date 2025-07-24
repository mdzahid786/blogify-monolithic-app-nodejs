import express, { urlencoded } from "express";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import route from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { connectDB } from "./db/db.js";

// Enable __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. Config setup
dotenv.config();
const app = express();
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout");
app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: false }));

(async () => {
  try {
    // 2. Database setup
    await connectDB();
    console.log("Database connected");

    // 3. Router setup
    app.use("/", route);

    app.use((req, res) => {
      res.status(404).render("error", { message: "Page not found" });
    });
    // 4. Server setup
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
