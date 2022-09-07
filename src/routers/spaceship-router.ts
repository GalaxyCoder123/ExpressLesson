import express from 'express';
import * as spaceshipDao from '../daos/spaceship.dao';
// import { authMiddleware } from '../middleware/auth.middleware';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const spaceshipRouter = express.Router();


/**
 * find all spaceships
 * endpoint: /spaceships
 */
spaceshipRouter.get('/:id', [
  // authMiddleware(['admin']),
  async (req: any, res: any) => {
    const id = +req.params.id;
    const ships = await spaceshipDao.findAllSpaceship();
    res.json(ships);
  }]);
