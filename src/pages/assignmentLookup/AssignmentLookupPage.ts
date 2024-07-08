import PageScript from "../PageScript";
import waitFor from "../../utils/waitFor";
import { getAutoAssignment, setAutoAssignment } from "./autoAssignment";

const URL_PREFIX = "/TDNext/Apps/43/Shared/ApplicationAssignmentLookup";

export default class AssignmentLookupPage implements PageScript {
    canRun(): boolean {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run(): void {
        // Get the auto assignment
        const assignmentName = getAutoAssignment();

        // Clear the auto assignment
        setAutoAssignment(undefined);

        // Check if the ticket assignment is set
        if (!assignmentName)
            return;

        AssignmentLookupPage
            .assignTicket(assignmentName)
            .catch(console.error);
    }

    static async assignTicket(name: string) {
        console.log("Assigning ticket to: " + name);

        // Wait for the page to load
        await waitFor(100);

        // Filter by all users
        const allUsers = document.getElementById("ctl00_cphSearchRows_rbEmployeesBoth") as HTMLInputElement;
        allUsers.click();

        // Input the ticket assignment
        const searchInput = document.getElementById("ctl00_cphSearchRows_txtSearch") as HTMLInputElement;
        searchInput.value = name ?? "";

        // Click the search button
        const searchButton = document.getElementById("ctl00_btnSearch") as HTMLButtonElement;
        searchButton.click();

        // Wait for the search to complete
        await waitFor(1000);

        // Results Table
        const resultsDiv = document.getElementById("ctl00_upItems") as HTMLDivElement;
        const resultsRows = resultsDiv.querySelectorAll("tr");
        const filteredResults = Array.from(resultsRows).filter(row => row.textContent?.includes(name));

        // Check if there are any results
        if (filteredResults.length == 0)
            throw new Error("No results found");

        // Select the first
        const firstLink = filteredResults[0].querySelector("a");
        firstLink?.click();
    }
}