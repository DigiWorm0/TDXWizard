import CustomTemplate from "../types/CustomTemplate";

const DefaultCustomTemplates: CustomTemplate[] = [
    {
        id: 2,
        name: "Example Template",
        content: `
            <p>
            Hi {{RequestorFirstName}},<br>
            <br>
            This is an example template to show you how to use the custom templates. <br>
            You can type your own message here and select "Add Template" to save it. <br>
            Shift+Click on the template name to delete it. <br>
            By using [[RequestorFirstName]] (but use '{' instead of '['), I can insert the name of the ticket requestor.<br>
            <br>
            Thank you,<br>
            UW-Stout Technology Helpdesk
            </p>
            `
    }
];
export default DefaultCustomTemplates;