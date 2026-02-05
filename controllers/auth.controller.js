import db from "../config/db.js";

export const showLogin = (req, res) => {
  res.render("auth/login", { errors: req.flash("error") });
};

//login
export const userLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    if (!userEmail || !password) {
      req.flash("error", "Email and Password are required");
      return res.redirect("/auth/login");
    }

    const [users] = await db.query(
      "SELECT id, userEmail FROM users WHERE userEmail = ? AND password = ?",
      [userEmail, password],
    );

    if (users.length === 0) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    req.session.user = users[0];

    req.flash("success", "Login successful");

    return res.redirect("/products/");
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).send("Server error");
  }
};

export const showForgotPassword = (req, res) => {
  res.render("auth/forget-password", { errors: req.flash("error") });
};

export const forgotPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const [users] = await db.query("SELECT id FROM users WHERE userEmail = ?", [
      userEmail,
    ]);

    if (users.length === 0) {
      req.flash("error", "Email not found");
      return res.redirect("/auth/forget-password");
    }

    req.session.resetEmail = userEmail;
    res.redirect("/auth/reset-password");
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).send("Server error");
  }
};

export const showResetPassword = (req, res) => {
  res.render("auth/reset-password", { errors: req.flash("error") });
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("error", "Password mismatch");
      return res.redirect("/auth/reset-password");
    }

    await db.query("UPDATE users SET password = ? WHERE userEmail = ?", [
      password,
      req.session.resetEmail,
    ]);

    delete req.session.resetEmail;

    req.flash("success", "Password updated successfully");
    res.redirect("/auth/login");
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).send("Server error");
  }
};

//logout
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
