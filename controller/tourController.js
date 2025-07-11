import Tour from '../models/Tour.js';



//Create
export const createTour = async (req,res) => {
    const newTour = new Tour(req.body)
    try {
        const savedTour = await newTour.save()
        res.status(200).json({success:true, message:'Succesfully Created', data: savedTour});

    } catch (err) {
        res.status(500).json({success:false, message:'Failed Created'});

    }

}

//Update
export const updateTour = async (req, res) => {

        const id = req.params.id
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set : req.body
        }, {new: true})
        
        res.status(200).json({
            success:true, 
            message:'Succesfully Update', 
            data: updatedTour
        }); //Find and Update
        
    } catch (err) {

        res.status(500).json({
            success:false, 
            message:'Failed Update'
        });
        

    }

}

export const deleteTour = async (req, res) => {
    const id = req.params.id
    try {
        await Tour.findByIdAndDelete(id);
        
        res.status(200).json({
            success:true, 
            message:'Succesfully Delete'
        });
        
    } catch (err) {

        res.status(500).json({
            success:false, 
            message:'Failed Delete'
        });
        

    }

}

export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate("reviews");
        
        res.status(200).json({
            success:true, 
            message:'Succesfully',
            data: tour
        });
        
    } catch (err) {

        res.status(404).json({
            success:false, 
            message:'Not Found'
        });
        

    }

}

export const getAllTour = async (req, res) => {

    // for pagination
    const page = parseInt(req.query.page)
    console.log(page)
    try {
        const tours = await Tour.find({})
        .populate("reviews")
        .skip(page * 8)
        .limit(8);



        res.status(200).json({
            success:true,
            count: tours.length,
            message:'Succesfully',
            data: tours
        })

    } catch (err) {
        res.status(404).json({
            success:false, 
            message:'Not Found'
        })
        
    }

}

export const getAllOutTour = async (req, res) => {

    try {
        const tours = await Tour.find({})
        res.status(200).json({
            success:true,
            count: tours.length,
            message:'Succesfully',
            data: tours
        })

    } catch (err) {
        res.status(404).json({
            success:false, 
            message:'Not Found'
        })
        
    }

}

//By Search Pencarian

export const getTourBySearch = async(req, res) => {
    const city = new RegExp(req.query.city, 'i') // => i adalah case sensitive
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        const tours = await Tour.find({ city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize} }).populate("reviews")
        res.status(200).json({
            success:true,
            message:'Succesfully',
            data: tours
        })

    } catch (err) {
        res.status(404).json({
            success:false, 
            message:'Not Found'
        })

    }
}

//get featured tour
export const getFeaturedTour = async (req, res) => {

    // for pagination
    
    try {
        const tours = await Tour.find({featured:true})
        .limit(8)
        .populate("reviews");



        res.status(200).json({
            success:true,
            message:'Succesfully',
            data: tours
        })

    } catch (err) {
        res.status(404).json({
            success:false, 
            message:'Not Found'
        })
        
    }

}

// get tour counts
export const getTourCount = async(req,res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({success:true, data:tourCount})

    } catch (err) {
        res.status(500).json({success: false, message:'failed to fetch'})

    }
}