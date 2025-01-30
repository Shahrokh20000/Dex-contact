import dbConnect from "@/lib/dbConnect"
import TargetsModel from "@/lib/models/TargetsModel"
import UsersModel from "@/lib/models/UsersModel"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"



export async function PUT(req) {
    try {
        const { address, bonus } = await req.json()
        await dbConnect()
        console.log(address, bonus);

        const updatedUser = await UsersModel.findOneAndUpdate({ address }, { $inc: { price: bonus } })
        const target = await TargetsModel.findOne({ address }).select('targets');

        const targets = target.targets.map(item => {
            if (item.bonus <= bonus) {
                return { bonus: item.bonus, isReceived: true };
            }
            return item;
        });
        console.log('targets: ', targets);
        const updatedTarget = await TargetsModel.findOneAndUpdate({ address, targets: { $elemMatch: { bonus } } }, { $set: { "targets.$.isReceived": true } })

        console.log('Updated targets: ', updatedTarget);
        console.log('object', updatedUser);

        revalidatePath('/wathdraw', 'page')
        revalidatePath('/profits', 'page')
        return NextResponse.json({ message: 'successful' })
    } catch (error) {
        return NextResponse.json({ error })
    }
}