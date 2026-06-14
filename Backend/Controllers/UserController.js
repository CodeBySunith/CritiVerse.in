const UserDB = require('../Models/UserModel.js')
const Bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const saltCount = 10


const CreateUser = async (req, res) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" })
    }

    if (password.length < 8) {
        return res.status(400).json({ msg: "Password must be at least 8 characters" })
    }

    try {
        const existingEmail = await UserDB.findOne({ email })

        if (existingEmail) {
            
            return res.status(409).json({ msg: "User Already Exists" })
        }

        const existingUsername = await UserDB.findOne({ username })
        if (existingUsername) {
            return res.status(409).json({ msg: "Username Unavailable" })
        }

        const hashedPass = await Bcrypt.hash(password, saltCount)

        const data = new UserDB({
            username,
            name: username,
            email,
            password: hashedPass
        })

        await data.save()

        return res.status(201).json({ success: true, message: "Account Created" })

    } catch (e) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


const LoginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" })
    }

    try {
        const user = await UserDB.findOne({ email }).select('+password')

        if (!user) {
            
            return res.status(401).json({ msg: "Invalid email or password" })
        }

        if (user.isBanned === true) {
            return res.status(403).json({ msg: "Your Account is Banned" })
        }

        const passMatch = await Bcrypt.compare(password, user.password)

        if (!passMatch) {          
            return res.status(401).json({ msg: "Invalid email or password" })
        }

        const token = JWT.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        
        await UserDB.findByIdAndUpdate(user._id, { lastLogin: new Date() })

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        
        return res.status(200).json({
            success: true,
            msg: "Welcome",
            username: user.username,
            role: user.role,
            avatar: user.avatarURL
            
        })

    } catch (e) {
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
}


const GetProfile = async (req, res) => {
    try {

        const user = await UserDB.findById(req.user._id)
            .select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

const UpdateProfile = async (req, res) => {
    try {

        const { username, name } = req.body;

        const updatedUser = await UserDB.findByIdAndUpdate(
            req.user._id,
            {
                username,
                name
            },
            { new: true }
        ).select('-password');

        return res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

const ChangePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        const user = await UserDB.findById(req.user._id)
            .select('+password');

        const isMatch = await Bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                msg: "Current password is incorrect"
            });
        }

        const hashedPassword = await Bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            msg: "Password Updated Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

const DeleteAccount = async (req, res) => {
    try {

        await UserDB.findByIdAndDelete(req.user._id);

        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            msg: "Account Deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};




const LogoutUser = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";

        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/"
        });

        return res.status(200).json({ success: true, msg: "Logged out successfully" });
    } catch (e) {
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
};



const UserCount = async (req, res) => {
    try {
        const Usercount = await UserDB.countDocuments()

        return res.status(200).json({Usercount})
    } catch (e) {
        return res.status(500).json({ msg: "Server Error", error: e.message });
    }
    
}


const GetAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    let filter = {
      role: { $nin: ["admin", "moderator"] } // ✅ HIDE THESE ROLES
    };

    if (search) {
      filter = {
        ...filter,
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      };
    }

    const [users, totalDocuments] = await Promise.all([
      UserDB.find(filter)
        .skip(skip)
        .limit(limit)
        .lean(),

      UserDB.countDocuments(filter)
    ]);

    return res.status(200).json({
      users,
      totalpages: Math.ceil(totalDocuments / limit) || 1,
      page
    });

  } catch (e) {
    return res.status(500).json({
      msg: "Failed to fetch users",
      error: e.message
    });
  }
};

const ToggleBanUser = async (req, res) => {
    try {
        const user = await UserDB.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        if (user._id.toString() === req.auth.id) {
            return res.status(400).json({ msg: "You cannot ban yourself." });
        }

        user.isBanned = !user.isBanned; 
        await user.save();

        return res.status(200).json({ 
            msg: user.isBanned ? "User has been banned." : "User has been unbanned.", 
            isBanned: user.isBanned 
        });
    } catch (error) { return res.status(500).json({ msg: "Server Error" }); }
};



const Verify = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.log("Verify Route: No token cookie found in request headers");
            return res.status(200).json({ success: false, msg: "No session found" });
        }

        
        let decoded;
        try {
            decoded = JWT.verify(token, process.env.JWT_SECRET);
        } catch (jwtErr) {
            console.log("Verify Route: JWT Token signature is invalid or expired",jwtErr);
            return res.status(200).json({ success: false, msg: "Token expired" });
        }

        const user = await UserDB.findById(decoded.id);

        if (!user) {
            return res.status(200).json({ success: false, msg: "User no longer exists" });
        }

        if (user.isBanned === true) {
            return res.status(200).json({ success: false, msg: "Account banned" });
        }

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                role: user.role,
                avatarURL: user.avatarURL,
                avatar: user.avatarURL
            }
        });

    } catch (e) {
        console.error("Critical server error during session verification:", e.message);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};







module.exports = {CreateUser,LoginUser,LogoutUser,UserCount,GetAllUsers,ToggleBanUser,Verify,GetProfile,
    UpdateProfile,
    ChangePassword,
    DeleteAccount}