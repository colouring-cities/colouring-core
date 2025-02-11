import express from 'express';
import { getCategoryDependencies , getMainCategories} from '../controllers/categoryController';
const router = express.Router();

/**
 * Route to fetch category dependencies in hierarchical format.
 * GET /api/categories/dependencies
 */
router.get('/dependencies/:category_id', getCategoryDependencies);
router.get('/', getMainCategories);

//router.route('/:category_id')
 //   .get(getCategoryDependencies)
export default router;
