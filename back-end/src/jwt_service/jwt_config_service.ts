import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import e from "express";

class JwtConfigService implements JwtOptionsFactory{
    createJwtOptions(): JwtModuleOptions {
        return {
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }
    }
}

export default JwtConfigService;
