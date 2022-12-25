import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import Layout from '../../components/Layout';

const Cpy: NextPage = () => {
    const router: NextRouter = useRouter();
    const { type } = router.query;

    return <Layout type={type}>
        <p>Type: {type}</p>
    </Layout>
}

export default Cpy;
