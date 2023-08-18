const port = process.env.PORT || 4600;
const server = require("./app");

server.listen(port, () => {
  console.log(`Working Successfully with ${port}`);
});
