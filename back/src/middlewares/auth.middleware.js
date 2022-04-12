'use strict';

import { User } from '../models';

export const checkLoginCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const matchPassword = await user?.comparePassword(password);

  if (!user || !matchPassword)
    return res.status(400).json({
      msg: 'There was a problem logging in. Check your email and password or create an account.',
    });

  return next();
};
