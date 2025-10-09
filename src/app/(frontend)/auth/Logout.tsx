import { logout } from "./authActions";

export default function Logout() {
    return (
        <form action={logout} className="border border-white">
            <button>Logout</button>
        </form>
    );
}
