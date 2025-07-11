import User from '../models/User.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async(req,res) => {

    try {
        //hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
            // role: req.body.role || 'user'
            
        })

        await newUser.save()
        res.status(200).json({
            succes:true,
            message:'Successfully Created Account'
        })

    } catch (err) {
        res.status(500).json({
            succes:false,
            message:'Failed Created Account'
        })

    }

}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ success: false, message: 'User tidak ada' });

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).json({ success: false, message: 'Password salah' });

    const { password, ...rest } = user._doc;
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15d' }
    );

    // Kirim cookie + JSON payload
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // hanya HTTPS pada production
        sameSite: 'none',                              // diperlukan kalau lintas domain
        maxAge: 15 * 24 * 60 * 60 * 1000               // 15 hari
      })
      .status(200)
      .json({
        success: true,
        token,
        data: rest,
        role: user.role
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal login' });
  }
};

export const registerAdmin = async(req,res) => {

    try {
        //hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
            // role: req.body.role || 'user'
            
        })

        await newAdmin.save()
        res.status(200).json({
            succes:true,
            message:'Successfully Created Account'
        })

    } catch (err) {
        res.status(500).json({
            succes:false,
            message:'Failed Created Account'
        })

    }

}

export const loginAdmin = async(req,res) => {
    const email = req.body.email


    try {

        const admin = await Admin.findOne({email})

        //Jika Admin tidak ada
        if (!admin) {
            return res.status(404).json({
                succes:false,
                message:'Admin Tidak ada'
            })
        }

        //Perbandingan Password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, admin.password)

        //Jika Password Salah
        if (!checkCorrectPassword) {
            return res.status(401).json({
                succes:false,
                message:'passwod salah'

            })
        }

        const { password, role, ...rest } = admin._doc
        
        //jwt token
        const token = jwt.sign({
            id: admin._id,
            role: admin.role
        }, process.env.JWT_SECRET_KEY,{ expiresIn: "15d" });


        // set token cookies
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            // success:true,
            token,
            data: { ...rest },
            role
        })

        // res.cookie('accessToken', token, {
        //     httpOnly: true,
        //     expires: token.expiresIn
        // }).status(200).json({
        //     success:true,
        //     token,
        //     data: { ...rest },
        //     role
        // })

    } catch (err) {
        res.status(401).json({
            succes:false,
            message:'Gagal Login'

        })

    }
    
}
