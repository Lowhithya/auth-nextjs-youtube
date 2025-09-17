import { getdataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usersModel";
import { connect } from "@/dbConfig/dbConfig";



export async function GET(request: NextRequest) {
  try {
    await connect();
    const userID = await getdataFromToken(request);
    const user = await User.findOne({ _id: userID }).select("-password");
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
