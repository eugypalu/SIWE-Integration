import express, { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import session from 'express-session';
import * as siweService from '../services/siweService';

interface Request extends ExpressRequest {
  session: session.Session & Partial<session.SessionData> & { nonce?: string; siwe?: string };
}

interface Response extends ExpressResponse {}

const router = express.Router();

// Route to generate a nonce
router.get('/nonce', async function (req: Request, res: Response): Promise<Response> {
  try {
    const nonce = await siweService.generateNonceService();
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(nonce);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route to verify a user
router.post('/verify', async function (req: Request, res: Response): Promise<void> {
  try {
    const session = await siweService.verifyUserService(req);
    session.save(() => res.status(200).send(true));
  } catch (error) {
    req.session.siwe = null;
    req.session.nonce = null;
    console.error(error);
    req.session.save(() => res.status(500).json({ message: error.message }));
  }
});

// Route to get personal information
router.get('/personal_information', function (req: Request, res: Response): Response {
  try {
    const message = siweService.getPersonalInformationService(req);
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(message);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

// Route to logout a user
router.get('/logout', function (req: Request, res: Response): Response {
  const session = siweService.logoutUserService(req);
  return res.status(200).json({ message: 'Logged out successfully' });
});

export default router;