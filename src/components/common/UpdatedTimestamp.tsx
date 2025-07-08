import DateTime from "../../tdx-api/types/DateTime";
import React from "react";
import dateTimeToString from "../../utils/datetime/dateTimeToString";
import getDateTimeAgo from "../../utils/datetime/getDateTimeAgo";

export interface UpdatedTimestampProps {
    date: DateTime;
}

export default function UpdatedTimestamp(props: UpdatedTimestampProps) {
    const [timestamp, setTimestamp] = React.useState("");

    React.useEffect(() => {
        const updateTimestamp = () => setTimestamp(`${dateTimeToString(props.date)} · ${getDateTimeAgo(props.date)}`);
        updateTimestamp();
        const interval = setInterval(updateTimestamp, 1000);
        return () => clearInterval(interval);
    }, [props.date]);

    return <span>{timestamp}</span>;
}