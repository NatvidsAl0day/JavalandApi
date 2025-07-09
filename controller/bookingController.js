import Booking from '../models/Booking.js';
import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server.js';

// let snap = new Midtrans.Snap({
//     isProduction: false,
//     serverKey: process.env.SECRET,
//     clientKey: process.env.NEXT_PUBLIC_CLIENT
// })


// export async function POST(request) {
//     const {userId, userEmail, tourName, fullName, guestSize, phone, bookAt, totalAmount} = await request.json()
//     let parameter = {
//         item_details: {
//             name: fullName,
//             userEmail: userEmail,
//             tourName: tourName,
//             guestSize: guestSize,
//             phone: phone,
//             bookAt: bookAt,
//             totalAmount: totalAmount
//         },
//         transaction_details: {
//             order_id: userId,
//             gross_amount: totalAmount
//         }
//     }

//     const token = await snap.createTransaction(parameter)
//     console.log(token)
//     NextResponse({token})
// }
// export const createBooking = async(req, res) => {
//     const newBooking = new Booking(req.body)
//     try {
//         const savedBooking = await newBooking.save()
//         const { userId, userEmail, tourName, fullName, guestSize, phone, bookAt, totalAmount } = req.body;
//         const parameter = {
//             item_details: {
//                 name: fullName,
//                 userEmail: userEmail,
//                 tourName: tourName,
//                 guestSize: guestSize,
//                 phone: phone,
//                 bookAt: bookAt,
//                 totalAmount: totalAmount
//             },
//             transaction_details: {
//                 order_id: userId,
//                 gross_amount: totalAmount
//             }
//         };

//         const token = await snap.createTransaction(parameter);
//         console.log(token);

//         res.status(200).json({
//             success: true,
//             message: "Your Tour is Booked",
//             data: savedBooking
//         })

//     } catch (err) {
//         res.status(400).json({
//             success: false,
//             message: "Internal Error"
//     })
// }
// }

export const createBooking = async (req, res) => {
  // 1. Debug: lihat payload yang masuk
  console.log('[DEBUG] createBooking payload:', req.body);

  // 2. Buat instance Booking dengan type‑cast yang tepat
  const newBooking = new Booking({
    userId:      req.body.userId,
    userEmail:   req.body.userEmail,
    tourName:    req.body.tourName,
    fullName:    req.body.fullName,
    phone:       req.body.phone,
    guestSize:   Number(req.body.guestSize),      // pastikan Number
    totalAmount: Number(req.body.totalAmount),    // kalau ada
    bookAt:      new Date(req.body.bookAt)        // convert ke Date
  });

  try {
    // 3. Simpan ke MongoDB
    const savedBooking = await newBooking.save();
    console.log('[DEBUG] savedBooking:', savedBooking);

    // 4. Kirim response sukses
    return res.status(201).json({
      success: true,
      message: 'Your Tour is Booked',
      data: savedBooking
    });
  } catch (err) {
    // 5. Log error detail dan kembalikan ke client
    console.error('[ERROR] createBooking failed:', err);
    return res.status(400).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  }
};


export const getBooking = async(req, res) => {
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res.status(200).json({
            success: true,
            message: "Succes",
            data: book
        })

    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found"
    })
    }
}

//Get All Book

export const getAllBooking = async(req, res) => {
    
    try {
        const books = await Booking.find()
        res.status(200).json({
            success: true,
            message: "Succes",
            data: books
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Not Found"
    })
    }
}