import TDXEndpoint from "../TDXEndpoint";
import Guid from "../types/Guid";
import Attachment from "../types/Attachment";

/**
 * A class for interacting with the TDX Attachments API
 */
export default class AttachmentsEndpoint extends TDXEndpoint {
    getAttachment(id: Guid) {
        return this.client.jsonRequest<Attachment>(`attachments/${id}`);
    }

    getAttachmentData(id: Guid, base64: boolean = false) {
        if (base64)
            return this.client.rawRequest(`attachments/${id}/contentBase64`);
        else
            return this.client.rawRequest(`attachments/${id}/content`);
    }
}