import { logout } from "./authActions";

export default function Logout() {
    return (
        <form action={logout} >
            <button
                type="submit"
                className="bg-red-600 
                hover:bg-red-700 transition-colors px-4 py-1.5 
                rounded-lg text-white font-medium shadow-md border border-red-700 
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-neutral-800
                text-xs sm:text-base"
            >
                Logout
            </button>
        </form>
    );
}
