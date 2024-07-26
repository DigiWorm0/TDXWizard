import dateToString from "../../utils/datetime/dateToString";
import getDateAgo from "../../utils/datetime/getDateAgo";
import DateTime from "../../tdx-api/types/DateTime";

export interface TicketFeedEventProps {
    name: string,
    date: DateTime,
    body: string
}

export default function TicketFeedEvent(props: TicketFeedEventProps) {
    return (
        <div
            title={dateToString(props.date) + " · " + getDateAgo(props.date)}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                color: "#aaa",
                padding: 5
            }}
        >
            <h5 style={{fontWeight: "bold", margin: "0px 5px", whiteSpace: "nowrap"}}>
                <span className={"fa fa-solid fa-nopad fa-wrench"} style={{marginRight: 7}}/>
                <span>
                    {props.name}:
                </span>
            </h5>
            <p
                style={{margin: 0}}
                dangerouslySetInnerHTML={{__html: props.body}}
            />
        </div>
    )
}