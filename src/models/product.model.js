import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  type: String,
  dateEntry: String,
  id: Number
});


productSchema.pre('save', async function (next) {
  // verifico si es usuario nuevo o se esta actualizando
  if (!this.isNew) {
    return next();
  }

  try {
    // busco el id más alto
    const productoIdMasAlto = await this.model('products').findOne().sort('-id').exec();
    if (productoIdMasAlto) {
      this.id = productoIdMasAlto.id + 1;
    } else {
      this.id = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const productModel = mongoose.model("products", productSchema);

export default productModel;