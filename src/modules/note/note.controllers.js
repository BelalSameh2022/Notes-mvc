import Note from "../../../database/models/note.model.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const profile = async (req, res) => {
  const { loggedIn, user } = req.session;

  if (loggedIn) {
    const notes = await Note.find({ user: user._id });
    return res.render("profile", { session: req.session, notes });
  }

  res.redirect("/login");
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

const addNote = async (req, res) => {
  const { title, description } = req.body;
  const { user } = req.session;

  if (!title && !description) return res.redirect("/profile");

  const now = new Date();
  const date = `${
    months[now.getMonth()]
  } ${now.getDate()}, ${now.getFullYear()}`;

  await Note.create({ title, description, date, user: user._id });
  res.redirect("/profile");
};

const updateNote = async (req, res) => {
  const { noteId, title, description } = req.body;
  const { user } = req.session;

  if (!title && !description) return res.redirect("/profile");

  const now = new Date();
  const date = `${
    months[now.getMonth()]
  } ${now.getDate()}, ${now.getFullYear()}`;

  await Note.findByIdAndUpdate(noteId, { title, description, date });
  res.redirect("/profile");
};

const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  await Note.findByIdAndDelete(noteId);
  res.redirect("/profile");
};

export { profile, logout, addNote, updateNote, deleteNote };
