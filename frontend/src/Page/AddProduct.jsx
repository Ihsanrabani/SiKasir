import '../index.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';

// COMPONENTS
import Navbar from '../components/Navbar'

function AddProduct() {

    const [isLoading, setIsLoading] = useState(false)
    const [nama, setNama] = useState("");
    const [jenis, setJenis] = useState("Makanan");
    const [harga, setHarga] = useState(0);
    const [image, setImage] = useState("");
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

    const addProduct = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            successNotify("Produk Berhasil Ditambahkan!")
            const formData = new FormData();
            formData.append("nama", nama);
            formData.append("jenis", jenis);
            formData.append("harga", harga);
            formData.append("image", image);

            await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            navigate("/list-product")
        } catch (error) {
            errorNotify("Produk Tidak Berhasil Ditambahkan")
            console.log("INI ERROR => "+error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && (
                <div className='bg-black/20 absolute w-full h-screen z-50 flex justify-center items-center'>
                    <img src="/image/loading.gif" alt="" className='w-12' />
                </div>
            )}
            <ToastContainer />
            <Navbar pageName={"Tambah Produk"}/>

            <section className='h-screen flex flex-col justify-center md:mx-32 xl:mx-[500px]'>
                <div className='flex flex-col items-center text-center px-16'>
                    <h1 className='montserrat-semibold text-2xl'>Tambah Produk</h1>
                    <p className='montserrat-medium text-xs text-gray-sh'>Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur</p>
                </div>

                <div className='px-10 mt-7 flex flex-col gap-7'>
                    <form onSubmit={addProduct} action="">
                        <div className='flex flex-col w-full'>
                            <label htmlFor="" className='montserrat-medium'>Foto Produk</label>
                            <input id="" onChange={(e) => {setImage(e.target.files[0])}} type="file" className='border border-[#10B0A2] border-dotted border-2 p-2 rounded-md' />
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="" className='montserrat-medium'>Nama Produk</label>
                            <input id="" value={nama} onChange={(e) => { setNama(e.target.value) }} type="text" className='border-SKSBLUE-1 p-2 rounded-md' placeholder='Mie Goreng' />
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="" className='montserrat-medium'>Jenis Produk</label>
                            <select name="" id="" value={jenis} onChange={(e) => { setJenis(e.target.value) }} className='border-SKSBLUE-1 p-2 rounded-md'>
                                <option value="Makanan">Makanan</option>
                                <option value="Minuman">Minuman</option>
                                <option value="Snack">Snack</option>
                            </select>
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="" className='montserrat-medium'>Harga Produk</label>
                            <input id="" value={harga} onChange={(e) => { setHarga(e.target.value) }} type="number" className='border-SKSBLUE-1 p-2 rounded-md' placeholder='10000' />
                        </div>

                        <button type='submit' className='bg-SKSBLUE py-2 rounded-md text-white montserrat-semibold mt-5 w-full'>Tambah</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddProduct
