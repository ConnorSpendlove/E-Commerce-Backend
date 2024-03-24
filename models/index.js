// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  // when a category record is deleted, all product records that have a foreign key referencing the deleted category will also be deleted.
  onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)
// establishes a many-to-many relationship between product and tag models using productTag 
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag // connection model
  },
  as: 'tags', 
  foreignKey: "product_id" // foreign key linking to product model in productTag
});


// Tags belongToMany Products (through ProductTag)
// establishes a many-to-many relationship between tag and product models using productTag 
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag // connection model
  },
  as: 'products',
  foreignKey: "tag_id"  // foreign key linking to product model in productTag
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
