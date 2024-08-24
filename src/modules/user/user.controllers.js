import bcrypt from "bcrypt";
import User from "../../../database/models/user.model.js";
import { capitalize } from "../../utils/capitalize.js";

const signup = (req, res) => {
  res.render("signup", { error: false, session: null });
};

const handleSignup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword)
    return res.render("signup", {
      error: "All fields are required",
      session: null,
    });

  if (password !== confirmPassword)
    return res.render("signup", {
      error: "Passwords do not match",
      session: null,
    });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (user)
    return res.render("signup", {
      error: "User already exists",
      session: null,
    });

  const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  await User.create({
    name: capitalize(name),
    email,
    password: hashedPassword,
  });
  res.redirect("/login");
};

const login = (req, res) => {
  res.render("login", { error: false, session: null });
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.render("login", {
      error: "All fields are required",
      session: null,
    });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.render("login", { error: "Invalid credentials", session: null });

  user.password = undefined;
  req.session.user = user;
  req.session.loggedIn = true;
  
  res.redirect("/profile");
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

export { signup, login, handleSignup, handleLogin, logout };
