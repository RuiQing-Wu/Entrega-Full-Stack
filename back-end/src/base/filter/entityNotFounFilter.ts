import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { EntityNotFoundError } from "../entityNotFounError";


@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });
    }
}