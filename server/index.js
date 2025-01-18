const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const groupRoutes = require("./routes/group");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/group", groupRoutes);
const groupChatRoutes = require("./routes/groupChat");
app.use("/groupChat", groupChatRoutes);
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    app.listen(8080, () => console.log("Server running on port 8080"));
  })
  .catch((err) => console.error("Database sync error:", err));
