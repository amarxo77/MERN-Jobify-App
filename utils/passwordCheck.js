import bcrypt from 'bcrypt';

const passwordCheck = async (passwordProvided, hashedPassword) =>
  await bcrypt.compare(passwordProvided, hashedPassword);

export default passwordCheck;
