import CustomTemplate from "../types/CustomTemplate";

const DefaultCustomTemplates: CustomTemplate[] = [
    {
        id: 2,
        name: "Deletion Resolve",
        content: `
            <p>
            Hi there,<br>
            <br>
            It looks your Microsoft Authenticator is set up correctly and your IT Security Training is completed! No further action is required at this time and your email will not be deleted. Let us know if you have any questions!<br>
            <br>
            Thank you,<br>
            {{TechnicianFirstName}} ~ UW-Stout Technology Helpdesk
            </p>
            `
    },
    {
        id: 3,
        name: "Deletion MFA Reminder",
        content: `
            <p>
            Hi there,<br>
            <br>
            Just checking back in, it doesn't look like you have Microsoft Authenticator setup yet. A guide for this is available here: <a href="https://kb.uwstout.edu/135419" target="_blank" rel="noopener noreferrer">https://kb.uwstout.edu/135419</a>. This step must be completed <b>as soon as possible</b> in order to maintain your UW-Stout email. If you have any questions or need any help with the setup process, feel free to let us know!<br>
            <br>
            Thank you,<br>
            {{TechnicianFirstName}} ~ UW-Stout Technology Helpdesk
            </p>
            `
    },
    {
        id: 4,
        name: "Schedule",
        content: `
            <p>
            Hi there,<br>
            <br>
            Are there any time(s) you would be available for us to stop by and take a closer look?<br>
            <br>
            Thank you,<br>
            {{TechnicianFirstName}} ~ UW-Stout Technology Helpdesk
            </p>
            `
    },
    {
        id: 5,
        name: "Deletion No Training",
        content: `
        <p>
        Hi there,<br>
        <br>
        We understand that your account was disabled. Unfortunately, the security training campaign's extended deadline has past, and we disabled accounts that did not complete the required security training.<br>
        <br>
        If you have critical data that you need to retrieve from your account, we can enable access for 7 days to allow you time to forward emails and contacts to another account. Your account would then be disabled again after 7 days.<br>
        <br>
        Please let us know if this is something that you need.<br>
        <br>
        Thank you,<br>
        {{TechnicianFirstName}} ~ UW-Stout Technology Helpdesk
        </p>
        `
    }
];
export default DefaultCustomTemplates;