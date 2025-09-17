import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";





export async function POST(request: NextRequest) {
    try {
        await connect()
        console.log("entered Login");
        
        const reqBody = await request.json()
        const { email, password } = reqBody;

        console.log(reqBody);

        // If user Exists

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        // If password is correct

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "enter Valid credentials!" }, { status: 400 })
        }

        // Token Data

        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create Token

        const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET! , { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Login Success!",
            success: true,
        })
        response.cookies.set("token", token,
            {
                httpOnly: true,
            })
        return response;

    } catch (error: any) {
        console.log("login error", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}