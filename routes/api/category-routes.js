const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
    // includes the product model
      include: [{
        model: Product
      }]
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // includes the product model
      include: [{
        model: Product
      }]
    });
    res.json(categoryData);
  } catch (err) {
    req.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // makes a new category that takes the name from the body
    const categoryAdd = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categoryAdd);
  } catch (err) {
    res.status(500).json('{"message": "Error adding category"}');
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
           // updates the name depending on the id entered by in the URL
          id: req.params.id
        }
      }
    );
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json('{"message": "Error updating category"}');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryUpdate = await Category.destroy(
      {
        where: {
          // delete a category by its `id` value
          id: req.params.id
        }
      }
    );
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json('{"message": "Error deleting category"}');
  }
});

module.exports = router;