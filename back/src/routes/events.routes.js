'use stricti';

import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields, validateJwt } from '../middlewares';
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvents,
  updateCalendarEvent,
} from '../controllers';
import { doesItExist, isDate } from '../helpers';

const router = Router();

// Middleware para todas las rutas:
router.use(validateJwt);

router
  .route('/')
  .get(getCalendarEvents)
  .post(
    [
      check('title', 'Title is required!').not().isEmpty(),
      check('start', 'Initial date is required!').custom(isDate),
      check('end', 'Finish date is required!').custom(isDate),
      validateFields,
    ],

    createCalendarEvent
  );

router
  .route('/:id')
  .put(
    [
      check('id', 'Invalid MongoDB ID!').isMongoId(),
      check('id').custom(id => doesItExist(id, 'event')),
      validateFields,
    ],

    updateCalendarEvent
  )
  .delete(
    [
      check('id', 'Invalid MongoDB ID!').isMongoId(),
      check('id').custom(id => doesItExist(id, 'event')),
      validateFields,
    ],

    deleteCalendarEvent
  );

export default router;
