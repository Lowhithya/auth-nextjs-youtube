import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { sendEmail } from "@/helpers/mailer";



export async function POST(request: NextRequest) {
    try {
        await connect()
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        console.log(reqBody);

        // Check if user already exists

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash password!

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        // Send verify email

        await sendEmail({email,emailType:"VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created Successfully",
            success: true,
            savedUser
        }, { status: 200 })

    } catch (error: any) {
        console.log("Signup error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}