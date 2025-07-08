import {UWStoutTypeAssignments, UWStoutTypeKeywords} from "../../db/UWStoutTypeMatches";
import getSettings from "../getSettings";
import Ticket from "../../tdx-api/types/Ticket";

/**
 * Suggests potential ticket types based on ticket title, description, and assignment.
 * Uses a weighted keyword system to determine the most relevant types.
 * @param ticketInfo - The ticket information object containing Title, Description, and ResponsibleGroupName.
 * @return An array of suggested ticket type IDs, sorted by relevance.
 */
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
    for (const _type in UWStoutTypeKeywords) {
        const type = parseInt(_type);
        const keywords = UWStoutTypeKeywords[type];

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

    // Iterate each group
    for (const _group in UWStoutTypeAssignments) {
        const group = parseInt(_group);
        const groupNames = UWStoutTypeAssignments[group];

        // Iterate each group name
        for (const groupName in groupNames) {
            const weight = groupNames[groupName];

            // Check if the group name is in the responsible group name
            if (ResponsibleGroupName.toLowerCase().includes(groupName))
                addWeightToType(group, weight);
        }
    }

    // Sort the types by weight
    let sortedTypes = Object.keys(typeWeights)
        .map(type => parseInt(type))
        .sort((a, b) => typeWeights[b] - typeWeights[a]);

    // Get Threshold
    const {ticketTypeThreshold} = getSettings();

    // Get the top weighted type
    const topWeight = typeWeights[sortedTypes[0]];

    // Remove types that have no weight
    sortedTypes = sortedTypes.filter(type => typeWeights[type] > 0);

    // Remove types with a weight too much lower than the top type
    sortedTypes = sortedTypes.filter(type => typeWeights[type] >= topWeight - ticketTypeThreshold);

    return sortedTypes;
}