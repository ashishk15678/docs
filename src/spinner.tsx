import "./spinner.css"
export default function Spinner() {
    return (
        <div className="loading w-full h-screen flex items-center justify-center absolute top-0 left-0">
            <div className="🤚">
                <div className="👉"></div>
                <div className="👉"></div>
                <div className="👉"></div>
                <div className="👉"></div>
                <div className="🌴"></div>
                <div className="👍"></div>
            </div>
        </div>

    )
}