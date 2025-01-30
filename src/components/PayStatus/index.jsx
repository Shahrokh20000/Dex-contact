"use client";

import { useEffect, useState } from "react";
import Container from "../Container";
import Image from "next/image";
import Failed from "../../../public/icons/payment-failed.svg";
import Successful from "../../../public/icons/digital-payment-successful.svg";
import Link from "next/link";
import axios from "axios";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const PayStatus = () => {
  const [isPaid, setPaid] = useState(false);
  const message = localStorage.getItem("message");
  const amount = localStorage.getItem("amount");
  // const trackId = localStorage.getItem('trackId')
  const { address, isConnected } = useAccount();
  console.log(message);
  const today = new Date();
  const formattedDate = today.toDateString();
  console.log(formattedDate);

  async function updatePrice() {
    const prevPrice = await getPrice();
    await axios.put("/api/editUser", { address: address, price: amount });
    await axios.put("/api/putTransaction", { date: formattedDate });
  }

  useEffect(() => {
    if (message === "success") {
      setPaid(true);
    } else {
      setPaid(false);
    }
    setTimeout(() => {
      if (isPaid) {
        updatePrice();
      }
    }, 3000);
  }, []);

  async function clearLocalStrg() {
    localStorage.clear();
  }
  return (
    <>
      <Container>
        {isPaid ? (
          <>
            <p>Payment Successful!</p>
            <Image src={Successful} alt="payment successfully" />
          </>
        ) : (
          <>
            <p>Payment failed!</p>
            <Image src={Failed} alt="payment failed" />
          </>
        )}
        <Link
          href={"/dashboard"}
          onClick={clearLocalStrg}
          className="bg-transparent border border-[#20A1FF] shadow-main cursor-pointer w-full py-2 rounded-full text-center my-2"
        >
          return to dashboard
        </Link>
      </Container>
    </>
  );
};

export default PayStatus;
