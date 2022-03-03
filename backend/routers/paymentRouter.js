import express from "express";
import expressAsyncHandler from "express-async-handler";

const paymentRouter = express.Router();

paymentRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
  })
);

paymentRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log("new get request");
    res.send({ message: "Hello world" });
  })
);

export default paymentRouter;
