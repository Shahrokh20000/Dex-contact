import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UsersModel from "@/lib/models/UsersModel";
import { revalidatePath } from "next/cache";
import TransactionModel from "@/lib/models/TransactionsModel";



export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get('address')
        await dbConnect()

        const withdrawReq = await TransactionModel.find({ address, transactionType: 'withdraw', $or: [{ status: 'approve' }, { status: 'pending' }] }).select('amount')
        const result = withdrawReq.reduce((acc, item) => acc + Number(item.amount), 0)
        const user = await UsersModel.findOne({ address })
        const triple = user.depositValue * 3

        console.log('16=> ', result, user, triple)

        revalidatePath('/all', 'page')
        revalidatePath('/withdraw', 'page')

        return NextResponse.json({ result, triple });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}