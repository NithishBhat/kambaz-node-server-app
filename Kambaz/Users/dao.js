import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
  let { users } = db;
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    return newUser;
  };
  const findAllUsers = () => users;
  const findUserById = (userId) => users.find((user) => user._id === userId);
  const findUserByUsername = (username) =>
    users.find((user) => user.username === username);
  const findUserByCredentials = (username, password) =>
    users.find((user) => user.username === username && user.password === password);
  
  // Corrected: Merges updates instead of replacing
  const updateUser = (userId, userUpdates) => {
    users = users.map((u) =>
      u._id === userId ? { ...u, ...userUpdates } : u
    );
    return users.find((user) => user._id === userId); // Return updated user
  };

  const deleteUser = (userId) => {
    users = users.filter((u) => u._id !== userId);
    return users;
  };
  
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
// Removed the extra code that was outside the function and causing errors