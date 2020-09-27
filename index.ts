import {$log, PlatformExpressHandler} from "@tsed/common";
import {Server} from "./Server";
import {PlatformExpress} from "@tsed/platform-express";

process.env["NODE_CONFIG_DIR"] = __dirname + "/config";
const config = require("config");

async function bootstrap() {
    try {
        $log.debug("Start server...");
        const platform = await PlatformExpress.bootstrap(Server, config);

        await platform.listen();
        $log.debug("Server initialized");
    } catch (er) {
        $log.error(er);
    }
}

bootstrap();
