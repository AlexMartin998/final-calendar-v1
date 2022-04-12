'use strict';

import jwt from 'jsonwebtoken';
import { response } from 'express';

import { SECRETORKEY } from './../config';
import { User } from './../models';

export const validateJwt = async (req, res = response, next) => {
  try {
    const token = req.header('x-token');

    if (!token)
      return res.status(401).json({ msg: 'You have not sent a valid token' });

    const { uid } = jwt.verify(token, SECRETORKEY);
    const user = await User.findById(uid);

    // If they send the token and uid of a deleted user
    if (!user)
      return res.status(401).json({ msg: "User doesn't exist! - in DB" });

    user.password = null;
    req.authenticatedUser = user;

    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ ok: false, msg: 'Invalid token!' });
  }
};
