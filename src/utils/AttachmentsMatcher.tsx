import {ChildrenNode, Matcher, MatchResponse} from "interweave";
import Attachment from "../tdx-api/types/Attachment";
import openWindow from "./openWindow";
import React from "react";

// Require minimum name length to avoid matching on very short names
const MIN_NAME_LENGTH = 5;

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
export default class AttachmentsMatcher extends Matcher {
    attachment: Attachment;

    constructor(attachments: Attachment) {
        super("attachments");
        this.attachment = attachments;
    }

    match(string: string): MatchResponse<{}> | null {
        const attachment = this.attachment;

        // Check if the attachment name is long enough
        // Avoids potentially matching on short names like "a", "b", etc.
        if (attachment.Name.length < MIN_NAME_LENGTH)
            return null;

        // Search for the attachment name in the string
        const index = string.indexOf(attachment.Name);

        if (index >= 0) {

            // Return the attachment
            return {
                index: index,
                length: attachment.Name.length,
                match: attachment.Name,
                valid: true
            };
        }

        // No matches, abort
        return null;
    }

    replaceWith(_: ChildrenNode) {
        const attachment = this.attachment;
        const href = `/TDNext/Apps/Shared/FileOpen?AttachmentID=${attachment.ID}&ItemID=${attachment.ItemID}&IsInline=-1&ItemComponent=${attachment.AttachmentType}`;

        const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            openWindow(href, attachment.Name, false);
        }

        return (
            <a
                key={attachment.ID}
                href={href}
                className={"attachment-link"}
                onClick={onClick}
                download={attachment.Name}
            >
                {attachment.Name}
            </a>
        )
    }

    asTag(): string {
        return "span";
    }
}