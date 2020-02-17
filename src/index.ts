import { AddressInfo } from "net";
import app from "./app";

const start = async () => {
    try {
        await app.listen(3000);
        console.log(`server listening on ${(app.server.address() as AddressInfo).port}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
