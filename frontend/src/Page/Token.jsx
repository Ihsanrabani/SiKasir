import '../index.css'
import {useNavigate} from 'react-router-dom';

function Token() {

    const navigate = useNavigate()

    return (
        <>
            <div className='flex gap-4'>
                <button className='bg-red-500 text-white px-2 py-1' onClick={() => {navigate("/")}}>Token</button>
                <button className='bg-red-500 text-white px-2 py-1' onClick={() => {navigate("/add-order")}}>Add Order</button>
                <button className='bg-red-500 text-white px-2 py-1' onClick={() => {navigate("/add-product")}}>Add Product</button>
                <button className='bg-red-500 text-white px-2 py-1' onClick={() => {navigate("/list-product")}}>List Product</button>
                <button className='bg-red-500 text-white px-2 py-1' onClick={() => { navigate("/kitchen-display") }}>Kitchen Display</button>
            </div>
            <nav className='absolute bg-gray-200/75 backdrop-blur-xl py-2 flex justify-center w-full'>
                <img src="/image/SiKasir_LOGO.png" alt="" className='w-40 h-auto' />
            </nav>

            <section className='h-screen flex flex-col items-center justify-center text-center bg-[#fcfcfc]'>
                <div>
                    <h2 className='montserrat-bold text-3xl'>Selamat Datang Di</h2>
                    <h1 className='montserrat-bold text-5xl'><span className='text-SKSBLUE'>Si</span><span className='text-[#354657]'>Kasir</span></h1>
                </div>
                <div className='flex flex-col mt-3'>
                    <span className='text-gray-sh montserrat-medium'>Silahkan Masukkan Token <br /> Untuk Menggunakan Aplikasi</span>
                    <input id='token' type="text" placeholder='Token' className='bg-white border-SKSBLUE-1 p-2 mt-2' />
                    <button className='bg-SKSBLUE p-2 rounded-md mt-3 text-white montserrat-semibold'>Kirim</button>
                </div>
            </section>
        </>
    )
}

export default Token
