import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const referralCode = req.nextUrl.searchParams.get("referralCode");

    console.log(referralCode);
    if (!referralCode) {
      return NextResponse.json({ error: "referralCode parameter is missing" });
    }

    await dbConnect();

    const referrals = await UsersModel.findOne({
      referralCode: { $elemMatch: { refCode: referralCode } },
    });
    revalidatePath("/bonusvolume", "page");
    revalidatePath("/referral", "page");
    console.log(referrals);
    if (referrals === null) {
      return NextResponse.json({ isExist: false, refCode: referrals });
    } else {
      return NextResponse.json({ isExist: true, refCode: referrals });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message, isExist: false });
  }
}
