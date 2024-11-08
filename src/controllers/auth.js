import createHttpError from 'http-errors';

import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  await authServices.register(req.body);
  const { name, email } = req.body;

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name,
      email,
    },
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};


const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
    });
  
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
    });
  };