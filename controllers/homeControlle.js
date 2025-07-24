import { Product } from "../models/Product.js";
export const index = async (req, res) => {
  const products = await Product.find();
  res.render("index", { title: "Home Page Title", products: products });
};
