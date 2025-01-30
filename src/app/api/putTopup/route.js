import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/lib/models/TransactionsModel";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { address, price } = await req.json();

    if (!address || !Number(price ?? "0")) {
      throw new Error("Missing required fields: address and price");
    }

    await dbConnect();

    const user = await UsersModel.findOne({
      address,
    });

    if (!user) throw new Error("can't find user with given address!");

    if (typeof user?.investmentValue !== "number")
      throw new Error("user data is not valid");

    if (Number(price) > (user?.total_referral_profit ?? 0) + (user?.price ?? 0))
      throw new Error("amount can't be greater than profits");

    let update = null;

    if ((user?.total_referral_profit ?? 0) - Number(price) < 0) {
      const remaining =
        (Number(price ?? "0") ?? 0) - (user?.total_referral_profit ?? 0);

      update = {
        total_referral_profit: 0,
        price: user.price - remaining,
      };
    } else {
      update = {
        total_referral_profit:
          (user?.total_referral_profit ?? 0) - Number(price),
      };
    }

    const updatedDoc = await UsersModel.updateOne(
      { address: address },
      {
        $set: {
          ...update,
          investmentValue: user.investmentValue + Number(price),
        },
      }
    );

    if (!updatedDoc.modifiedCount) {
      throw new Error("Document not found or not updated");
    }

    await TransactionModel.create({
      address,
      status: "success",
      date: new Date().toDateString(),
      amount: price,
      transactionType: "topUp",
    });

    revalidatePath("/withdraw", "page");
    return NextResponse.json({ message: "updated successfully" });
  } catch (err) {
    console.error("Error updating document:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
