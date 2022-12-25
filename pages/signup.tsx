import type { NextPage } from 'next';

const Signup: NextPage = () => {
    return (
        <form>
            <input type="name" />
            <input type="email" />
            <input type="password" />
            <input type="submit" />
        </form>
    )
}

export default Signup;
