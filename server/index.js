const Hapi = require("@hapi/hapi");
const manifest = require("./manifest");

require("dotenv").config({
  path: __dirname + "/.env"
});

const init = async () => {
  const server = Hapi.server(manifest.server);

  await server.register(manifest.register.plugins);

  server.route([
    require("../lib/routes/register"),
    require("../lib/routes/login"),
    require("../lib/routes/verifyLoginOtp"),
    require("../lib/routes/logout"),
    require("../lib/routes/profile"),
    require("../lib/routes/employee"),
    require("../lib/routes/exportEmployee")

    
  ]);

  await server.start();

  console.log("Server running on:", server.info.uri);
};

init();