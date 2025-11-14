import { LoadingSpinner } from "@/app/(frontend)/components/LoadingSpinner";
import Modal from "./Modal";

export default function Loading() {
    return (
        <Modal>
            <LoadingSpinner />
        </Modal>
    );
}
