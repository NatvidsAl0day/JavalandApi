import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server';

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})


export async function POST(request) {
    const {userId, userEmail, tourName, fullName, guestSize, phone, bookAt, totalAmount} = await request.json()
    let parameter = {
        item_details: {
            name: fullName,
            userEmail: userEmail,
            tourName: tourName,
            guestSize: guestSize,
            phone: phone,
            bookAt: bookAt,
            totalAmount: totalAmount
        },
        transaction_details: {
            order_id: userId,
            gross_amount: totalAmount
        }
    }

    const token = await snap.createTransaction(parameter)
    console.log(token)
    NextResponse({token})
}