import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: String,
  googleId: String,
  verified: { type: Boolean, default: true }
})
userSchema.pre('save', async function(next){
  if(this.isModified('password')) this.password = await bcrypt.hash(this.password,10)
  next()
})
userSchema.methods.comparePassword = function(p){ return bcrypt.compare(p,this.password) }
export default mongoose.model('User', userSchema)
 