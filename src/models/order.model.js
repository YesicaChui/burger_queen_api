import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  client: String,
  status: String,
  dateEntry: String,
  id: Number,
  products: Array
});



orderSchema.pre('save', async function (next) {
  // verifico si es usuario nuevo o se esta actualizando
  if (!this.isNew) {
    return next();
  }

  try {
    // busco el id más alto
    const orderIdMasAlto = await this.model('orders').findOne().sort('-id').exec();
    if (orderIdMasAlto) {
      this.id = orderIdMasAlto.id + 1;
    } else {
      this.id = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;