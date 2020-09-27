import {
    $log,
    Err,
    IMiddlewareError,
    Middleware,
    Next,
    ParamValidationError,
    Request,
    Response,
    ValidationError
} from "@tsed/common";
import {NextFunction as ExpressNext, Request as ExpressRequest, Response as ExpressResponse} from "express";
import {Exception} from "ts-httpexceptions";

@Middleware()
export class ErrorHandlerMiddleware implements IMiddlewareError {

    use(
        @Err() error: any,
        @Request() request: ExpressRequest,
        @Response() response: ExpressResponse,
        @Next() next: ExpressNext,
    ): any {

        if (response.headersSent) {
            return next(error);
        }

        if (error instanceof Exception) {
            $log.error("Got Exception: " + error);

            response.status(error.status)
            response.json({
                "statusCode": error.status,
                "message": error.message
            });

            return next();
        } else if (error instanceof ParamValidationError) {
            $log.error("Got Validation Error: " + error);

            response.status(error.status)
            response.json({
                "statusCode": error.status,
                "message": error.message
            });

            return next();
        }

        $log.error("Uncatched Exception: " + error);
        response.status(500)
        response.json({
            "statusCode": 500,
            "message": "Internal Server Error"
        });
    }
}
