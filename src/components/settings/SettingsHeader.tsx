import React from "react";

export interface SettingsHeaderProps {
    children?: React.ReactNode;
}

export default function SettingsHeader(props: SettingsHeaderProps) {
    return (
        <>
            <h5
                style={{
                    marginBottom: 0,
                    marginTop: 14,
                    fontFamily: "\"DM Sans\",sans-serif",
                    fontWeight: "bold",
                }}
            >
                {props.children}
            </h5>
            <hr
                style={{margin: 0, marginBottom: 5}}
            />
        </>
    );
}