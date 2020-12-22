import {Service} from "@tsed/di";
import {Member} from "../model/Member";
import {DirectDebitMandate} from "../model/DirectDebitMandate";
import {DirectDebitMandateRepository} from "../dao/DirectDebitMandateRepository";
import * as dateFormat from "dateformat";
import {UtilService} from "./UtilService";
import {DirectDebitMandateChangeRequest} from "../model/DirectDebitMandateChangeRequest";
import {BadRequest, NotFound} from "ts-httpexceptions";
import {isValid} from "iban";

@Service()
export class DirectDebitMandateService {

    constructor(
        private directDebitMandateRepository: DirectDebitMandateRepository,
        private utils: UtilService,
    ) {
    }

    /**
     * Gets the direct debit mandate of the member
     * @param id member id
     * @param censored if true the fields for IBAN and BIC will be censored
     */
    public async getMemberDirectDebitMandate(id: string, censored: boolean): Promise<DirectDebitMandate> {
        const directDebitMandate = await this.directDebitMandateRepository.getDirectDebitMandateByMemberId(id);

        if (directDebitMandate !== undefined && censored) {
            if (directDebitMandate.BIC !== null) {
                directDebitMandate.BIC = directDebitMandate.BIC.substr(0, 3) + "XXXXX";
            }
            directDebitMandate.IBAN = directDebitMandate.IBAN.substr(0, 6) + "XXXXXXXXXXXXXXXX";
        }

        return directDebitMandate;
    }

    public async deleteMemberDirectDebitMandate(member: Member): Promise<void> {
        let mandate = await this.getMemberDirectDebitMandate(member.id, false);
        if (mandate === undefined) {
            throw new NotFound("Could not find direct debit mandate for user");
        }

        await this.directDebitMandateRepository.delete(mandate);
    }

    public async updateMemberDirectDebitMandate(member: Member, updateData: DirectDebitMandateChangeRequest): Promise<DirectDebitMandate> {
        let mandate = await this.getMemberDirectDebitMandate(member.id, false);

        if (mandate === undefined) {
            mandate = new DirectDebitMandate();
            mandate.member = member;
        }

        if (updateData.IBAN) {
            if (isValid(updateData.IBAN)) {
                mandate.IBAN = updateData.IBAN;
            } else {
                throw new BadRequest("Invalid IBAN format");
            }
        }

        if (updateData.BIC !== undefined) {
            if (updateData.BIC === "") updateData.BIC = null;

            if (updateData.BIC === null || this.isBicValid(updateData.BIC)) {
                mandate.BIC = updateData.BIC;
            } else {
                throw new BadRequest("Invalid BIC format");
            }
        }

        if (updateData.signed === true) { // Mandate was signed by member
            mandate.signedAt = new Date();
            mandate.mandateReference = this.generateMandateReference(member);
        } else if (updateData.signed === false) { // Mandate signature was revoked
            mandate.signedAt = null;
            mandate.mandateReference = null;
        }

        if (updateData.accountOwnerAddress) {
            mandate.accountOwnerAddress = updateData.accountOwnerAddress;
        }

        if (updateData.accountOwnerName) {
            mandate.accountOwnerName = updateData.accountOwnerName;
        }

        return this.directDebitMandateRepository.save(mandate);
    }

    /**
     * Generates a unique direct debit mandate reference as requires by SEPA.
     *
     * @param member the member the reference should be generated for.
     */
    public generateMandateReference(member: Member): string {
        let mandateReference = "MGB-"
        mandateReference += dateFormat(new Date(), "ddmmyyyy");
        mandateReference += "-"
        mandateReference += member.firstName.substr(0, 3).toUpperCase();
        mandateReference += member.lastName.substr(0, 3).toUpperCase();
        mandateReference += this.utils.generateRandomHexString(7).toUpperCase();

        return mandateReference;
    }

    /**
     * Method to check wether a given BIC has valid format.
     *
     * @param bic the BIC to check
     */
    isBicValid(bic: string): boolean {
        return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic);
    }

}
