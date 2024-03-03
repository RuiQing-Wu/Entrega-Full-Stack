import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { IllegalArgumentError } from "../argumentError";
import { Request, Response } from 'express';

@Catch(IllegalArgumentError)
export class IllegalArgumentFilter implements ExceptionFilter {
    catch(exception: IllegalArgumentError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });
    }
}