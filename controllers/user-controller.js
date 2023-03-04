const cloudinary = require("cloudinary").v2;
const Category = require("../model/Category");
const Products = require("../model/Products");
const NewsletterSchema = require("../model/Newsletter");
const EnquerySchema = require("../model/Enquery");

cloudinary.config({
  cloud_name: 'dnuawjwya',
  api_key: '722837828956172',
  api_secret: '3Ze8CzpiJwE5N3oyuVi2vpqre0o',
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = async (req, res) => {
  const { data, title } = req.body;
  cloudinary.uploader.upload(data, opts, (error, result) => {
    if (result && result.secure_url) {
      console.log(result.secure_url);
      let obj = new Category({
        title: title,
        image: result.secure_url,
      });
      obj
        .save()
        .then((obj) => {
          res
            .status(200)
            .json({ message: "Category save successfully", object: obj });
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(404).json({ message: "something went wrong" });
    }
  });

  console.log(data);
  console.log(title);
};

const getCategory = async (req, res) => {
  try {
    const result = await Category.find({}, {});
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { data } = req.body;
    await Category.collection.deleteMany({ id: { $in: data } }).then((res) => {
      return res.status(200).json({ message: "successfully deleted" });
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

// Api Controllers for products management

const uploadProductImage = async (req, res) => {
  const { data, name, description, category } = req.body;
  cloudinary.uploader.upload(data, opts, (error, result) => {
    if (result && result.secure_url) {
      console.log(result.secure_url);
      let obj = new Products({
        name: name,
        description: description,
        category: category,
        image: result.secure_url,
      });
      obj
        .save()
        .then((obj) => {
          res
            .status(200)
            .json({ message: "Product save successfully", object: obj });
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(404).json({ message: "something went wrong" });
    }
  });

  console.log(data);
  console.log(name);
};

const getProduct = async (req, res) => {
  try {
    const result = await Products.find({}, {});
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { data } = req.body;
    await Products.collection.deleteMany({ id: { $in: data } }).then((res) => {
      return res.status(200).json({ message: "successfully deleted" });
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

//Newsletter
const Newsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const obj = new NewsletterSchema({ email: email });
    obj.save();
    return res.status(200).json({ message: "successfully email added" });
  } catch (err) {
    console.log(err);
  }
};

const getEmail = async (req, res) => {
  try {
    const result = await NewsletterSchema.find({}, {});
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

const deleteNewsLetter = async (req, res) => {
  try {
    const { data } = req.body;
    await NewsletterSchema.collection
      .deleteMany({ id: { $in: data } })
      .then((res) => {
        return res.status(200).json({ message: "successfully deleted" });
      });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

//Enqueries
const Enqueries = async (req, res) => {
  try {
    const {id, name, email, phoneNumber, enquery } = req.body;
    const obj = new EnquerySchema({
      id: id,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      enquery: enquery,
    });
    obj.save();
    return res.status(200).json({ message: "successfully enquery added" });
  } catch (err) {
    console.log(err);
  }
};

const getEnqueries = async (req, res) => {
  try {
    const result = await EnquerySchema.find({}, {});
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

const deleteEnquery = async (req, res) => {
  try {
    const { data } = req.body;
    await EnquerySchema.collection
      .deleteMany({ id: { $in: data } })
      .then((res) => {
        return res.status(200).json({ message: "successfully deleted" });
      });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const getStats = async (req, res) => {
  const products = await Products.count();
  const categories = await Category.count();
  const newsletter = await NewsletterSchema.count();
  const enqueries = await EnquerySchema.count();
  console.log(products);
  return res.status(200).json({
    data: {
      products: products,
      categories: categories,
      newsletter: newsletter,
      enqueries: enqueries,
    },
  });
};

//get product by category
const getProductCategorywise = async (req, res) => {
  const title = req.query.title;
  console.log(title);
  try {
    const result = await Products.find({category:title});
    console.log(result);
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

exports.uploadImage = uploadImage;
exports.getCategory = getCategory;
exports.deleteCategory = deleteCategory;
exports.uploadProductImage = uploadProductImage;
exports.getProduct = getProduct;
exports.deleteProducts = deleteProducts;
exports.Newsletter = Newsletter;
exports.getEmail = getEmail;
exports.deleteNewsLetter = deleteNewsLetter;
exports.Enqueries = Enqueries;
exports.getEnqueries = getEnqueries;
exports.deleteEnquery = deleteEnquery;
exports.getStats = getStats;
exports.getProductCategorywise = getProductCategorywise;