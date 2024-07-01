import TicketInfo from "../../types/TicketInfo";
import typeToKeywordWeights from "../../db/KeywordWeights";
import TicketType from "../../types/TicketType";
import getSettings from "../settings/getSettings";

export default function findTicketTypes(ticketInfo: TicketInfo) {
    let { title, description, responsibility } = ticketInfo;

    // Convert to lowercase
    title = title.toLowerCase();
    description = description.toLowerCase();

    // Remove special characters
    title = title.replace(/[^a-zA-Z0-9 ]/g, " ");
    description = description.replace(/[^a-zA-Z0-9 ]/g, " ");

    // Add spaces to the beginning and end of the title and description
    title = " " + title + " ";
    description = " " + description + " ";

    // Remove extra spaces
    title = title.replace(/\s+/g, " ");

    // Add a type
    const typeWeights: { [type: string]: number } = {};
    const addWeightToType = (type: string, weight: number) => {
        if (!typeWeights[type])
            typeWeights[type] = 0;
        typeWeights[type] += weight;
    }

    // Iterate Each Type
    for (const type in typeToKeywordWeights) {
        const keywords = typeToKeywordWeights[type as TicketType];

        // Iterate Each Keyword
        for (const keyword in keywords) {

            // Get the number of matches
            const regexp = new RegExp(` ${keyword} `, "g");
            const titleMatches = title.match(regexp);
            const descriptionMatches = description.match(regexp);

            // Increase the weight
            const weight = keywords[keyword];
            if (titleMatches)
                addWeightToType(type, weight);
            if (descriptionMatches)
                addWeightToType(type, weight);
        }
    }

    // Add types based on responsibility
    if (responsibility.includes("Website"))
        addWeightToType("Enterprise Apps", 2);
    if (responsibility.includes("ImageNow"))
        addWeightToType("Enterprise Apps", 1);
    if (responsibility.includes("VoIP"))
        addWeightToType("VoIP", 2);
    if (responsibility.includes("Server"))
        addWeightToType("Server", 1);
    if (responsibility.includes("Lab and Software"))
        addWeightToType("Computer Labs", 1);
    if (responsibility.includes("Classroom Technologies"))
        addWeightToType("Classroom Technology", 2);
    if (responsibility.includes("Vanguard"))
        addWeightToType("Maintenance/Repair", 2);
    if (responsibility.includes("QA"))
        addWeightToType("Maintenance/Repair", 2);

    // Password Reset
    const hasPassword = title.includes("password") || description.includes("password");
    const hasRecover = title.includes("recover") || description.includes("recover");
    const hasReset = title.includes("reset") || description.includes("reset");
    const hasForgot = title.includes("forgot") || description.includes("forgot");
    const hasChange = title.includes("change") || description.includes("change");
    if (hasPassword && (hasReset || hasChange || hasForgot || hasRecover))
        addWeightToType("Account Assistance", 1.5);

    // Sort the types by weight
    let sortedTypes = Object.keys(typeWeights).sort((a, b) => typeWeights[b] - typeWeights[a]);

    // Get Threshold
    const { ticketTypeThreshold } = getSettings();

    // Filter out types with low weights
    const topWeight = typeWeights[sortedTypes[0]];
    sortedTypes = sortedTypes.filter(type => typeWeights[type] > 0);
    sortedTypes = sortedTypes.filter(type => typeWeights[type] >= topWeight - ticketTypeThreshold);

    return sortedTypes;
}