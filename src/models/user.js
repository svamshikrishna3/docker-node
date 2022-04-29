const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: [
        {
            flatNo: {
                type: String
            },
            lane1: {
                type: String
            },
            lane2: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            pincode: {
                type: String
            }
        }
    ]
})

userSchema.pre('save',function (next) {
    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
          return next(err)
        }
        this.password = hash;
        next()
    })
})

userSchema.methods.checkPassword  = async function (password) {
    const hash = this.password;
    return await bcrypt.compare(password, hash);
    
}
const User = mongoose.model('user', userSchema)


module.exports = User;