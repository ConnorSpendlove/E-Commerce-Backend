const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
        include: [{
            model: Product,
            as: 'products'
          }]
      });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // includes the product model
      include: [{
        model: Product,
        as: 'products'
      }]
    });
    res.json(tagData);
  } catch (err) {
    req.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json('{"message": "Error adding tag"}');
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // updates the tag name by what is in the body request
    const tagData = await Tag.update({
      tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }});
    res.json(tagData);
  } catch (err) {
    res.status(500).json('{"message": "Error updating tag"}');
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    // removes a tag by id in the url
    const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }});
    res.json(tagData);
  } catch (err) {
    res.status(500).json('{"message": "Error deleting tag"}');
  }
});

module.exports = router;