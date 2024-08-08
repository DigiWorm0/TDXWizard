export interface SettingsHeaderProps {
    title: string;
}

export default function SettingsHeader(props: SettingsHeaderProps) {
    return (
        <>
            <h4
                style={{
                    marginBottom: 0,
                    marginTop: 14
                }}
            >
                {props.title}
            </h4>
            <hr
                style={{margin: 0}}
            />
        </>
    );
}