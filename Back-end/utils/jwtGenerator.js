const jwt = require("jsonwebtoken");
require('dotenv').config();
function jwtGenerator( user) {
   const payload = {
      user_id:user.user_id,
      username: user. user_name,
      email: user.user_email,
      role: user.role
   };
   return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "5hr" });
}
function getItem(token) {
   const decoded = jwt.verify(token,process.env.jwtSecret);
   return decoded;
}
module.exports = {jwtGenerator,getItem};