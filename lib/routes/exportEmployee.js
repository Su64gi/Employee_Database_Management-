const auth =
require("../../plugins/auth");

const employeeService =
require("../services/employeeService");

module.exports = {

  method: "POST",

  path: "/export",

  options: {
    pre: [
      { method: auth }
    ]
  },

  handler: async (req, h) => {

    const db =
    req.server.app.db;

    const userId =
    req.user.id;

    const result =
    await employeeService.exportEmployees(
      db,
      userId
    );

    return result;
  }
};