import express from "express";
import   connectToMongoDB  from "./connect.js";
import URL from "./models/url.js";
import path from "path"

import jwt from "jsonwebtoken";
//routes
import staticRoute from "./routes/staticrouter.js";
import router from "./routes/url.js";
import userRoute from "./routes/user.js"

const app = express();
const PORT = 8001;

//using view engine


connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);



app.set('view engine','ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/",staticRoute);
app.use("/user",userRoute);
app.use("/url", router);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry?.redirectURL);
});



app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
