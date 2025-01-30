import dbConnect from "@/lib/dbConnect";
import TargetsModel from "@/lib/models/TargetsModel";
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
        const foundLine = await TargetsModel.findOne({ address: address })
        console.log(foundLine);
        if (foundLine === null) {
            return NextResponse.json({ foundLine, isExist: false })
        } else {
            return NextResponse.json({ foundLine, isExist: true })
        }
    } catch (error) {
        return NextResponse.json({ error, isExist: false })
    }
} 