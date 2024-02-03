import { useEffect, useState } from 'react'
import { useCart } from './store/products'
import { useFetchProducts } from './services/products'
import { AsideBar } from './components/asidebar'
import { Checkout } from './services/sendCheckout'

function App() {

  const {cart,addCart,removeCart,removeOneCart,clearCart}=useCart(state=>state)
  const [cartOpen,setCartOpen]=useState(false)
  const [products,setProducts]=useState([])

  useEffect(()=>{
    useFetchProducts()
    .then(result=>{
      setProducts(result)})
  },[])

  const AddtoCart=(product)=>{
    addCart(product)
  }

  const RemovetoCart=(product)=>{
    removeCart(product.id)
  }

  return (
    <section className='flex flex-col items-center p-10'>
      <h1 className='text-4xl'>Products</h1>
      <main className='grid grid-cols-4 my-20 gap-10 place-items-center'>

      {products.map(product=>{
        const indexCart=cart.findIndex(carp=>carp.id==product.id)
        return(
          <article key={product.id} className='flex flex-col justify-center items-center bg-slate-50'>
            <div className='w-1/3 h-60 overflow-hidden grid place-content-center'>
              <img src={`${product.image}`} alt={`${product.title}`} className='object-cover w-full my-5' />
            </div>
            <div className='flex flex-col gap-3 py-5 items-center'>
              <div className='max-w-xs'>
                <h2 className='truncate' >{product.title}</h2>
              </div>
              <div className='max-w-xs'>
                <p>Description:</p>
                <p className='truncate'>{product.description}</p>
              </div>
              <p>price: {product.price}</p>
              <span>rate: {product.rating.rate}</span>
              <span>count: {product.rating.count}</span>
            </div>
            {indexCart<0
            ?<button key={product.id} onClick={()=>AddtoCart(product)} className='bg-green-600 p-2 rounded-xl'>ADD CART</button>
            :<button key={product.id} onClick={()=>RemovetoCart(product)} className='bg-red-600 p-2 rounded-xl'>REMOVE CART</button>
            }
          </article>
        )
      })}
      {<button onClick={()=>setCartOpen(!cartOpen)} className={`fixed top-4 right-4 z-20 p-2 rounded-xl ${cartOpen?'text-white bg-red-700':'text-black bg-green-700'}`}>{cartOpen?'CLOSE':'OPEN'}</button>}
      {cartOpen?<AsideBar products={cart} addCart={addCart} removeOneCart={removeOneCart} clearCart={clearCart} />:null}
      </main>
      <button onClick={()=>Checkout({products:cart})} className='bg-green-500 p-2 rounded-xl'>PAY</button>
    </section>
  )
}

export default App
