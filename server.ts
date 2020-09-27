import {Configuration, Inject, PlatformApplication} from '@tsed/common';
import {GlobalAcceptMimesMiddleware} from '@tsed/platform-express';
import "@tsed/typeorm";
import * as compress from "compression";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";
import * as cookieParser from "cookie-parser";
import {ErrorHandlerMiddleware} from './errorhandling/ErrorHandlerMiddleware';

@Configuration({
    statics: {
        "/": `${__dirname}/frontend_files`
    },
    mount: {
        "/api": "${rootDir}/controllers/**/*.(js|ts)"
    },
    rootDir: __dirname,
    acceptMimes: ['application/json'],
})
export class Server {

    @Inject()
    app: PlatformApplication;

    $beforeRoutesInit(): void | Promise<any> {
        this.app
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
    }

    $afterRoutesInit(): void | Promise<any> {
        this.app
            .use(ErrorHandlerMiddleware);
    }

}
