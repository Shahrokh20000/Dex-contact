import dbConnect from "@/lib/dbConnect";
import WithdrawLimitModel from "@/lib/models/WithdrawLimitModel";
import { NextResponse } from "next/server";




export async function GET(req) {
    try {
        await dbConnect()

        const address = req.nextUrl.searchParams.get('address')

        const foundLimit = await WithdrawLimitModel.findOne({ address })
        return NextResponse.json(foundLimit)
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}