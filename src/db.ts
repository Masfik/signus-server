import * as mongoose from "mongoose";
import * as config from "../config.json";

// Connection variable to mongodb
export const mongodb = mongoose.connect(`mongodb://${config.database.host}`, {
  // the following lines are required to handle deprecation warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
