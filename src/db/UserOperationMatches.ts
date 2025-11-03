const UserOperationMatches = [

    // Tickets
    new RegExp(/Changed .* from <b>.*?<\/b> to <b>.*?<\/b>\.<br ?\/?>/g),
    new RegExp(/Changed Status from <b>.*?<\/b> to <b>.*?<\/b> and closed all remaining ticket tasks\.<br ?\/?>/g),
    new RegExp(/Changed .* from ".*?" to ".*?"\.<br ?\/?>/g),

    new RegExp(/Added \d+ (?:incident|service request) to this major incident\.<br ?\/?>/g), // Entire feed entry

    // Responsibility
    new RegExp(/Took primary responsibility for this (?:incident|service request|major incident)\.<br ?\/?>/g),
    new RegExp(/Took primary responsibility for this (?:incident|service request|major incident) from .*?\.<br ?\/?>/g),
    new RegExp(/Reassigned this (?:incident|service request|major incident) from .*? to .*?\.<br ?\/?>/g),

    // Lists
    new RegExp(/Added this (?:incident|service request) to ".*?" list\.<br ?\/?>/g),
    new RegExp(/Removed this (?:incident|service request) from ".*?" list\.<br ?\/?>/g),

    // Assets
    new RegExp(/(?:Added|Removed) the ".*?" asset (?:to|from) this (?:incident|service request)\.<br ?\/?>/g),

    new RegExp(/Added this asset to the ".*?" (?:incident|service request) \(ID: \d+\)\.<br ?\/?>/g),
    new RegExp(/Removed this asset from the ".*?" (?:incident|service request) \(ID: \d+\)\.<br ?\/?>/g),

    new RegExp(/Added \d+ assets\/CIs to this (?:incident|service request|major incident):.*$/g), // Entire feed entry

    new RegExp(/Removed .*? from this (?:incident|service request|asset)\.<br ?\/?>/g),

    new RegExp(/(?:Added|Removed) .* as a contact for this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Automatically completed as a result of the (?:incident|service request) being closed.<br ?\/?>/g),
    new RegExp(/(?:Added|Removed) the .*? template to this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/(?:Added|Removed) the attachment .*?\.<br ?\/?>/g),

    // Tasks
    new RegExp(/Edited this (?:incident|service request|task|major incident)\.<br ?\/?>/g),
    new RegExp(/Deleted the ".*?" task from this (?:incident|service request)\.<br ?\/?>/g),

    // Workflows
    new RegExp(/(?:Approved|Rejected) this (?:incident|service request) in the ".*?" workflow\.<br ?\/?>/g),
    new RegExp(/(?:Approved|Rejected) the ".*" step in the ".*?" workflow\.<br ?\/?>/g),
    new RegExp(/Selected ".*" for the ".*?" step in the ".*?" workflow\.<br ?\/?>/g),
    new RegExp(/Skipped the ".*?" step in the ".*?" workflow\.<br ?\/?>/g),
    new RegExp(/Re-sent notifications for the ".*?" step in the ".*?" workflow\.<br ?\/?>/g),
    new RegExp(/Restarted the ".*?" workflow for this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Assigned the ".*?" workflow to this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Removed the ".*?" workflow from this (?:incident|service request)\.<br ?\/?>/g),
];
export default UserOperationMatches;