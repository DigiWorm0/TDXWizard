import typeToKeywordWeights from "../../db/KeywordWeights";
import getSettings from "../getSettings";
import Ticket from "../../tdx-api/types/Ticket";
import TicketTypes from "../../db/TicketTypes";

export default function findTicketTypes(ticketInfo: Ticket): string[] {
    let {Title, Description, ResponsibleGroupName} = ticketInfo;

    // Convert to lowercase
    Title = Title.toLowerCase();
    Description = Description.toLowerCase();

    // Remove special characters
    Title = Title.replace(/[^a-zA-Z0-9 ]/g, " ");
    Description = Description.replace(/[^a-zA-Z0-9 ]/g, " ");

    // Add spaces to the beginning and end of the Title and Description
    Title = " " + Title + " ";
    Description = " " + Description + " ";

    // Remove extra spaces
    Title = Title.replace(/\s+/g, " ");

    // Add a type
    const typeWeights: Record<string, number> = {};
    const addWeightToType = (type: keyof typeof TicketTypes, weight: number) => {
        if (!typeWeights[type])
            typeWeights[type] = 0;
        typeWeights[type] += weight;
    }

    // Iterate Each Type
    for (const _type in typeToKeywordWeights) {
        const type = _type as keyof typeof typeToKeywordWeights;
        const keywords = typeToKeywordWeights[type];

        // Iterate Each Keyword
        for (const keyword in keywords) {

            // Get the number of matches
            const regexp = new RegExp(` ${keyword} `, "g");
            const TitleMatches = Title.match(regexp);
            const DescriptionMatches = Description.match(regexp);

            // Increase the weight
            const weight = keywords[keyword];
            if (TitleMatches)
                addWeightToType(type, weight);
            if (DescriptionMatches)
                addWeightToType(type, weight);
        }
    }

    // Add types based on responsibility
    if (ResponsibleGroupName.includes("Network"))
        addWeightToType("Network", 2);
    if (ResponsibleGroupName.includes("Website"))
        addWeightToType("Enterprise", 2);
    if (ResponsibleGroupName.includes("ImageNow"))
        addWeightToType("Enterprise", 1);
    if (ResponsibleGroupName.includes("VoIP"))
        addWeightToType("VoIP", 2);
    if (ResponsibleGroupName.includes("Server"))
        addWeightToType("Server", 2);
    if (ResponsibleGroupName.includes("Lab and Software"))
        addWeightToType("Labs", 1);
    if (ResponsibleGroupName.includes("Classroom Technologies"))
        addWeightToType("Classroom", 2);
    if (ResponsibleGroupName.includes("Vanguard"))
        addWeightToType("Hardware", 2);
    if (ResponsibleGroupName.includes("QA"))
        addWeightToType("Hardware", 2);
    if (ResponsibleGroupName.includes("PeopleSoft"))
        addWeightToType("Enterprise", 2);

    // Password Reset
    const hasPassword = Title.includes("password") || Description.includes("password");
    const hasRecover = Title.includes("recover") || Description.includes("recover");
    const hasReset = Title.includes("reset") || Description.includes("reset");
    const hasForgot = Title.includes("forgot") || Description.includes("forgot");
    const hasChange = Title.includes("change") || Description.includes("change");
    if (hasPassword && (hasReset || hasChange || hasForgot || hasRecover))
        addWeightToType("Account Assistance", 1.5);

    // Sort the types by weight
    let sortedTypes = Object.keys(typeWeights).sort((a, b) => typeWeights[b] - typeWeights[a]);

    // Get Threshold
    const {ticketTypeThreshold} = getSettings();

    // Filter out types with low weights
    const topWeight = typeWeights[sortedTypes[0]];
    sortedTypes = sortedTypes.filter(type => typeWeights[type] > 0);
    sortedTypes = sortedTypes.filter(type => typeWeights[type] >= topWeight - ticketTypeThreshold);

    return sortedTypes;
}