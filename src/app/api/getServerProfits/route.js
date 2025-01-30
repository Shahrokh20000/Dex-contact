import dbConnect from "@/lib/dbConnect";
import LineModel from "@/lib/models/LinesModel";
import UsersModel from "@/lib/models/UsersModel";
const { revalidatePath } = require("next/cache");
const { NextResponse } = require("next/server");

export async function POST(req) {
  try {
    await dbConnect();

    const users = await UsersModel.find({});

    for (const user of users) {
      let profit;
      let profitValue = 0;

      // Get the current time and check the last profit calculation
      const currentTime = new Date();
      const lastProfitCalculation = user.lastProfitCalculation || new Date(0);
      const timeDifference = currentTime - new Date(lastProfitCalculation);

      // 24 hours in milliseconds
      const oneDay = 24 * 60 * 60 * 1000;

      if (timeDifference < oneDay) {
        console.log(
          `Skipping user ${user.address} as 24 hours have not passed.`
        );
        continue; // Skip if 24 hours haven't passed
      }

      // Profit calculation based on investment value
      if (user.investmentValue >= 10 && user.investmentValue <= 99) {
        profit = 0.7;
      } else if (user.investmentValue >= 100 && user.investmentValue <= 499) {
        profit = 0.8;
      } else if (user.investmentValue >= 500 && user.investmentValue <= 999) {
        profit = 0.9;
      } else if (user.investmentValue >= 1000 && user.investmentValue <= 4999) {
        profit = 1.0;
      } else if (user.investmentValue >= 5000 && user.investmentValue <= 9999) {
        profit = 1.1;
      } else if (
        user.investmentValue >= 10000 &&
        user.investmentValue <= 19999
      ) {
        profit = 1.2;
      } else if (
        user.investmentValue >= 20000 &&
        user.investmentValue <= 29999
      ) {
        profit = 1.3;
      } else if (
        user.investmentValue >= 30000 &&
        user.investmentValue <= 49999
      ) {
        profit = 1.4;
      } else if (
        user.investmentValue >= 50000 &&
        user.investmentValue <= 100000
      ) {
        profit = 1.5;
      } else {
        profit = 0;
      }

      profitValue = (user.investmentValue * profit) / 100;

      try {
        // Update the user's profit and price fields and set last profit calculation time
        await UsersModel.findOneAndUpdate(
          { address: user.address },
          {
            $set: {
              dailyProfit: profitValue,
              lastProfitCalculation: currentTime,
            },
            $inc: { price: profitValue },
          }
        );
        console.log(`Updated user ${user.address} with profit ${profitValue}`);
      } catch (error) {
        console.error(`Failed to update user ${user.address}:`, error);
      }
    }

    revalidatePath("/bonusvolume", "page");
    revalidatePath("/withdraw", "page");

    return NextResponse.json({ message: "success add profits" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "failed add profits" });
  }
}
