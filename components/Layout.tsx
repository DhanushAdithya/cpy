import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
    type?: string
    children: JSX.Element
}

const Layout = (props: Props) => {
    return (
        <div className="flex items-start justify-center">
            <div className="w-[720px] p-6">
                <Header type={props.type} />
                {props.children}
            </div>
            <Sidebar />
        </div>
    )
}

export default Layout
