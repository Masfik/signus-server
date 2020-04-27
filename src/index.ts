import app from "./app";
import { mongodb } from "./api";

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  // Connect to signus database
  mongodb
    .then(value => {
      console.log("Connection has been succesfully established!");
    })
    .catch(error => {
      console.log("Connection error:", error);
    });
});
