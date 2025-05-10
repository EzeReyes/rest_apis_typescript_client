import * as v from "valibot"


export const DraftProductSchema = v.object({
    name: v.string(),
    img: v.string(),
    cost: v.number(),
    price: v.number(),
    stock: v.number(),
    category: v.string()
})

export const ProductSchema = v.object({
    id: v.number(),
    name: v.string(),
    img: v.string(),
    cost: v.number(),
    price: v.number(),
    availability: v.boolean(),
    stock: v.number(),
    category: v.string()
})

export const ProductsSchema = v.array(ProductSchema)
export type Product = v.InferOutput<typeof ProductSchema>