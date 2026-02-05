import db from "../config/db.js";

export const showProductDashboard = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    const [[{ totalProducts }]] = await db.query(
      "SELECT count(*) AS totalProducts FROM products",
    );
    const [[{ totalOutOfStock }]] = await db.query(
      "SELECT count(*) AS totalOutOfStock FROM products where quantity=0",
    );
    const [[{ totalInventoryValue }]] = await db.query(
      "SELECT SUM(price * quantity) AS totalInventoryValue FROM products",
    );
    res.render("product/product-dashboard", {
      title: "Products",
      user: req.session.user,
      products,
      totalProducts,
      totalOutOfStock,
      totalInventoryValue,
      error: req.flash("error"),
      success: req.flash("success"),
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const cleanData = (name, price, quantity) => {
  const productName = name.trim();
  const productPrice = parseFloat(price);
  const productQuantity = parseInt(quantity, 10);
  return {
    productName,
    productPrice,
    productQuantity,
  };
};

export const addProduct = async (req, res) => {
  try {
    let { name, price, quantity } = req.body;
    const data = cleanData(name, price, quantity);
    const productName = data.productName;
    const productPrice = data.productPrice;
    const productQuantity = data.productQuantity;

    if (!productName || isNaN(productPrice) || isNaN(productQuantity)) {
      req.flash("error", "Invalid product details");
      return res.redirect("/products");
    }

    if (productPrice <= 0 || productQuantity < 0) {
      req.flash("error", "Price or quantity cannot be negative");
      return res.redirect("/products");
    }

    const [existing] = await db.query(
      "SELECT id, quantity FROM products WHERE LOWER(name) = LOWER(?)",
      [productName],
    );

    if (existing.length > 0) {
      req.flash("error", "Product Already Exisist");
      return res.redirect("/products");
    }

    await db.query(
      "INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)",
      [productName, productPrice, productQuantity],
    );

    req.flash("success", "Product added successfully");
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let updatedData = req.body;

    const data = cleanData(
      updatedData.name,
      updatedData.price,
      updatedData.quantity,
    );
    const productName = data.productName;
    const productPrice = data.productPrice;
    const productQuantity = data.productQuantity;

    console.log(req.body, "req.body");

    const [updated] = await db.query(
      "UPDATE products SET quantity = ?, price = ? ,name = ? WHERE id = ?",
      [productQuantity, productPrice, productName, productId],
    );

    console.log(updated.affectedRows, "pto");
    if (updated.affectedRows == 0) {
      req.flash("error", "Product Update Failed");
      return res.redirect("/products");
    }
    req.flash("success", "Product Updated successfully");
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const showEditProduct = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const [[product]] = await db.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/products");
    }

    return res.status(200).json({
      success: true,
      product,
      message: "Fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
