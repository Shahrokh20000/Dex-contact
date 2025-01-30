import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const cron = require("node-cron");

export async function POST(req) {
  try {
    await dbConnect();

    const users = await UsersModel.find({});

    users.map(async (user) => {
      const friendsWithhLvl3 = user.friends
        .filter((friend) => friend.level == "3")
        .map((friend) => friend.address);

      const usersWithPrices = await UsersModel.find({
        address: { $in: friendsWithhLvl3 },
      }).select("dailyProfit");
      let total = 0;
      console.log(usersWithPrices);
      usersWithPrices.map((item) => {
        if (item.dailyProfit) {
          total += (item.dailyProfit * 5) / 100;
        }
      });

      if (total > 0) {
        console.log("address: ", user.address);

        const updatedUser = await UsersModel.findOneAndUpdate(
          { address: user.address },
          user?.total_referral_profit
            ? { $inc: { total_referral_profit: total } }
            : { $set: { total_referral_profit: total ?? 0 } }
        );
        console.log("updatedUser: ", updatedUser);
      }
      revalidatePath("/bonusvolume", "page");
      console.log("lvl3: ", total);
    });
    return NextResponse.json({ lvl3Profit: "success" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
