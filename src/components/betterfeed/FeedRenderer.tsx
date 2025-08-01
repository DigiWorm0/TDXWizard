import AttachmentsMatcher from "../../utils/AttachmentsMatcher";
import ConfigurationItemMatcher from "../../utils/ConfigurationItemMatcher";
import {Interweave, MatcherInterface} from "interweave";
import useTicket from "../../hooks/useTicket";
import useTicketAssets from "../../hooks/useTicketAssets";
import useSettings from "../../hooks/useSettings";
import React from "react";

export interface FeedRendererProps {
    body: string;
}

export default function FeedRenderer(props: FeedRendererProps) {
    const ticket = useTicket();
    const ticketAssets = useTicketAssets();
    const [settings] = useSettings();

    const matchers = React.useMemo(() => {
        let matchers: MatcherInterface[] = [];

        // Attachments matcher
        if (settings.linkifyAttachments && ticket?.Attachments)
            matchers.push(...ticket.Attachments.map(attachment => new AttachmentsMatcher(attachment)));

        // Assets matcher
        if (settings.linkifyAssets && ticketAssets)
            matchers.push(...ticketAssets.map(asset => new ConfigurationItemMatcher(asset)));

        return matchers;
    }, [ticket, ticketAssets, settings]);

    return (
        <Interweave
            content={props.body}
            matchers={matchers}
        />
    )
}