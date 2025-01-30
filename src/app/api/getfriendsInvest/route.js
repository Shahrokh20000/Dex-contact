import dbConnect from "@/lib/dbConnect";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get("address");

        await dbConnect();

        const user = await UsersModel.findOne({ address });
        if (!user) {
            return NextResponse.json({ error: "User not found" });
        }

        const investmentSummary = {};

        for (const fr of user.friends) {
            const line = fr.line;

            const foundFriend = await UsersModel.findOne({ address: fr.address });

            if (!foundFriend) {
                console.log(`Friend with address ${fr.address} not found.`);
                continue;
            }

            const investmentValue = foundFriend.investmentValue || 0;

            console.log('foundFriend: ', foundFriend.investmentValue, investmentValue);

            if (!investmentSummary[line]) {
                investmentSummary[line] = {
                    refCode: '',
                    totalInvestment: 0,
                    friends: []
                };
            }
            investmentSummary[line].refCode = fr.refCode
            investmentSummary[line].totalInvestment += investmentValue;
            investmentSummary[line].friends.push(fr.address);
        }
        for (let i = 1; i <= Object.keys(investmentSummary).length; i++) {  
            if (!investmentSummary[i]) {  
                investmentSummary[i] = {  
                    refCode: '',  
                    totalInvestment: 0,  
                    friends: []   
                };  
            }  
        }  

        console.log('Investment by line: ', investmentSummary);
        revalidatePath('/referral', 'page')
        return NextResponse.json({ message: 'successful', investmentSummary });
    } catch (error) {
        console.error("Error fetching investment summary:", error);
        return NextResponse.json({ error: error.message });
    }
}