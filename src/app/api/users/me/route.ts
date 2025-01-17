import { getDataFromToken } from "@/helpers/getDataFromToken";

getDataFromToken;

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    try {
        const userId=await getDataFromToken(request);
        const user=await User.findOne({_id:userId}).
        select("-password -isAdmin"); //I don't want to see password and isAdmin so...
        return NextResponse.json({
            message:"User Found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}