import User from '../models/User.js';



//Create
export const createUser = async (req,res) => {
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json({success:true, message:'Succesfully Created', data: savedUser});

    } catch (err) {
        res.status(500).json({success:false, message:'Failed Created'});

    }

}

//Update
export const updateUser = async (req, res) => {

        const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set : req.body
        }, {new: true})
        
        res.status(200).json({
            success:true, 
            message:'Succesfully Update', 
            data: updatedUser
        }); //Find and Update
        
    } catch (err) {

        res.status(500).json({
            success:false, 
            message:'Failed Update'
        });
        

    }

}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id);
        
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

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        
        res.status(200).json({
            success:true, 
            message:'Succesfully',
            data: user
        });
        
    } catch (err) {

        res.status(404).json({
            success:false, 
            message:'Not Found'
        });
        

    }

}

export const getAllUser = async (req, res) => {


    try {
        const users = await User.find({})

        res.status(200).json({
            success:true,
            count: users.length,
            message:'Succesfully',
            data: users
        })

    } catch (err) {
        res.status(404).json({
            success:false, 
            message:'Not Found'
        })
        
    }

}
