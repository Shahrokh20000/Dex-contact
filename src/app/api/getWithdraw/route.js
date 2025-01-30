import dbConnect from "@/lib/dbConnect";
import { calculateDaysFromDate } from "@/lib/methods";
import TransactionModel from "@/lib/models/TransactionsModel";
import UsersModel from "@/lib/models/UsersModel";
import { NextResponse } from "next/server";




export async function GET(req) {
    try {
        const address = req.nextUrl.searchParams.get('address')
        console.log(address);
        if (!address) {
            console.log('address does not exists!!!');
        }
        await dbConnect()
        const foundWithdraw = await TransactionModel.find({ address: address, transactionType: 'withdraw', status: 'approve' })
        let totalWithdraw = 0
        const tenDays = foundWithdraw.map((item, index) => {
            const days = calculateDaysFromDate(item.date)
            if (days <= 10) {
                return totalWithdraw += foundWithdraw[index].amount, foundWithdraw[index]
            }
        })

        
        // if (foundWithdraw === null) {
        //     return NextResponse.json({ foundWithdraw, isExist: false })
        // } else {
        //     return NextResponse.json({ foundWithdraw, isExist: true })
        // }
        return NextResponse.json({ foundWithdraw, totalWithdraw, tenDays })
    } catch (error) {
        return NextResponse.json({ error, isExist: false })
    }
} 


