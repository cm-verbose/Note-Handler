import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export interface LoginPayload {
  email: string;
  id: string;

  iat: number;
  exp: number;
}
