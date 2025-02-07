import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, {
  timeStamps: true
})

export default mongoose.model("User", UserSchema);