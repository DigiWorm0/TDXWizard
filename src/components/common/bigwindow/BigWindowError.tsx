export interface BigWindowErrorProps {
    error: string | null | undefined;
    onClear?: () => void;
}

export default function BigWindowError(props: BigWindowErrorProps) {
    if (!props.error ||
        props.error.length === 0)
        return null;

    return (
        <div
            className={"alert alert-danger alert-dismissible fade show"}
            style={{marginTop: 5}}
        >

            {props.error.split("\n").map((line, i) => (
                <span key={i}>
                                {line}<br/>
                            </span>
            ))}

            {props.onClear && (
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => props.onClear?.()}
                />
            )}
        </div>
    )
}