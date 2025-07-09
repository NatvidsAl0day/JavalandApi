import Tour from "../models/Tour.js"
import Review from "../models/Review.js"



export const createReview = async(req, res) => {

    const tourId = req.params.tourId
    const newReview = new Review({...req.body})


    try {

        const savedReview = await newReview.save()

        // server.io.emit('newReview', savedReview);
        //after create new review
        await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews : savedReview._id}
        })

        // const post = await Tour.findById(savedReview.productId).populate('reviews')
        const post = await Tour.findById(savedReview._id).populate('username reviewText rating')

        res.status(200).json({
            success: true,
            message: 'Review Terkirim',
            // data: savedReview
            // data: post
            post
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Tidak Terkirim'
        })

    }
}