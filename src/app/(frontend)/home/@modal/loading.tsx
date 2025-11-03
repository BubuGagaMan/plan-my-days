import { LoadingSpinner } from "@/app/(frontend)/home/components/LoadingSpinner";
import Modal from "./Modal";

export default function Loading() {
    return (
        <Modal>
            <LoadingSpinner />
        </Modal>
    );
}
