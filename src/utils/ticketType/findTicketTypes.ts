import typeToKeywordWeights from "../../db/KeywordWeights";
import TicketType from "../../types/TicketType";
import getSettings from "../../hooks/settings/getSettings";
import Ticket from "../../tdx-api/types/Ticket";

export default function findTicketTypes(ticketInfo: Ticket) {
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
    const addWeightToType = (type: TicketType, weight: number) => {
        if (!typeWeights[type])
            typeWeights[type] = 0;
        typeWeights[type] += weight;
    }

    // Iterate Each Type
    for (const _type in typeToKeywordWeights) {
        const type = parseInt(_type) as TicketType;
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
        addWeightToType(TicketType.Network, 2);
    if (ResponsibleGroupName.includes("Website"))
        addWeightToType(TicketType.Enterprise, 2);
    if (ResponsibleGroupName.includes("ImageNow"))
        addWeightToType(TicketType.Enterprise, 1);
    if (ResponsibleGroupName.includes("VoIP"))
        addWeightToType(TicketType.VoIP, 2);
    if (ResponsibleGroupName.includes("Server"))
        addWeightToType(TicketType.Server, 2);
    if (ResponsibleGroupName.includes("Lab and Software"))
        addWeightToType(TicketType.ComputerLabs, 1);
    if (ResponsibleGroupName.includes("Classroom Technologies"))
        addWeightToType(TicketType.ClassroomTech, 2);
    if (ResponsibleGroupName.includes("Vanguard"))
        addWeightToType(TicketType.Hardware, 2);
    if (ResponsibleGroupName.includes("QA"))
        addWeightToType(TicketType.Hardware, 2);
    if (ResponsibleGroupName.includes("PeopleSoft"))
        addWeightToType(TicketType.Enterprise, 2);

    // Password Reset
    const hasPassword = Title.includes("password") || Description.includes("password");
    const hasRecover = Title.includes("recover") || Description.includes("recover");
    const hasReset = Title.includes("reset") || Description.includes("reset");
    const hasForgot = Title.includes("forgot") || Description.includes("forgot");
    const hasChange = Title.includes("change") || Description.includes("change");
    if (hasPassword && (hasReset || hasChange || hasForgot || hasRecover))
        addWeightToType(TicketType.Account, 1.5);

    // Sort the types by weight
    let sortedTypes = Object.keys(typeWeights).sort((a, b) => typeWeights[b] - typeWeights[a]);

    // Get Threshold
    const {ticketTypeThreshold} = getSettings();

    // Filter out types with low weights
    const topWeight = typeWeights[sortedTypes[0]];
    sortedTypes = sortedTypes.filter(type => typeWeights[type] > 0);
    sortedTypes = sortedTypes.filter(type => typeWeights[type] >= topWeight - ticketTypeThreshold);

    return sortedTypes.map(type => parseInt(type) as TicketType);
}