import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConflictError } from "../conflictError";

@Catch(ConflictError)
export class ConflictFilter implements ExceptionFilter {
    catch(exception: ConflictError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response.status(HttpStatus.CONFLICT).json({
            statusCode: HttpStatus.CONFLICT,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });
    }
}