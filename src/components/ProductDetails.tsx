import {formatCurrency} from '../../utils'
import { deleteProduct } from '../services/ProductServices'
import { Product } from '../types'
import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'

type ProductDetailsProp = {
    product: Product
}

export async function action({ params } : ActionFunctionArgs) {
    if(params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect('/')
    }

}

export default function ProductDetails({product} : ProductDetailsProp) {
    const fetcher = useFetcher()
    const navigate = useNavigate()

/**  const navigate = useNavigate() puede ser usado en cualquier parte de la funcion tanto en la presentación del componente como afuera a diferencia de Link que solo puede ser utilizado en el componente. Ejemplo '<button
                        onClick{() => navigate(`/productos/${product.id}/editar`)}
                        />Editar</button>

// MANERA CON LINK
                    <Link
                        to={`/productos/${product.id}/editar`}
                        className='bg-indigo-600 text-white rounded-lg w-full text-center p-2 uppercase font-bold text-xs'
                    >Editar</Link>
*/
    const isAvailable = product.availability

    return (
            <tr className="border-b ">
                <td className="p-3 text-lg text-gray-800">
                    {product.name}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    <img src={product.img} alt={product.img} height="auto" width="100px" />
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {formatCurrency(product.cost)}        
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                    {formatCurrency(product.price)}        
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {product.stock}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    <fetcher.Form method='POST'>
                        <button
                            type='submit'
                            name='id'
                            value={product.id}
                            className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}
                        >
                            { isAvailable ? 'Disponible' : 'No Disponible'}
                        </button>
                    </fetcher.Form>
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {product.category}
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                    <div className='flex gap-2 items-center'>
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className='bg-indigo-600 text-white rounded-lg w-full text-center p-2 uppercase font-bold text-xs'
                    >Editar
                    </button>

                    <Form className='w-full' method='POST' action={`productos/${product.id}/eliminar`} onSubmit={ (e) => {
                        if(!confirm('¿Eliminar?')) {
                            e.preventDefault()
                        }
                    }}>
                        <input
                            type='submit'
                            value='Eliminar'
                            className='bg-red-600 text-white rounded-lg w-full text-center p-2 uppercase font-bold text-xs'
                        />
                    </Form>

                    </div>
                </td>
            </tr> 
    )
}
