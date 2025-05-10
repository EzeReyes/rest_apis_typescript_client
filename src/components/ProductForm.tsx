import { Product } from "../types"
import { useState, useEffect } from "react";

type ProductFormProps = {
    product?: Product
}

export default function ProductForm({product} : ProductFormProps) {
    

    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [img, setImg] = useState<string>(product?.img || "");


      useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/categories/list`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // Aquí accedes a la propiedad 'data' del objeto recibido
            setCategories(data.data); // data.data contiene el array con las categorías
          });
      }, []);
    
      const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.value);
      };

  return (
    <>
        <div className="mb-4">
            <label className="text-gray-800" htmlFor="name">
                Nombre Producto:
            </label>
            <input
                id="name"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombre del Producto"
                name="name"
                defaultValue={product?.name}
            />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="img">
            Imagen del Producto:
          </label>
          <input
            id="img"
            type="url"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="URL Imagen del Producto"
            name="img"
            defaultValue={product?.img}
            onChange={handleChange}
            />
            <div>
                <span>Vista Previa</span>
                  <img
                  src={img}
                  alt="Vista previa"
                  style={{ width: '100px', height: 'auto' }}
                  />
            </div>
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="cost">
            Costo:
          </label>
          <input
            id="cost"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Costo Producto. ej. 200, 300"
            name="cost"
            defaultValue={product?.cost}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue={product?.price}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="stock">
            Stock:
          </label>
          <input
            id="stock"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Stock Producto. ej. 200, 300"
            name="stock"
            defaultValue={product?.stock}
          />
        </div>

        <select
          id="category"
          name="category"
          className="mt-2 block w-full p-3 bg-gray-50"
          value={selectedCategory} // Vinculamos el valor seleccionado
          onChange={handleCategoryChange} // Actualizamos el valor al cambiar
        >
          <option value="">-- Selecciona una categoría --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Mostrar bonito */}
            </option>
          ))}
        </select>
    </>
  )
}
