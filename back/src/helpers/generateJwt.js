'use strict';

import jwt from 'jsonwebtoken';
import { SECRETORKEY } from './../config';

export const createJwt = uid =>
  jwt.sign({ uid }, SECRETORKEY, { expiresIn: '24h' });
