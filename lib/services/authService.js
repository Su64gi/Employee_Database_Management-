const jwt = require("jsonwebtoken");


// ==========================
// REGISTER USER
// ==========================
const register = async (db, name, email, password) => {

  const [existing] = await db.query(
    `SELECT * FROM users WHERE email=?`,
    [email]
  );

  if (existing.length > 0) {
    throw new Error("Email already registered");
  }

  await db.query(
    `INSERT INTO users (name, email, password,role, is_verified)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, password, "user", false]
  );

  return true;
};


// ==========================
// CHECK LOGIN USER
// ==========================
const checkUser = async (db, email, password) => {

  // 1. check email exists
  const [user] = await db.query(
    `SELECT * FROM users WHERE email=?`,
    [email]
  );

  if (user.length === 0) {
    throw new Error("Enter registered email");
  }

  // 2. check password, salary, role,
  const existingUser = user[0];

  if (existingUser.password !== password) {
    throw new Error("Incorrect password");
  }

  return true;
};


// ==========================
// STORE LOGIN OTP
// ==========================
const storeOtp = async (db, email, otp) => {

  const [result] = await db.query(
    `INSERT INTO otp_verification
     (email, otp, expires_at)
     VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
    [email, otp]
  );

  console.log("OTP STORED SUCCESSFULLY:", result);

  return true;
};
// ==========================
// VERIFY LOGIN OTP + GENERATE JWT
// ==========================
const verifyLoginOtp = async (db, email, otp) => {

  const [rows] = await db.query(
    `SELECT * FROM otp_verification
     WHERE email=? AND otp=? AND expires_at > NOW()`,
    [email, otp]
  );

  if (rows.length === 0) {
    throw new Error("Invalid or expired OTP");
  }

  const [users] = await db.query(
    `SELECT * FROM users WHERE email=?`,
    [email]
  );
//save login history
  const user = users[0];
  await db.query(
  `INSERT INTO login_history
   (user_id, email)
   VALUES (?, ?)`,
  [
    user.id,
    user.email
  ]
);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );


  return token;
};


// ==========================
// GET PROFILE
// ==========================
const getProfile = async (db, id) => {

  const [rows] = await db.query(
    `SELECT id, name, email, department, salary, role FROM users WHERE id=?`,
    [id]
  );

  return rows[0];
};


// ==========================
// EXPORTS
// ==========================
module.exports = {
  register,
  checkUser,
  storeOtp,
  verifyLoginOtp,
  getProfile
};