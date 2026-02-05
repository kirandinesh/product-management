import express from "express";
import logger from "morgan";
import session from "express-session";
import flash from "connect-flash";
import env from "./config/env.js";
import db from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
const PORT = env.PORT;

//view engine
app.set("view engine", "ejs");

//middlewares
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  }),
);

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.use(flash());

//routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

//start server
const startServer = async () => {
  try {
    await db.query("SELECT 1");
    console.log("DB is reachable");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
