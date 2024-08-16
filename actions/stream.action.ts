"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret=process.env.NEXT_SECRET_KEY;
//console.log(apiKey)

export const tokenProvider= async ()=>{
    const user=await currentUser();

    if(!user) throw new Error("User is not logged in");
    if(!apiKey) throw new Error("No api key");
    if(!apiSecret) throw new Error("No api secret key");

    const client=new StreamClient(apiKey,apiSecret)

    const exp=Math.round(new Date().getTime()/1000)+60*60;
    const issued=Math.floor(Date.now()/1000)-60;
    const token=client.createToken(user.id,exp,issued);
    return token;
}