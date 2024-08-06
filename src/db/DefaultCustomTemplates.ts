import CustomTemplate from "../types/CustomTemplate";

const DefaultCustomTemplates: CustomTemplate[] = [
    {
        id: 2,
        name: "Deletion Resolve",
        content: `
            <p>Hi there,<br>
            <br>
            It looks your Microsoft Authenticator is setup correctly and your IT Security Training is completed! No further action is required at this time and your email will not be deleted. Let us know if you have any questions!<br>
            <br>
            Thank you,<br>
            {{TechnicianFirstName}} ~ UW-Stout Technology Helpdesk</p>
            `
    },
    {
        id: 3,
        name: "Deletion MFA Reminder",
        content: `
            <p>Hi there,<br>
            <br>
            Just checking back in, it doesn't look like you have Microsoft Authenticator setup yet. A guide for this is available here: <a href="https://kb.uwstout.edu/135419" target="_blank" rel="noopener noreferrer">https://kb.uwstout.edu/135419</a>. This step must be completed <b>as soon as possible</b> in order to maintain your UW-Stout email. If you have any questions or need any help with the setup process, feel free to let us know!<br>
            <br>
            Thank you,<br>
            {{TechnicianFirstName}} ~ UW-Stout Technology Helpdesk</p>
            `
    }
];
export default DefaultCustomTemplates;