import express from 'express';
import * as userService from '../services/userService';

const router = express.Router();

// Route to update a user's profile
router.put('/user/updateprofile/:address', async (req, res) => {
  const { user, userBio } = req.body;
  const { address } = req.params;

  try {
    // Call the userService to update the user
    const updatedUser = await userService.updateUser(user, address, userBio);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: `No user found with address ${address}.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a user by their address
router.get('/user/getuser/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const user = await userService.getUserByAddress(address);
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ message: `No user found with address ${address}.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;