import '../index.css';
import { animate, easeIn, easeInOut, easeOut, motion, scale, spring } from "motion/react";
import { useState, useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toRupiah, convertToWords } from 'to-rupiah';
import { ToastContainer, toast, Bounce } from 'react-toastify';

// COMPONENTS
import Navbar from '../components/Navbar';
import BottomSheet from '../components/BottomSheet';

function AddOrder() {

    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState("Semua");
    const [activeMeja, setActiveMeja] = useState('1A');
    const [PPN, setPPN] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [items, setItems] = useState([]);
    const navigate = useNavigate()
    const meja = ['1A', '2A', '3A', '4A', '5A', '6A', '1B', '2B', '3B', '4B', '5B', '6B'];

    const successNotify = (text) =>
        toast.success(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
    });

    const errorNotify = (text) =>
        toast.error(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
            setProducts(response.data)
        } catch (error) {
            console.log("LAPOR OWNER WEBSITE!: " + error)
        } finally {
            setIsLoading(false)
        }
    }

    const getProductByJenis = async (jenis) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/jenis/${jenis}`);
            console.log(response.data)
            setProducts(response.data)
        } catch (error) {
            console.log("LAPOR OWNER WEBSITE!: " + error)
        } finally {
            setIsLoading(false)
        }
    }

    const addItems = (data) => {
        setItems(prev => {
            const existingItem = prev.find(item => item.id === data.id);

            if (existingItem) {
                return prev.map(item =>
                    item.id === data.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: data.id,
                    image: data.image,
                    nama: data.nama,
                    jenis: data.jenis,
                    harga: data.harga,
                    qty: 1
                }
            ];
        });

        console.log("Item berhasil ditambahkan");
    }

    const increaseQty = (id) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        );
    }

    const decreaseQty = (id) => {
        setItems(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0)
        );
    }

    const deleteAllItems = () => {
        setItems([]);
        console.log("Semua Item Berhasil Dihapus!")
    }

    const sendToKitchen = async () => {
        if (items.length == 0) {
            errorNotify("Order Kosong!")
            setOpen(false)
            return
        }

        const orderItemsData = {
            orderItems: items.map(data => ({
                product_id: data.id,
                nama: data.nama,
                harga: data.harga,
                qty: data.qty
            }))
        }

        try {
            successNotify("Order Berhasil Dibuat!")
            setOpen(false)
            setIsLoading(true)
            await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
                table_number: activeMeja,
                orderItems: orderItemsData.orderItems
            });

            setItems([]);   
        }
        catch (error) {
            errorNotify("Order Tidak Berhasil Dibuat!")
            console.log("cihy" + error)
        } finally {
            setIsLoading(false)
        }
        
    }

    const priceAmount = () => {
        const total = items.reduce((sum, item) => {
            const price = item.harga * item.qty
            return sum + price
        }, 0)
        setSubTotal(total)
    }

    useEffect(() => {
        priceAmount()
    }, [items])

    useEffect(() => {
        const PPN = subTotal * 0.11

        setTotal(PPN + subTotal)
        setPPN(PPN)
    }, [subTotal])

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <> 
            <div className='relative'>
                <ToastContainer />
                {isLoading && (
                    <div className='bg-black/20 absolute w-full h-screen z-50 flex justify-center items-center'>
                        <img src="/image/loading.gif" alt="" className='w-12' />
                    </div>
                )}
                <Navbar pageName={"Order Baru"} />

                <div className='p-3 xl:flex xl:gap-7'>

                    <div className='xl:w-9/12'>
                    
                        {/* TOOLBAR */}
                        <section className=''>
                            {/* NO MEJA */}
                            <div className='flex flex-col gap-2'>
                                <div>
                                    <span className='montserrat-medium '>No Meja</span>
                                </div>
                                <div className='flex flex-wrap gap-1'>
                                    {meja.map((meja) => (
                                    <div
                                            key={meja}
                                            onClick={() => {
                                                setActiveMeja(meja)
                                                
                                            }}
                                            className={`duration-200 border border-[#10B0A2] rounded-md px-5 py-0.5 cursor-pointer
                                        ${activeMeja === meja
                                                    ? 'bg-SKSBLUE text-white'
                                                    : 'bg-white text-black'
                                                }`}
                                        >
                                            <span className='text-sm montserrat-medium'>{meja}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* DIVIDER */}
                            <div className='h-0.5 w-12 bg-gray-sh my-3'></div>

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
                                    className={`border border-[#10B0A2] rounded-md px-8 py-1.5  cursor-pointer
                            ${active === "Semua" ? "bg-SKSBLUE text-white" : "bg-white text-black"}`}
                                >
                                    <span className='text-sm montserrat-medium'>Semua</span>
                                </div>

                                <div
                                    onClick={() => {
                                        setActive("Makanan");
                                        getProductByJenis("Makanan");
                                    }}
                                    className={`border border-[#10B0A2] rounded-md px-8 py-1.5  cursor-pointer
                            ${active === "Makanan" ? "bg-SKSBLUE text-white" : "bg-white text-black"}`}
                                >
                                    <span className='text-sm montserrat-medium'>Makanan</span>
                                </div>

                                <div
                                    onClick={() => {
                                        setActive("Minuman");
                                        getProductByJenis("Minuman");
                                    }}
                                    className={`border border-[#10B0A2] rounded-md px-8 py-1.5  cursor-pointer
                            ${active === "Minuman" ? "bg-SKSBLUE text-white" : "bg-white text-black"}`}
                                >
                                    <span className='text-sm montserrat-medium'>Minuman</span>
                                </div>

                                <div
                                    onClick={() => {
                                        setActive("Snack");
                                        getProductByJenis("Snack");
                                    }}
                                    className={`border border-[#10B0A2] rounded-md px-8 py-1.5  cursor-pointer
                            ${active === "Snack" ? "bg-SKSBLUE text-white" : "bg-white text-black"}`}
                                >
                                    <span className='text-sm montserrat-medium'>Snack</span>
                                </div>
                            </div>
                        </section>

                        {/* MENU */}
                        <section className='bg-white border-SKSBLUE--5 mt-5'>
                            <div className='flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-3 p-3'>

                                {products.length === 0 ? (
                                    <p className="text-center text-gray-500">Produk belum tersedia</p>
                                ) : (

                                    products.map((product) => (
                                        <div onClick={() => {addItems(product)}} key={product.id} className='flex flex-col border border-[#10B0A2] w-40 rounded-t-md'>
                                            <div className='flex justify-center p-2'>
                                                <img src={product.image} alt="" className='w-36' />
                                            </div>
                                            <div className='flex flex-col border border-[#10B0A2] border-x-0 border-b-0 p-1 '>
                                                <span className='montserrat-medium text-sm'>{product.nama}</span>
                                                <span className='montserrat-medium text-xs text-gray-sh'>{toRupiah(product.harga, { floatingPoint: 0 })}</span>
                                            </div>
                                        </div>
                                    ))

                                )}

                            </div>
                        </section>
                    </div>

                    <div className='hidden xl:flex w-3/12 h-[720px]'>
                        <section className='bg-white border-SKSBLUE-1 w-full p-4 '>
                            {/* HEADLINE - XL */}
                            <div className='flex justify-between '>
                                <span className='montserrat-semibold text-md2'>Keranjang</span>
                                <span className='montserrat-medium text-sm bg-[#10B0A2] text-white py-1 px-2 rounded-md'>Meja {activeMeja}</span>
                            </div>

                            {/* ORDER LIST - XL */}
                            <div className='mt-5 w-full max-h-[400px] overflow-y-scroll'>

                                {items.map((items) => (
                                    <div key={items.id} className='flex w-full justify-between border border-x-0 border-t-0 border-b-2 border-[#7A7A7A]/25 py-2'>
                                        <div className='flex'>
                                            <img src={items.image} alt="" className='w-14 xl:w-10' />
                                            <div className='ml-3 flex flex-col justify-center items-start'>
                                                <span className='montserrat-semibold xl:text-sm'>{items.nama}</span>
                                                <span className='montserrat-medium text-sm xl:text-xs text-[#818181]'>{toRupiah(items.harga, { floatingPoint: 0 })}</span>
                                            </div>
                                        </div>
                                        <div className='flex gap-3 items-center '>
                                            <button onClick={() => {decreaseQty(items.id)}} className='border border-[#10B0A2] flex justify-center items-center border-2 rounded-md montserrat-semibold text-md2 w-6 h-6'>-</button>
                                            <span className='montserrat-medium text-sm'>{items.qty}</span>
                                            <button onClick={() => {increaseQty(items.id)}} className='border border-[#10B0A2] flex justify-center items-center border-2 rounded-md montserrat-semibold text-md2 w-6 h-6'>+</button>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* PRICE DETAILS - XL */}
                            <div className='w-full mt-10'>
                                <div className='h-0.5 w-full bg-black/10 my-2'></div>
                                <div className='flex items-center justify-between'>
                                    <span className='montserrat-semibold text-[#696969]'>Subtotal</span>
                                    <span className='montserrat-semibold text-[#696969]'>{toRupiah(subTotal, { floatingPoint: 0 })}</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='montserrat-medium text-[#A7A7A7] text-sm'>PPN 11%</span>
                                    <span className='montserrat-medium text-[#A7A7A7] text-sm'>{toRupiah(PPN, { floatingPoint: 0 })}</span>
                                </div>
                                <div className='h-0.5 w-full bg-black/10 my-2'></div>
                                <div className='flex items-center justify-between'>
                                    <span className='montserrat-semibold text-xl'>Total</span>
                                    <span className='montserrat-semibold'>{toRupiah(total, { floatingPoint: 0 })}</span>
                                </div>
                            </div>

                            {/* BUTTON AREA - XL */}
                            <div className='w-full mt-2 flex flex-col gap-3'>
                                <button onClick={() => { sendToKitchen() }} className='border-SKSBLUE--5 py-2 montserrat-semibold'>Kirim Ke Dapur</button>
                                <button onClick={() => { deleteAllItems() }} className='bg-red-500 rounded-md text-white py-2 montserrat-semibold '>Bersihkan Keranjang</button>
                            </div>
                        </section>
                    </div>

                </div>


                <BottomSheet open={open} setOpen={setOpen}>
                    {/* HEADLINE */}
                    <div className='flex justify-between items-center mt-3 w-full'>
                        <span className='montserrat-semibold text-md2'>Keranjang</span>
                        <span className='bg-SKSBLUE text-white px-2 py-1.5 rounded-md montserrat-medium text-xs'>Meja {activeMeja}</span>
                    </div>

                    {/* ORDER LIST */}
                    <div className='mt-5 w-full overflow-y-scroll max-h-96 mb-7'>
                    
                    {items.map((items) => (
                        <div key={items.id} className='flex w-full justify-between border border-x-0 border-t-0 border-b-2 border-black/10 py-2'>
                            <div className='flex'>
                                <img src={items.image} alt="" className='w-14' />
                                <div className='ml-3 flex flex-col justify-center items-start'>
                                    <span className='montserrat-semibold'>{items.nama}</span>
                                    <span className='montserrat-medium text-sm text-[#818181]'>{toRupiah(items.harga, {floatingPoint: 0})}</span>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center '>
                                <button onClick={() => { decreaseQty(items.id) }} className='border border-[#10B0A2] border-2 rounded-md montserrat-semibold text-md2 w-8 h-8'>-</button>
                                <span className='montserrat-medium text-md2'>{items.qty}</span>
                                <button onClick={() => { increaseQty(items.id) }} className='border border-[#10B0A2] border-2 rounded-md montserrat-semibold text-md2 w-8 h-8'>+</button>
                            </div>
                        </div>
                    ))}

                    </div>

                    {/* PRICE DETAILS */}
                    <div className='w-full mt-auto'>
                        <div className='h-0.5 w-full bg-black/10 my-2'></div>
                        <div className='flex items-center justify-between'>
                            <span className='montserrat-semibold text-[#696969] text-md2'>Subtotal</span>
                            <span className='montserrat-semibold text-[#696969] text-md2'>{toRupiah(subTotal, { floatingPoint: 0 })}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='montserrat-medium text-[#A7A7A7] text-sm'>PPN 11%</span>
                            <span className='montserrat-medium text-[#A7A7A7] text-sm'>{toRupiah(PPN, { floatingPoint: 0 })}</span>
                        </div>
                        <div className='h-0.5 w-full bg-black/10 my-2'></div>
                        <div className='flex items-center justify-between'>
                            <span className='montserrat-semibold text-xl'>Total</span>
                            <span className='montserrat-semibold text-md2'>{toRupiah(total, { floatingPoint: 0 })}</span>
                        </div>
                    </div>

                    {/* BUTTON AREA */}
                    <div className='w-full mt-6 flex flex-col gap-4'>
                        <button onClick={() => {sendToKitchen()}} className='border-SKSBLUE--5 py-2 montserrat-semibold '>Kirim Ke Dapur</button>
                        <button onClick={() => {deleteAllItems()}} className='bg-red-500 rounded-md text-white py-2 montserrat-semibold '>Bersihkan Keranjang</button>
                    </div>
                </BottomSheet>

                {/* KERANJANG BAR */}

                {items.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{duration: 0.5, type: spring}}
                        className='xl:hidden fixed bottom-4 left-0 right-0 px-4'
                    >
                        <div onClick={() => {setOpen(true)}} className='bg-SKSBLUE flex rounded-md py-4 px-3 text-white justify-between'>
                            <div className='flex gap-3 items-center'>
                                <span className='montserrat-semibold'>{items.length} Items</span>
                                <span className='montserrat-medium text-sm underline' onClick={() => {setOpen(true)}}>Lihat Keranjang</span>
                            </div>

                            <div>
                                <span className='montserrat-semibold'>{toRupiah(total, { floatingPoint: 0 })}</span>
                            </div>
                        </div>
                    </motion.div>
                )}


            </div>
        </>
    )
}

export default AddOrder
