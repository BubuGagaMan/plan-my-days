import { login, signUp } from "./authActions";

export default function DBTesting() {

    return (
        <>
            <h1>DB TESTING</h1>
            <form action={signUp} className="grid justify-center">
                Sign Up
                <label>
                    email: <input className="border border-white" type="email" name="email" />
                </label>
                <label>
                    password: <input className="border border-white" type="text" name="password" />
                </label>
                <button type="submit">Register</button>
            </form>
            <form action={login} className="grid justify-center">
                LOGIN
                <label >
                    email: <input className="border border-white" type="email" name="email" />
                </label>
                <label>
                    password: <input className="border border-white" type="text" name="password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    );
}
