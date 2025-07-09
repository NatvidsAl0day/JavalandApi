// utils/verifyToken.js
import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
  // Cek header Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1] || req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token invalid/expired' });
    }
    req.user = payload; // { id, role, iat, exp }
    next();
  });
};

// Middleware untuk memeriksa user atau admin
export const verifyUSer = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ success: false, message: 'Bukan Autoritas' });
  });
};

// Middleware untuk memeriksa hanya admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ success: false, message: 'Bukan Autoritas' });
  });
};




// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.accessToken;

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: 'You Not Authorize'
//         })
//     }

//     // if token expired
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//         if (err) {
//             return res.status(401).json({
//                 success:false,
//                 message: 'Expired TOKEN'
//             })
//         }

//         req.user = user
//         next()
//     })


// }

// export const verifyUSer = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//         // if (req.user.id === req.params.id || req.user.role === 'admin') {
//         if (req.user.id === req.params.id || req.user.role === 'admin') {
//             next();
//         } else {
//             return res.status(401).json({
//                 success:false,
//                 message: 'Bukan Autoritas'
//             })

//         }
//     })
// }

// export const verifyAdmin = (req, res, next) => {
//     verifyToken(req, res, next, () => {
//         if (req.user.role === "admin") {
//             next();
//         } else {
//             return res.status(401).json({
//                 success:false,
//                 message: 'Bukan Autoritas'
//             })

//         }
//     })
// }

// // import jwt from 'jsonwebtoken';

// // const verifyToken = (req, res, next) => {
// //     const token = req.cookies.accessToken;

// //     if (!token) {
// //         return res.status(401).json({
// //             success: false,
// //             message: 'You are not authorized'
// //         });
// //     }

// //     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
// //         if (err) {
// //             return res.status(401).json({
// //                 success: false,
// //                 message: 'Expired or invalid token'
// //             });
// //         }
        
// //         req.user = decoded;
// //         next();
// //     });
// // };

// // export const verifyUSer = (req, res, next) => {
// //     verifyToken(req, res, () => {
// //         if (req.user.id === req.params.id || req.user.role === 'admin') {
// //             next();
// //         } else {
// //             return res.status(401).json({
// //                 success: false,
// //                 message: 'Not authorized'
// //             });
// //         }
// //     });
// // };

// // export const verifyAdmin = (req, res, next) => {
// //     verifyToken(req, res, () => {
// //         if (req.user.role === 'admin') {
// //             next();
// //         } else {
// //             return res.status(401).json({
// //                 success: false,
// //                 message: 'Not authorized'
// //             });
// //         }
// //     });
// // };
