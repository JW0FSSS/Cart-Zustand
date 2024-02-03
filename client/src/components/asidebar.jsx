export function AsideBar({products,addCart,removeOneCart,clearCart}) {
    return(
        <div className="fixed top-0 right-0 bottom-0 w-80 bg-slate-100  overflow-y-scroll overflow-x-hidden flex flex-col items-center">
            {products.length>0?products.map(product=>{
                return(
                        <article key={product.id} className='flex flex-col justify-center items-center text-sm mt-10 bg-slate-50 w-9/12 '>
                        <div className='w-2/6 h-36 overflow-hidden grid place-content-center'>
                            <img src={`${product.image}`} alt={`${product.title}`} className='object-cover w-full' />
                        </div>
                        <div className='flex flex-col items-center gap-2 py-2'>
                            <h2 className="text-center" >{product.title}</h2>  
                            <p>price: {product.price}</p>
                            <div className="flex gap-4">
                                <p>quantity: {product.quantity}</p>
                                <div className="flex gap-2">
                                    <button onClick={()=>addCart(product)}>+</button>
                                    <button onClick={()=>removeOneCart(product.id)}>-</button>
                                </div>
                            </div>
                        </div>
                    </article>
                )
            }):<h1 className="py-20 text-xl">No hay productos aun</h1>}
            <button onClick={()=>clearCart()} className="fixed bottom-2 right-2 bg-sky-400 p-2 rounded-xl">Clear Cart</button>
        </div>
    )
}