import {ChildrenNode, Matcher, MatchResponse} from "interweave";
import openWindow from "./openWindow";
import ConfigurationItem from "../tdx-api/types/ConfigurationItem";
import React from "react";

// Retrieve serial numbers and asset tags from the configuration item
const SERIAL_REGEX = /^(.+) \(Tag (.+)\)$/g;

const MIN_NAME_LENGTH = 5; // Minimum length for serial numbers and asset tags to avoid matching on very short names

/**
 * Interweave matcher to inject links to assets/CIs in the feed.
 * Requires serial number or asset tags to be at least 5 characters long to avoid matching on
 * single-characters or very short names.
 *
 * Example usage:
 * ```jsx
 * <Interweave
 *      // ... other props
 *      matchers={[
 *          // ... other matchers
 *          new ConfigurationItemMatcher(configurationItem)
 *      ]}
 * />
 * ```
 */
export default class ConfigurationItemMatcher extends Matcher {
    configurationItem: ConfigurationItem;
    serialNumber?: string;
    assetTag?: string;

    constructor(configurationItem: ConfigurationItem) {
        super("configurationitem");
        this.configurationItem = configurationItem;

        // Parse the serial number and asset tag from the name
        SERIAL_REGEX.lastIndex = 0; // Reset regex index to ensure it matches from the start
        const match = SERIAL_REGEX.exec(this.configurationItem.Name);
        if (match) {
            this.serialNumber = match[1].trim();
            this.assetTag = match[2].trim();
        }
    }

    match(string: string): MatchResponse<{}> | null {

        // Search for the serial number in the string
        if (this.serialNumber) {
            const serialNumberIndex = string.indexOf(this.serialNumber);
            if (serialNumberIndex >= 0 && this.serialNumber.length >= MIN_NAME_LENGTH) {
                return {
                    index: serialNumberIndex,
                    length: this.serialNumber.length,
                    match: this.serialNumber,
                    valid: true
                }
            }
        }

        // Search for the asset tag in the string
        if (this.assetTag) {
            const assetTagIndex = string.indexOf(this.assetTag);
            if (assetTagIndex >= 0 && this.assetTag.length >= MIN_NAME_LENGTH) {
                return {
                    index: assetTagIndex,
                    length: this.assetTag.length,
                    match: this.assetTag,
                    valid: true
                }
            }
        }

        // No matches, abort
        return null;
    }

    replaceWith(_: ChildrenNode) {
        const {ID, Name} = this.configurationItem;
        const href = `/TDNext/Apps/Shared/CIDet.aspx?ID=${ID}`;

        const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            openWindow(href, Name, false);
        }

        return (
            <a
                key={ID}
                href={href}
                className={"configuration-item-link"}
                onClick={onClick}
                download={Name}
            >
                {this.assetTag}
            </a>
        )
    }

    asTag(): string {
        return "span";
    }
}