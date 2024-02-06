import { SiweMessage } from 'siwe';
import { BrowserProvider } from 'ethers';
import { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } from '../config';

interface SiweMessageData {
  domain: string;
  address: string;
  statement: string;
  uri: string;
  version: string;
  chainId: number;
  nonce: string;
}

interface ServerResponse {
  message: string;
  signature: string;
}

// Define the domain and provider for the Ethereum connection
const domain = window.location.host;
const provider = new BrowserProvider(window.ethereum);

// Function to create a SIWE message
export async function createSiweMessage(address: string, statement: string): Promise<string> {
  const res: Response = await fetch(`${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/nonce`, {
    credentials: 'include',
  });
  // Create a new SIWE message with the fetched nonce
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: 1,
    nonce: await res.text()
  });
  return message.prepareMessage();
}

// Function to connect to the user's Ethereum wallet
export function connectWallet(): void {
  provider.send('eth_requestAccounts', [])
    .catch(() => console.log('user rejected request'));
}

// Function to sign in with Ethereum
export async function signInWithEthereum(): Promise<string> {
  const signer = await provider.getSigner();
  const message = await createSiweMessage(
    await signer.getAddress(),
    'Sign in with Ethereum to the app.'
  );
  const signature = await signer.signMessage(message);

  const res = await fetch(`${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/verify`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, signature }),
    credentials: 'include'
  });
  return await res.text();
}

// Function to get the user's personal information from the backend
export async function getInformation(): Promise<string> {
  console.log(REACT_APP_BACKEND_HOST)
  console.log(REACT_APP_BACKEND_PORT)
  const res: Response = await fetch(`${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/personal_information`, {
    credentials: 'include',
  });
  return await res.text();
}

// Function to logout the user
export async function logout(): Promise<void> {
  const res: Response = await fetch(`${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/logout`, {
    credentials: 'include',
  });
  console.log(await res.text());
}