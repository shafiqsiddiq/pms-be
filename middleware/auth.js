import { SECRECT_KEY } from "../config/config.js";
const veryfyToken = async (req, res, next) => {
  const token = req.header('authorization');
  if (!token) return res.status(401).send("Token is required");
  let newToken = token.split('Bearer ')[1];
  try {
      req.user = verified;
      next();
  } catch (err) {
      res.status(400).send("Invalid token")
  }
};
export default veryfyToken;
