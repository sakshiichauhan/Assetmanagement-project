import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['employee', 'admin'], 
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
},{timestamps:true});

const User = mongoose.model.userModel || mongoose.model('User', userSchema);



export default User;
