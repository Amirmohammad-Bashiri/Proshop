import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("kokolak", 10),
    isAdmin: true,
  },
  {
    name: "Sahar Bashiri",
    email: "sahar@example.com",
    password: bcrypt.hashSync("kokolak", 10),
  },
  {
    name: "Armin Ranjavar",
    email: "armin@example.com",
    password: bcrypt.hashSync("kokolak", 10),
  },
]

export default users
