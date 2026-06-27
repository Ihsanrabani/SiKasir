import Product from "../models/ProductModel.js";
import path from "path";

// PRODUCT DB
export const getProducts = async(req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getProductsById = async(req, res) => {
    try {
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getProductsByJenis = async(req, res) => {
    try {
        const response = await Product.findAll({
            where:{
                jenis: req.params.jenis
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createProduct = async(req, res) => {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    console.log("req.headers:", req.headers);
    if (req.files === null) return res.status(400).json({msg: "Masukkan gambar"})
    const nama = req.body.nama;
    const jenis = req.body.jenis;
    const harga = req.body.harga;
    const stok = req.body.stok;
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if(!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({msg: "Ekstensi gamabar hanya boleh (png, jpg, jpeg)"})
    }
    if(fileSize > 5000000) {
        return res.status(422).json({msg: "Ukuran gambar harus dibawah 5 MB"})
    }

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message})
        try {
            await Product.create({nama: nama, jenis: jenis, harga: harga, stok: stok, image:url})
            res.status(200).json({msg: "Produk berhasil ditambahkan!"})
        } catch (error) {
            console.log(error.message);
        }

    })
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!product) {
            return res.status(404).json({
                msg: "Produk tidak ditemukan"
            });
        }

        let url = product.image;

        // Jika user upload gambar baru
        if (req.files && req.files.image) {

            const file = req.files.image;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;

            const allowedType = [".png", ".jpg", ".jpeg"];

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({
                    msg: "Ekstensi gambar hanya boleh png, jpg, jpeg"
                });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({
                    msg: "Ukuran gambar harus dibawah 5 MB"
                });
            }

            // Simpan gambar baru
            await file.mv(`./public/images/${fileName}`);

            // URL gambar baru
            url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        }

        // Update data produk
        await Product.update({
            nama: req.body.nama,
            jenis: req.body.jenis,
            harga: req.body.harga,
            stok: req.body.stok,
            image: url
        }, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            msg: "Produk berhasil diupdate!"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: error.message
        });
    }
}

// export const updateProduct = async(req, res) => {
//     try {
//         await Product.update(req.body, {
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Produk Berhasil Diupdate!"});
//     } catch (error) {
//         console.log(error.message)
//     }
// }

export const deleteProduct = async(req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Produk Berhasil Dihapus!"});
    } catch (error) {
        console.log(error.message)
    }
}
// PRODUCT DB



// ORDERS DB

// ORDERS DB
