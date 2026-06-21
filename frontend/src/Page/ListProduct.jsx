import '../index.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import Navbar from '../components/Navbar';


function ListProduct() {

    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState("Semua");
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
            setProducts(response.data)
        } catch (error) {
            console.log("LAPOR OWNER WEBSITE!: " + error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
            alert("Produk Berhasil Dihapus")
        } catch (error) {
            console.log("LAPOR OWNER WEBSITE!: "+error)   
        }
    }

    const getProductByJenis = async (jenis) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/jenis/${jenis}`);
            console.log(response.data)
            setProducts(response.data)
        } catch (error) {
            console.log("LAPOR OWNER WEBSITE!: " + error)
        }
    }

    const redirectAP = () => {
        navigate("/add-product")
    }

    return (
        <>
            {isLoading && (
                <div className='bg-black/20 absolute w-full h-screen z-50 flex justify-center items-center'>
                    <img src="/image/loading.gif" alt="" className='w-12' />
                </div>
            )}
            <Navbar pageName={"Daftar Produk"}/>

            <div className='p-2'>
                {/* TOOLBAR */}
                <section className=''> 
                    {/* SEARCH BAR */}
                    <div className='w-full'>
                        <input id='search_menu' placeholder='Cari menu...' type="text" className='border-SKSBLUE--5 w-full py-2.5 px-2 montserrat-medium text-sm text-[#CCCCC]' />
                    </div>

                    {/* FILTER */}
                    <div className='flex gap-2 mt-5 overflow-x-scroll'>
                        <div
                            onClick={() => {
                                setActive("Semua");
                                getProducts();
                            }}
                            className={`border border-[#10B0A2] rounded-md px-8 py-1.5 cursor-pointer
                            ${active === "Semua" ? "bg-SKSBLUE text-white" : "bg-white text-black"}`}
                        >
                            <span className='text-sm montserrat-medium'>Semua</span>
                        </div>

                        <div
                            onClick={() => {
                                setActive("Makanan");
                                getProductByJenis("Makanan");
                            }}
                            className={`border border-[#10B0A2] rounded-md px-8 py-1.5 cursor-pointer
                            ${active === "Makanan" ? "bg-SKSBLUE text-white" : "bg-white text-black"}`}
                        >
                            <span className='text-sm montserrat-medium'>Makanan</span>
                        </div>

                        <div
                            onClick={() => {
                                setActive("Minuman");
                                getProductByJenis("Minuman");
                            }}
                            className={`border border-[#10B0A2] rounded-md px-8 py-1.5 cursor-pointer
                            ${active === "Minuman" ? "bg-SKSBLUE text-white" : "bg-white text-black"}`}
                        >
                            <span className='text-sm montserrat-medium'>Minuman</span>
                        </div>

                        <div
                            onClick={() => {
                                setActive("Snack");
                                getProductByJenis("Snack");
                            }}
                            className={`border border-[#10B0A2] rounded-md px-8 py-1.5 cursor-pointer
                            ${active === "Snack" ? "bg-SKSBLUE text-white" : "bg-white text-black"}`}
                        >
                            <span className='text-sm montserrat-medium'>Snack</span>
                        </div>
                    </div>
                </section>


                {/* MENU */}
                <section className='bg-white border-SKSBLUE--5 mt-5'>
                    <div className='flex flex-wrap justify-center md:justify-start items-center gap-2 p-5'>
                    
                        {products.length === 0 ? (
                            <p className="text-center text-gray-500">Produk belum tersedia</p>
                        ) : (
                            
                            products.map((product) => (
                                <div key={product.id} className='flex flex-col border border-[#10B0A2] w-40 rounded-t-md'>
                                    <div className='flex justify-center p-2'>
                                        <img src={product.image} alt="" className='w-36' />
                                    </div>
                                    <div className='flex flex-col border border-[#10B0A2] border-x-0 border-b-0 p-1 '>
                                        <span className='montserrat-medium text-sm'>{product.nama}</span>
                                        <span className='montserrat-medium text-xs text-gray-sh'>Rp {product.harga}</span>
                                    </div>
                                    <div className='p-2'>
                                        <button className='w-full text-white bg-red-500 p-1 rounded-md' onClick={() => {deleteProduct(product.id)}}>HAPUS PRODUK</button>
                                    </div>
                                </div>
                            ))
                            
                        )}

                    </div>
                </section>
            </div>

            {/* ADD PRODUCT */}
            <div onClick={redirectAP} className='fixed flex justify-center items-center w-16 h-16 bottom-5 right-5 bg-SKSBLUE rounded-full'>
                <img src="../image/plus_ic.png" alt="" className='w-7' />
            </div>
        </>
    )
}

export default ListProduct
