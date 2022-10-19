import express, { Request, Response } from 'express';
import * as spaceshipDao from '../daos/message.dao';
// import { authMiddleware } from '../middleware/auth.middleware';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const messageRouter = express.Router();

/**
 * find all spaceships
 * endpoint: /spaceships
 */
 messageRouter.get('/', [
  // authMiddleware(['admin']),
  async (request: Request, response: Response) => {
    const id = String(request.query.user);
    const userWhoRecieves = String(request.query.userWhoRecieves);
    const messages = await spaceshipDao.findAllMessages(id, userWhoRecieves);
    response.json(messages);
  }]);

  messageRouter.post('/', [
    // authMiddleware(['admin']),
    async (request: Request, response: Response) => {
      const message = request.body;
      const userID = request.params.userID;
      spaceshipDao.addMessage(message);
      response.json('success');
    }]);
