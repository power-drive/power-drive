const express = require("express");
const dbconnection = require("./config/dbconfig");
const cors = require("cors");
const path = require("path");

const adminAuthRoute = require("./routes/admin_authRoute");
const supplierAuthRoute = require("./routes/supplier_authRoute");
const communicationRoute = require("./routes/communicationRoute");
const fileUploadRoute = require("./routes/file_uploadRoute");
const app = express();
const port = 5001;

//CONFIGURATIONS BEGIN *****
dbconnection();
app.use(cors());

let options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["json", "jpg"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set("x-timestamp", Date.now());
  }
};
app.use("/uploads", express.static(__dirname + "/uploads", options));

//********CONFIGURATIONS END

//ROUTES BEGIN ********

//  AUTHENTICATION
app.use("/api/admin", adminAuthRoute);
app.use("/api/supplier", supplierAuthRoute);

app.use("/api/communication", communicationRoute);

//UPLOADS
app.use("/api/upload", fileUploadRoute);

//********** ROUTES END

if (process.env.MODE_ENV === "production") {
  console.log("Hie");
  app.use(express.static(path.resolve(__dirname + "/../Client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../Client/build/index.html"));
  });
}

//   Connection
app.listen(port, () => console.log(`App listening on port ${port}!`));
