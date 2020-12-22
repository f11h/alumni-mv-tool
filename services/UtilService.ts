import {Service} from "@tsed/di";
import {randomBytes} from "crypto";

@Service()
export class UtilService {

    public generateRandomHexString(bytes: number): string {
        return randomBytes(bytes).toString('hex');
    }
}
