import Admin from "../models/Admin.js";



//Create
export const createAdmin = async (req,res) => {
    const newAdmin = new Admin(req.body)
    try {
        const savedAdmin = await newAdmin.save()
        res.status(200).json({success:true, message:'Succesfully Created', data: savedAdmin});

    } catch (err) {
        res.status(500).json({success:false, message:'Failed Created'});

    }

}

//Update
export const updateAdmin = async (req, res) => {

        const id = req.params.id
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, {
            $set : req.body
        }, {new: true})
        
        res.status(200).json({
            success:true, 
            message:'Succesfully Update', 
            data: updatedAdmin
        }); //Find and Update
        
    } catch (err) {

        res.status(500).json({
            success:false, 
            message:'Failed Update'
        });
        

    }

}

export const deleteAdmin = async (req, res) => {
    const id = req.params.id
    try {
        await Admin.findByIdAndDelete(id);
        
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

export const getSingleAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findById(id);
        
        res.status(200).json({
            success:true, 
            message:'Succesfully',
            data: admin
        });
        
    } catch (err) {

        res.status(404).json({
            success:false, 
            message:'Not Found'
        });
        

    }

}

export const getAllAdmin = async (req, res) => {


    try {
        const admins = await Admin.find({})

        res.status(200).json({
            success:true,
            count: tours.length,
            message:'Succesfully',
            data: admins
        })

    } catch (err) {
        res.status(404).json({
            success:false, 
            message:'Not Found'
        })
        
    }

}