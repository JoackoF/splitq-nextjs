import { MdOutlineWarningAmber } from "react-icons/md"

function AlertWarning({ title, description, ...props }) {
    return (
        <div className="grid grid-cols-[max-content_1fr] items-start bg-yellow-bg-notification border border-yellow-border-notification rounded-md p-2">
            <MdOutlineWarningAmber size={32} />
            <div className="ml-3">
                <p className="font-bold">{title}</p>
                <p className="text-xs">{description}</p>
            </div>
        </div>
    )
}

export default AlertWarning