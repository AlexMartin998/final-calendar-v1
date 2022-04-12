'use strict';

import { response } from 'express';

import { User } from './../models';
import { createJwt } from './../helpers';

export const signUp = async (req, res = response) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });
    user.password = await user.encryptPassword(password);

    await user.save();

    res
      .status(201)
      .json({ ok: true, msg: 'Successfully registered user!', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Talk to admin' });
  }
};

export const login = async (req, res = response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Gen JWT
  const token = createJwt(user.id);

  res.status(200).json({
    ok: true,
    msg: 'Successful login!',
    token,
    user: { uid: user.id, name: user.name },
  });
};

export const renewJwt = (req, res = response) => {
  const { authenticatedUser } = req;
  if (!authenticatedUser)
    res.status(401).json({ ok: false, msg: 'Unathorized!' });

  // Gen JWT
  const token = createJwt(authenticatedUser.id);

  res.status(200).json({
    ok: true,
    token,
    user: { uid: authenticatedUser.id, name: authenticatedUser.name },
  });
};
