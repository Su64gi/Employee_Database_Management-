const authService =
require("../services/authService");

module.exports = {

  method: "POST",

  path: "/register",

  handler: async (req, h) => {

    try {

      const db =
      req.server.app.db;

      const {
        name,
        email,
        password,
        
      } = req.payload;

      if (
        !name ||
        !email ||
        !password
      ) {

        return h.response({

          error:
          "All fields required"

        }).code(400);
      }

      await authService.register(
        db,
        name,
        email,
        password
        
      );

      return h.response({

        message:
        "User registered successfully"

      }).code(201);

    } catch (err) {

      return h.response({

        error: err.message

      }).code(400);
    }
  }
};