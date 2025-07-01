import typeToKeywordWeights from "../../db/KeywordWeights";
import getSettings from "../getSettings";
import Ticket from "../../tdx-api/types/Ticket";

export default function findTicketTypes(ticketInfo: Ticket): number[] {
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
    const addWeightToType = (type: number, weight: number) => {
        if (!typeWeights[type])
            typeWeights[type] = 0;
        typeWeights[type] += weight;
    }

    // Iterate Each Type
    for (const _type in typeToKeywordWeights) {
        const type = parseInt(_type);
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
        addWeightToType(1002, 2);
    if (ResponsibleGroupName.includes("Website"))
        addWeightToType(996, 2);
    if (ResponsibleGroupName.includes("ImageNow"))
        addWeightToType(996, 1);
    if (ResponsibleGroupName.includes("PeopleSoft"))
        addWeightToType(996, 2);
    if (ResponsibleGroupName.includes("VoIP"))
        addWeightToType(1004, 2);
    if (ResponsibleGroupName.includes("Server"))
        addWeightToType(1003, 2);
    if (ResponsibleGroupName.includes("Lab and Software"))
        addWeightToType(630, 1);
    if (ResponsibleGroupName.includes("Classroom Technologies"))
        addWeightToType(1006, 2);
    if (ResponsibleGroupName.includes("Vanguard"))
        addWeightToType(1000, 2);
    if (ResponsibleGroupName.includes("QA"))
        addWeightToType(1000, 2);

    // Sort the types by weight
    let sortedTypes = Object.keys(typeWeights)
        .map(type => parseInt(type))
        .sort((a, b) => typeWeights[b] - typeWeights[a]);

    // Get Threshold
    const {ticketTypeThreshold} = getSettings();

    // Filter out types with low weights
    const topWeight = typeWeights[sortedTypes[0]];
    sortedTypes = sortedTypes.filter(type => typeWeights[type] > 0);
    sortedTypes = sortedTypes.filter(type => typeWeights[type] >= topWeight - ticketTypeThreshold);

    return sortedTypes;
}