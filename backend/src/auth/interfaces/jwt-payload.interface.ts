// What gets encoded INTO the JWT token
export interface JwtPayload {
    sub: string;
    email: string;
    name: string;
}

// What JwtStrategy.validate() returns — set as req.user
export interface AuthenticatedUser {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
}