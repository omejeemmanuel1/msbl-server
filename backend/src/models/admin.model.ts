import mongoose from 'mongoose';

interface AdminAttr{
    email: string; 
    password: string;
    firstName: string;
    lastName: string;
    department: string;
   }

   const AdminSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    department:{type: String, required: true}
},{
    timestamps: true
})

const Admin = mongoose.model<AdminAttr>("admin", AdminSchema);

export default Admin;