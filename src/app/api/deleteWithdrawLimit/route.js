import dbConnect from "@/lib/dbConnect"
import WithdrawLimitModel from "@/lib/models/WithdrawLimitModel"
import { NextResponse } from "next/server"


export async function DELETE(req) {
    try {
        const { address } = await req.json()
        console.log('9', address);
        await dbConnect()

        await WithdrawLimitModel.deleteOne({ address })
        
        return NextResponse.json('the withdraw limit of ' + address + 'deleted successfully!')
    } catch (error) {
        return NextResponse.json('an error occured for delete withdraw limit ', error)
    }
}