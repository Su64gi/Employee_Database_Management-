const auth = require("../../plugins/auth");
const employeeService =
require("../services/employeeService");

module.exports = {

  method: "POST",

  path: "/employee",

  options: {
    pre: [
      { method: auth }
    ]
  },

  handler: async (req, h) => {

    try {

      const db = req.server.app.db;

      const {
        action,
        ...data
      } = req.payload;

      // Take logged-in user id from JWT
      data.user_id = req.user.id;

      console.log("JWT User:", req.user);
      console.log("User ID:", data.user_id);

      const result =
      await employeeService.employeeAction(
        db,
        action,
        data
      );

      return result;

    } catch (err) {

      return h.response({
        error: err.message
      }).code(500);
    }
  }
};