import '../index.css'

import { useNavigate } from 'react-router-dom';

function Navbar({ pageName }) {

    const navigate = useNavigate()

    return (
        <>
            <nav className='flex justify-between w-full bg-gray-200/75 backdrop-blur-xl py-3 px-4'>
                <div className='flex items-center gap-3'>
                    <img src="http://placehold.co/50x50" alt="" className='w-12 xl:w-14 rounded-md' />
                    <span className='montserrat-semibold xl:text-xl'>{pageName}</span>
                </div>

                <div className='flex items-center gap-7 text-[#676767] montserrat-regular'>
                    {/* <span className='montserrat-medium text-xs text-gray-sh '>Kamis, 25 Mar 2026  11:42</span> */}
                    <a href="" onClick={() => { navigate("/") }} className='hover:text-[#10B0A2] duration-200'>Add Order</a>
                    <a href="" onClick={() => { navigate("/add-product") }} className='hover:text-[#10B0A2] duration-200'>Add Product</a>
                    <a href="" onClick={() => { navigate("/list-product") }} className='hover:text-[#10B0A2] duration-200'>List Product</a>
                    <a href="" onClick={() => { navigate("/kitchen-display") }} className='hover:text-[#10B0A2] duration-200'>Kitchen Display</a>
                </div>
            </nav>
        </>
    )
}

export default Navbar
