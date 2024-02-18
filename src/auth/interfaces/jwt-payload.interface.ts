export interface JwtPayload {
    email: string;
}

export interface JwtBody extends JwtPayload {
    sub: string;
}
