import Link from 'next/link'
import { AiOutlineFieldNumber } from 'react-icons/ai'
import { RiDoubleQuotesL, RiKey2Fill } from 'react-icons/ri'
import { IoLink, IoSettingsSharp } from 'react-icons/io5'
import { FaMoneyBill } from 'react-icons/fa'
import { MdLogout, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

const Sidebar = () => {
    return (
        <div className="p-2 top-0 sticky">
            <div className="rounded-full p-2 bg-neutral-200">
                <Link className="sidebar-item" href="/c">c</Link>
                <div className='divider' />
                <div>
                    <Link className='sidebar-item' href="/c/int">
                        <AiOutlineFieldNumber size={24} className="icon" />
                    </Link>
                    <Link className='sidebar-item' href="/c/str">
                        <RiDoubleQuotesL size={22} className="icon" />
                    </Link>
                    <Link className='sidebar-item' href="/c/lnk">
                        <IoLink size={22} className="icon" />
                    </Link>
                    <Link className='sidebar-item' href="/c/cur">
                        <FaMoneyBill size={20} className="icon" />
                    </Link>
                    <Link className='sidebar-item' href="/c/pwd">
                        <RiKey2Fill size={22} className="icon" />
                    </Link>
                </div>
                <div className='divider' />
                <div>
                    <Link className='sidebar-item' href="/c">
                        <IoSettingsSharp size={20} className="icon" />
                    </Link>
                    <Link className='sidebar-item' href="/c">
                        {
                            true ? <MdOutlineDarkMode size={22} className="icon" />
                            : <MdOutlineLightMode size={22} className="icon" />
                        }
                    </Link>
                    <Link className='sidebar-item' href="/c">
                        <MdLogout size={20} className="icon" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
