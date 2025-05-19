export interface SettingsHeaderProps {
    title: string;
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
                {props.title}
            </h5>
            <hr
                style={{margin: 0, marginBottom: 5}}
            />
        </>
    );
}