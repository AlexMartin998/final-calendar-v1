'use strict';

import { Router } from 'express';
import { check } from 'express-validator';

import {
  validateFields,
  checkLoginCredentials,
  validateJwt,
} from './../middlewares';
import { signUp, login, renewJwt } from './../controllers';
import { isAlreadyRegistered } from '../helpers';

const router = Router();

router.route('/signup').post(
  [
    check('name', 'Name is Required!').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be longer than 6 characters.').isLength({
      min: 6,
    }),
    validateFields,
    check('email').custom(email => isAlreadyRegistered(email, 'user')),
    validateFields,
  ],

  signUp
);

router.route('/login').post(
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be longer than 6 characters.').isLength({
      min: 6,
    }),
    validateFields,

    checkLoginCredentials,
    validateFields,
  ],

  login
);

router.route('/renew').get([validateJwt], renewJwt);

export default router;
