import {ChildrenNode, Matcher, MatchResponse} from "interweave";
import Attachment from "../tdx-api/types/Attachment";

export interface AttachmentMatch {
    attachment: Attachment;
}

// Require minimum attachment name length to avoid matching on very short names
const MIN_ATTACHMENT_LENGTH = 5;

/**
 * Interweave matcher to inject links to attachments in the feed.
 * Requires attachment names to be at least 5 characters long to avoid matching on
 * single-characters or very short names.
 *
 * Example usage:
 * ```jsx
 * <Interweave
 *      // ... other props
 *      matchers={[
 *          // ... other matchers
 *          new AttachmentsMatcher([ ...attachments ])
 *      ]}
 * />
 * ```
 */
export default class AttachmentsMatcher extends Matcher<AttachmentMatch> {
    attachments: Attachment[];

    constructor(attachments: Attachment[]) {
        super("attachments");
        this.attachments = attachments;
    }

    match(string: string): MatchResponse<AttachmentMatch> | null {
        // Iterate through the attachments
        for (const attachment of this.attachments) {

            // Check if the attachment name is long enough
            // Avoids potentially matching on short names like "a", "b", etc.
            if (attachment.Name.length < MIN_ATTACHMENT_LENGTH)
                continue;

            // Search for the attachment name in the string
            const index = string.indexOf(attachment.Name);

            if (index >= 0) {

                // Return the attachment
                return {
                    index: index,
                    length: attachment.Name.length,
                    match: attachment.Name,
                    valid: true,
                    attachment
                };
            }
        }

        // No matches, abort
        return null;
    }

    replaceWith(_: ChildrenNode, props: AttachmentMatch) {
        const {attachment} = props;

        attachment.AttachmentType
        return (
            <a
                key={attachment.ID}
                href={`/TDNext/Apps/Shared/FileOpen?AttachmentID=${attachment.ID}&ItemID=${attachment.ItemID}&IsInline=0&ItemComponent=${attachment.AttachmentType}`}
                download={attachment.Name}
                className={"attachment-link"}
            >
                {attachment.Name}
            </a>
        )
    }

    asTag(): string {
        return "span";
    }
}