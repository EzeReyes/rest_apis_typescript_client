import { safeParse } from "valibot"
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import axios from "axios"


type ProductData = {
    [k: string]: FormDataEntryValue;
}


export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            img: data.img,
            cost: +data.cost,
            price: +data.price,
            stock: +data.stock,
            category: data.category
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                img: result.output.img,
                cost: result.output.cost,
                price: result.output.price,
                stock: result.output.stock,
                category: result.output.category
            })
        } else {
            throw new Error ('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductsById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct( data : ProductData, id: Product['id'] ) {
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            img: data.img,
            cost: +data.cost,
            price: +data.price,
            availability: data.availability === 'true', // <- cambio clave aquí
            stock: +data.stock,
            category: data.category
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}