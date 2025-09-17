import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { sendEmail } from "@/helpers/mailer";



export async function POST(request: NextRequest) {
    try {
        await connect()
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);

        // Check if user exists

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist!" }, { status: 400 })
        }

        // asign new password!

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        const savedUser = await user.save()
        console.log(savedUser);

        // Send verify email

        await sendEmail({ email, emailType: "RESET", userId: savedUser._id })

        return NextResponse.json({
            message: "Password changed successfully",
            success: true,
            savedUser
        }, { status: 200 })

    } catch (error: any) {
        console.log("Error changing password:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}