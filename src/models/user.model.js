import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  id: Number
});

userSchema.pre('save', async function (next) {
  // verifico si es usuario nuevo o se esta actualizando
  if (!this.isNew) {
    return next();
  }

  try {
    // busco el id más alto
    const usuarioMasAlto = await this.model('users').findOne().sort('-id').exec();
    if (usuarioMasAlto) {
      this.id = usuarioMasAlto.id + 1;
    } else {
      this.id = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;