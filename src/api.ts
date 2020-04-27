import * as mongoose from "mongoose";

// Connect to signus database
export const mongodb = mongoose.connect("mongodb://ovh.bitward.co.uk/signus", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
