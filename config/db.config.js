const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/hey-dev";

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Successfully connected to database: ${MONGODB_URI}`))
  .catch(() => console.error(`An error occurred trying to connect to database: ${MONGODB_URI}`));

  // TODO: ask teachers about these lines of code
  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("Mongoose disconnected on app termination");
      process.exit(0);
    });
  });