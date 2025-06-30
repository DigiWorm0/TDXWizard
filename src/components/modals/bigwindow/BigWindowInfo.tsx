import React from "react";

export interface BigWindowInfoProps {
    children?: React.ReactNode;
}

export default function BigWindowInfo(props: BigWindowInfoProps) {
    const [isAlertVisible, setIsAlertVisible] = React.useState(true);

    if (!isAlertVisible)
        return null;
    return (
        <div
            className={"alert alert-primary alert-dismissible fade show mt-3 mb-0 d-flex align-items-center"}
        >
            <span className={"fa fa-info-circle me-2 fa-lg"}/>
            <div>
                {props.children}
            </div>
            <button
                type={"button"}
                className={"btn-close"}
                onClick={() => setIsAlertVisible(false)}
            />
        </div>

    )
}