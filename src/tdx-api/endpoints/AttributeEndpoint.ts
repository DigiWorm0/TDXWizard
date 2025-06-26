import TDXEndpoint from "../TDXEndpoint";
import Guid from "../types/Guid";
import CustomAttributeChoice from "../types/CustomAttributeChoice";
import CustomAttributeComponent from "../types/CustomAttributeComponent";

/**
 * A class for interacting with the TDX Attribute API
 */
export default class AttributeEndpoint extends TDXEndpoint {
    getAttributeChoices(id: Guid) {
        return this.client.jsonRequest<CustomAttributeChoice[]>(`attributes/${id}/choices`);
    }

    getComponentAttributeChoices(
        componentID: CustomAttributeComponent,
        associatedTypeID: number,
        appID: number
    ) {
        return this.client.jsonRequest<CustomAttributeChoice[]>(
            `attributes/custom?componentId=${componentID}&associatedTypeId=${associatedTypeID}&appId=${appID}`
        );
    }
}