import type { NextPage } from 'next';

const Login: NextPage = () => {
    return (
        <form>
            <input type="email" />
            <input type="password" />
            <input type="submit" />
        </form>
    )
}

export default Login;
