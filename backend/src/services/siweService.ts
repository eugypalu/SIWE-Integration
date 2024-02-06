import { Request } from 'express';
import { Session } from 'express-session';
import { generateNonce, SiweMessage } from 'siwe';
import { createUser } from './userService';

export async function generateNonceService(): Promise<string> {
  return generateNonce();
}

export async function verifyUserService(req: Request): Promise<Session> {
  if (!req.body.message) {
    throw new Error('Expected prepareMessage object as body.');
  }

  // Create a new SIWE message from the request body
  let SIWEObject = new SiweMessage(req.body.message);
  // Verify the SIWE message
  const { data: message } = await SIWEObject.verify({ signature: req.body.signature, nonce: req.session.nonce });
  // Insert user address into the database
  await createUser(message.address, '', '');
  req.session.siwe = message;
  req.session.cookie.expires = new Date(message.expirationTime);

  return req.session;
}

export function getPersonalInformationService(req: Request): string | null {
  // Check if the session contains a SIWE message
  if (!req.session.siwe) {
    return null;
  }
  console.log("User is authenticated!");
  return req.session.siwe.address;
}

export function logoutUserService(req: Request): Session {
  // Clear the SIWE message and nonce from the session
  req.session.siwe = null;
  req.session.nonce = null;

  return req.session;
}