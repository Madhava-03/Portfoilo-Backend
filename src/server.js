import http from "http";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

/*


Database Connection


*/

const server = http.createServer(app);

const PORT = process.env.PORT || 5200;

server.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}.....`);
});
