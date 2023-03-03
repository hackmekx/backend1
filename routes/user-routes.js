const express = require("express");
const router = express.Router();

const {
  uploadImage,
  getCategory,
  deleteCategory,
  uploadProductImage,
  getProduct,
  deleteProducts,
  Newsletter,
  getEmail,
  deleteNewsLetter,
  Enqueries,
  getEnqueries,
  deleteEnquery,
  getStats,
  getProductCategorywise
} = require("../controllers/user-controller");

// Category Routes

router.post("/uploadCategory", uploadImage);
router.get("/getCategory", getCategory);
router.post("/deleteCategory", deleteCategory);

// product Routes

router.post("/uploadProduct", uploadProductImage);
router.get("/getProducts", getProduct);
router.post("/deleteProducts", deleteProducts);

// newsletter routes
router.post("/newsletter", Newsletter);
router.get("/getNewsletter", getEmail);
router.post("/deleteNewsletter", deleteNewsLetter);

// Enquery
router.post("/enquery", Enqueries);
router.get("/getEnqueries", getEnqueries);
router.post("/deleteEnquery", deleteEnquery);

//stats
router.get("/getStats", getStats);

//get product category wise
router.get("/getProductCategorywise", getProductCategorywise);

module.exports = router; 
