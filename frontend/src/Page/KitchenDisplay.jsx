import '../index.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function KitchenDisplay() {

    const [orderDatas, setOrderDatas] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

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

    const getOrders = async () => {
        try {
            const datas = await axios.get('http://localhost:5555/order')
            setOrderDatas(datas.data)
        } catch (error) {
            console.log(error)
        }
    }

    const orderComplete = async (id) => {
        try {
            setIsLoading(true)
            successNotify("Order Selesai!")
            await axios.delete(`http://localhost:5555/order/${id}`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const groupedItems = orderDatas
        .flatMap(order => order.Order_items)
        .reduce((acc, item) => {
            const existingItem = acc.find(i => i.nama === item.nama)

            if (existingItem) {
                existingItem.qty += item.qty
            } else {
                acc.push({
                    nama: item.nama,
                    qty: item.qty
                })
            }

            return acc
    }, [])

    useEffect(() => {
        if (orderDatas.length == 0) {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
        }
    }, [orderDatas])

    useEffect(() => {
        getOrders()

        const interval = setInterval(getOrders, 5000)

        return () => clearInterval(interval)
    }, [orderDatas])
    

    return (
        <>
            <ToastContainer />
            {isLoading && (
                <div className='bg-black/20 absolute w-full h-full z-50 flex justify-center items-center'>
                    <img src="/image/loading.gif" alt="" className='w-12'/>
                </div>
            )}
            <Navbar pageName={"Display Dapur"}/>

            <section>
                <div className='bg-[#E7E7E7] m-6 rounded p-3'>
                    <ul className='montserrat-semibold grid grid-rows-3 grid-flow-col'>
                        
                        {isEmpty && (
                            <span className='text-xl xl:text-2xl text-center montserrat-bold text-gray-sh'>BELUM ADA ORDER</span>
                        )}
                        
                        {groupedItems.map((data, index) => (
                                <li className=''>{data.nama}: {data.qty}</li>
                        ))}
                    </ul>                    
                </div>
            </section>

            <section className='mt-5'>
                <div className='m-6 flex gap-10 flex-wrap '>
                    {isEmpty && (
                        <div className='w-full h-96 flex justify-center items-center'>
                            <span className='text-xl xl:text-2xl text-center montserrat-bold text-gray-sh'>BELUM ADA ORDER</span>
                        </div>

                    )}

                    {orderDatas.map((data, index) => (
                        <div key={index} className='w-fit'>
                            <div className='bg-SKSBLUE h-16 w-56 rounded-t-lg p-2 flex items-center justify-between'>
                                <div className='text-white '>
                                    <h3 className='montserrat-semibold'>Table: {data.table_num}</h3>
                                    <span className='montserrat-medium text-sm'>14:20</span>
                                </div>
                                <button onClick={() => {orderComplete(data.id)}} className='bg-green-400 text-white montserrat-bold w-10 h-10 rounded-lg text-xl'>
                                    D
                                </button>
                            </div>

                            <div className='border border-[#10B0A2] border-2 p-2'>
                                <ul className='montserrat-semibold'>
                                    {data.Order_items.map((data) => (
                                        <li className='border-divider-b py-2'>
                                            {data.qty}x {data.nama}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </>
    )
}

export default KitchenDisplay
