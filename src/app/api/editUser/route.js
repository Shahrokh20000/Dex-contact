import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { address, price, depositValue } = await req.json();
    let Price = Number(price);

    if (!address || !price) {
      throw new Error("Missing required fields: address and price");
    }

    await dbConnect();

    console.log("address: ", address);
    await UsersModel.updateOne(
      { address: address },
      { $inc: { investmentValue: Price, depositValue: depositValue } }
    );

    revalidatePath("/withdraw", "page");
    return NextResponse.json({ message: "updated successfully" });
  } catch (err) {
    console.error("Error updating document:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
