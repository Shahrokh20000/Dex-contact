import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import TransactionModel from "@/lib/models/TransactionsModel";



export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get('address')
        await dbConnect()

        const invest = await UsersModel.findOne({ address })


        revalidatePath('/all', 'page')
        revalidatePath('/withdraw', 'page')

        return NextResponse.json({ invest: invest.investmentValue, deposit: invest.depositValue });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}