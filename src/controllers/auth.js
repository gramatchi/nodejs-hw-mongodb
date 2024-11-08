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