import mongoose from "mongoose";

(async () => {
// const CS = `${process.env.MONGO_URI}/desafio_coder`;
    const CS = `${process.env.MONGO_URI}`;
    try {
        await mongoose.connect(CS);
        console.log("DB2 CONNECTED!");
    } catch (e) {
        console.log("error: ", e);
    }
})();