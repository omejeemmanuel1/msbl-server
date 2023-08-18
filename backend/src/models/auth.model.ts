import mongoose from 'mongoose';

interface SuperAdminAttr{
    email: string; 
    password: string;
   }

   const superAdminSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true}
},{
    timestamps: true
})

const SuperAdmin = mongoose.model<SuperAdminAttr>("SuperAdmin", superAdminSchema);

export default SuperAdmin;