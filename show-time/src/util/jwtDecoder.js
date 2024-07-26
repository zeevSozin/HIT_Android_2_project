import { isExpired, decodeToken } from "react-jwt";

const verifyOptions = {
  expiresIn: "12h",
  algorithm: ["RS256"],
};

export default function jwtDecode(token) {
  const decodedToken = decodeToken(token);
  const isTokenExpired = isExpired(token);
  return [isTokenExpired, decodedToken];
}
