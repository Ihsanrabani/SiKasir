    import '../index.css';
    import { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useNavigate, useParams} from 'react-router-dom';
    import { ToastContainer, toast, Bounce } from 'react-toastify';

    // COMPONENTS
    import Navbar from '../components/Navbar'

    function EditProduct() {

        const [isLoading, setIsLoading] = useState(false);
        const { id } = useParams();
        const [products, setProducts] = useState({
            id: 0,
            image: "",
            nama: "",
            jenis: "",
            harga: "",
            stok: 0
        });

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

        const editProduct = async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true)
                successNotify("Produk Berhasil Diedit!")
                const formData = new FormData();
                formData.append("nama", products.nama);
                formData.append("jenis", products.jenis);
                formData.append("harga", products.harga);
                formData.append("stok", products.stok);
                formData.append("image", products.image);
                await axios.patch(`${import.meta.env.VITE_API_URL}/products/${id}`, formData , {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                navigate("/list-product")
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        const getProductById = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
                setProducts({
                    id: response.data.id,
                    image: response.data.image,
                    nama: response.data.nama,
                    jenis: response.data.jenis,
                    harga: response.data.harga,
                    stok: response.data.stok
                })
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        useEffect(() => {
            getProductById()
        }, [])


        return (
            <>
                {isLoading && (
                    <div className='bg-black/20 absolute w-full h-screen z-50 flex justify-center items-center'>
                        <img src="/image/loading.gif" alt="" className='w-12' />
                    </div>
                )}
                <ToastContainer />
                <Navbar pageName={"Edit Produk"} />

                <section className='h-screen flex flex-col justify-center md:mx-32 xl:mx-[500px]'>
                    <div className='flex flex-col items-center text-center px-16'>
                        <h1 className='montserrat-semibold text-3xl'>Edit Produk</h1>
                    </div>

                    <div className='px-10 mt-7 flex flex-col gap-7'>
                        <form onSubmit={editProduct} action="" className='flex flex-col gap-4'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="" className='montserrat-medium'>Foto Produk</label>
                                <img src={products.image} alt="" className='w-56 rounded-md my-3'/>
                                <input id="" onChange={(e) => setProducts({...products, image: e.target.files[0]})} type="file" className='border border-[#10B0A2] border-dotted border-2 p-2 rounded-md' />
                            </div>

                            <div className='flex flex-col w-full'>
                                <label htmlFor="" className='montserrat-medium'>Nama Produk</label>
                                <input id="" value={products.nama} onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        nama: e.target.value
                                    })
                                } type="text" className='border-SKSBLUE-1 p-2 rounded-md' placeholder='Mie Goreng' />
                            </div>

                            <div className='flex flex-col w-full'>
                                <label htmlFor="" className='montserrat-medium'>Jenis Produk</label>
                                <select name="" id="" value={products.jenis} onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        jenis: e.target.value
                                    })
                                } className='border-SKSBLUE-1 p-2 rounded-md'>
                                    <option value="Makanan">Makanan</option>
                                    <option value="Minuman">Minuman</option>
                                    <option value="Snack">Snack</option>
                                </select>
                            </div>

                            <div className='flex flex-col w-full'>
                                <label htmlFor="" className='montserrat-medium'>Stok</label>
                                <input id="" value={products.stok} onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        stok: e.target.value
                                    })
                                } type="number" className='border-SKSBLUE-1 p-2 rounded-md' placeholder='100' />
                            </div>

                            <div className='flex flex-col w-full'>
                                <label htmlFor="" className='montserrat-medium'>Harga Produk</label>
                                <input id="" value={products.harga} onChange={(e) =>
                                    setProducts({
                                        ...products,
                                        harga: e.target.value
                                    })
                                } type="number" className='border-SKSBLUE-1 p-2 rounded-md' placeholder='10000' />
                            </div>

                            <button type='submit' className='bg-SKSBLUE py-2 rounded-md text-white montserrat-semibold mt-5 w-full'>Edit</button>
                        </form>
                    </div>
                </section>
            </>
        )
    }

    export default EditProduct
