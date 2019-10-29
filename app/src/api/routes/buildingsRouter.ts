import express from 'express';

import buildingController from '../controllers/buildingController';

const router = express.Router();


// GET buildings
// not implemented - may be useful to GET all buildings, paginated

// GET buildings at point
router.get('/locate', buildingController.getBuildingsByLocation);

// GET buildings by reference (UPRN/TOID or other identifier)
router.get('/reference', buildingController.getBuildingsByReference);

router.get('/revision', buildingController.getLatestRevisionId);

router.route('/:building_id.json')
    // GET individual building
    .get(buildingController.getBuildingById)
    // POST building updates
    .post(buildingController.updateBuildingById);


// GET building UPRNs
router.get('/:building_id/uprns.json', buildingController.getBuildingUPRNsById);

// GET/POST like building
router.route('/:building_id/like.json')
    .get(buildingController.getBuildingLikeById)
    .post(buildingController.updateBuildingLikeById);

export default router;