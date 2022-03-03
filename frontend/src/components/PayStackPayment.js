import Axios from "axios";
import { usePaystackPayment } from "react-paystack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { payOrder } from "../actions/orderActions";
import { Button, Image } from "react-bootstrap";

const PayStackPayment = ({ amount, email, orderId }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  useEffect(() => {
    const getKey = async () => {
      const { data: clientKey } = await Axios.get("/api/config/paystack");
      setKey(clientKey);
    };
    getKey();
    console.log(key);
  }, [key]);

  const config = {
    reference: new Date().getTime(),
    email: "kevteden14@gmail.com",
    amount: amount * 100, //parseInt(amount) * 100,
    publicKey: "pk_test_3643e779f9170e353c8bd4e621a29ff2d8c13f8d",
    currency: "GHS",
    callback: "https://google.com",
  };

  const PayStackHooks = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <Button
          type="button"
          className="btn btn-block btn-success"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png"
            alt="Pay with Paystack"
            width="40%"
          ></Image>
        </Button>
      </div>
    );
  };

  const onSuccess = (reference) => {
    const paymentResult = {
      id: reference.trxref,
      status: reference.status,
      update_time: String(new Date().getTime()),
      payer: { email_address: email },
    };

    dispatch(payOrder(orderId, paymentResult));
  };

  const onClose = (ref) => console.log(ref);

  return (
    <div>
      <PayStackHooks />
    </div>
  );
};

export default PayStackPayment;
