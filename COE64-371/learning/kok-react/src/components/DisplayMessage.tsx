interface DisplayMessageProps {
    message?: string;
    style?: string;
}

export function DisplayMessage({ message, style }: DisplayMessageProps) {
    return (
        <>
            {message && message.length > 0 ? (
                <div className={`p-4 rounded-md shadow-md ${style ? style : "text-black"}`}>
                    <p className="text-lg">{message}</p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}