import CILink from "../../common/TDX/CILink";
import React from "react";

export interface TicketAssetPanelRowProps {
    id: number;
    name: string;
}

const TicketAssetPanelRow = React.memo((props: TicketAssetPanelRowProps) => {
    return (
        <tr>
            <td>
                <CILink id={props.id}>
                    {props.id}
                </CILink>
            </td>
            <td>
                {props.name}
            </td>
        </tr>
    )
});
export default TicketAssetPanelRow;