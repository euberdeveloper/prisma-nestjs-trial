import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    server: {
        host: process.env.SERVER_HOST ?? 'localhost',
        port: process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000
    },
    security: {
        jwt: {
            secret: process.env.SECURITY_JWT_SECRET,
            expiresIn: process.env.SECURITY_JWT_EXPIRES_IN,
            issuer: process.env.SECURITY_JWT_ISSUER
        }
    }
};

export default config;
