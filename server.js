const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// const uri =
//   "mongodb://mongodb+srv://Pretteter:qQoSiZGnUSqThw6F@cluster0.mqyzw.mongodb.net/ToDO?retryWrites=true&w=majority";

// Connect to MongoDB databasee
// returnUri();
function returnUri() {
  const username = encodeURIComponent("Pretteter");
  const password = encodeURIComponent("uQOYl1gGRFDogFgA");
  const cluster = "cluster0";
  // const authSource = "<authSource>";
  // const authMechanism = "<authMechanism>";
  let uri1 = `mongodb+srv://${username}:${password}@${cluster}.mqyzw.mongodb.net/ToDO?retryWrites=true&w=majority`;
  // console.log(uri1);
  return uri1;
}

const options = {
  useNewUrlParser: true,
  // family: 4, // Use IPv4, skip trying IPv6
};
mongoose
  .connect(returnUri(), options)
  .then(() => {
    var cors = require("cors");
    const app = express();
    app.use(express.json());
    app.use(
      cors({
        origin: "*",
      })
    );
    app.use("/api", routes);

    var db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));

    // db.once("open", function () {
    //   db.db.stats(function (err, stats) {
    //     console.log(db.collections.todos.stats());
    //   });
    // });

    const Port = process.env.PORT || 3000;
    app.listen(Port, () => {
      console.warn(`App listening on http://localhost:${Port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting with error code:", err);
  });
