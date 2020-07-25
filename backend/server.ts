import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from '@tsed/common';
import "@tsed/typeorm";
import * as compress from "compression";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";
import * as cookieParser from "cookie-parser";

@ServerSettings({
    statics: {
        "/": `${__dirname}/frontend_files`
    },
    mount: {
        "/api": "${rootDir}/controllers/**/*.(js|ts)"
    },
    rootDir: __dirname,
    acceptMimes: ['application/json']
})
export class Server extends ServerLoader {

    // noinspection JSUnusedGlobalSymbols

    public $beforeRoutesInit(): void | Promise<any> {
        this
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));
    }

}
