import DateTime from "../../tdx-api/types/DateTime";
import React from "react";
import dateToString from "../../utils/datetime/dateToString";
import getDateAgo from "../../utils/datetime/getDateAgo";

export interface UpdatedTimestampProps {
    date: DateTime;
}

export default function UpdatedTimestamp(props: UpdatedTimestampProps) {
    const [timestamp, setTimestamp] = React.useState("");

    React.useEffect(() => {
        const updateTimestamp = () => setTimestamp(`${dateToString(props.date)} · ${getDateAgo(props.date)}`);
        updateTimestamp();
        const interval = setInterval(updateTimestamp, 1000);
        return () => clearInterval(interval);
    }, [props.date]);

    return <span>{timestamp}</span>;
}