const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
try {
    const categoryData = await Category.findAll ({
      include: [{
        model:Product
      }]
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status (500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value

  try {
    const categoryData = await Category.findByPk (req.params.id, {
      include: [{
        model:Product
      }]
    });

    if (!categoryData) {
      res.status (404).json({
        message: "No category found matching that Id"
      });
      return
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  //create a new category
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  }
  catch (err) {
    res.status(400).json (err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update (req.body,{
      where: {
        id: req.params.id
      }
    });
    if (!updateCategory) {
      res.status(404).json({ message: "No updates with that id"});
    }
    res.status(200).json(updateCategory);
    } catch (err) {
    res.status(500).json(err);
  }
  });

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
