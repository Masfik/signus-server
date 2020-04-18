import app from "./app";

const start = async () => {
  try {
    await app.listen(3000);
    console.log(`Server started`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
