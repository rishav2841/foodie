
const express = require("express");
const Razorpay = require("Razorpay");

// Razorpay Setup

const payRouter = express.Router();

payRouter.post("/", async (req, res) => {
//   console.log('hello from backend');
  try {
    // console.log('hello from try');
    const instance = new Razorpay({
      key_id: "rzp_test_0a5IjpOEDvTSYc",
      key_secret: "BP6V62sl2dyo7qwDLXxRVXks",
    });
    // console.log('instance');

    const { order_id, amount, payment_capture, currency } = req.body;
    // console.log(amount);
    // console.log(amount*100);

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: order_id,
      payment_capture: payment_capture,
    };

    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).send("Something occured");
    }

    res.status(200).json({ success: true, data: order });
    // console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = payRouter;