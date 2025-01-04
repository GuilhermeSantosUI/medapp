import { auth } from './auth';
import { getAllExams } from './exams-list';

import { forgotPassword } from './forgot-password';
import { verifyToken } from './verify-token';

export const clientService = {
  auth,
  forgotPassword,
  verifyToken,
  getAllExams,
};
