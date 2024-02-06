import User from '../models/Users';
import { IUserModel } from '../interfaces/userModel.interface';

// Function to create a new user or find an existing one
export async function createUser(address: string, username: string, bio: string): Promise<boolean> {
  const [user, created] = await User.findOrCreate({
    where: { address },
    defaults: {
      username,
      bio
    }
  });
  return created
}

// Function to fetch all users
export async function getAllUsers(): Promise<IUserModel[]> {
  const users = await User.findAll();
  return users;
}

// Function to update a user
export async function updateUser(_username: string, address: string, _bio: string): Promise<IUserModel | null> {
  const updateUser = await User.findOne({
    where: {
      address
    },
  }).then((updateUsr) => {
    updateUsr.bio = _bio;
    updateUsr.username = _username;
    return updateUsr.save();
  });
  return updateUser;
}

// Function to get a user by their address
export async function getUserByAddress(address: string): Promise<IUserModel | null> {
  const user = await User.findOne({
    where: { address },
    attributes: ['username', 'bio'] // only fetch username and bio
  });
  if (user) {
    return user;
  } else {
    console.log(`No user found with address ${address}.`);
    return null;
  }
}