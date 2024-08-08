import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.jwt;

  if (!token) {
    return response.status(401).json({ error: "You are not authenticated" });
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return response.status(403).json({ error: "Token is not valid" });
    }

    if (!payload || !payload.userId) {
      return response
        .status(403)
        .json({ error: "Token is not valid or userId is missing" });
    }

    request.userId = payload.userId;

    next();
  });
};
