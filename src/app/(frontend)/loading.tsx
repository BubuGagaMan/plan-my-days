import { LoadingSpinner } from "./components/LoadingSpinner"

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <LoadingSpinner />
        </div>
    )
}