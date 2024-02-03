import { create} from "zustand";
import { persist } from "zustand/middleware";

export const useCart=create(persist((set,get)=>{
    return{
        cart:[],
        addCart:(product)=>{         
            const {cart} =get()
            const copiedCart= [...cart]
            const indexProduct=copiedCart.findIndex(productCart=>productCart.id==product.id)
  
            if (indexProduct<0) {
                return set({cart:[...copiedCart,{...product,quantity:1}]})
            }

            copiedCart[indexProduct].quantity+=1
            return set({cart:copiedCart})
        },
        clearCart:()=>set({cart:[]}),
        removeCart:(id)=>{
            const {cart} =get()
            const copiedCart= [...cart]
            const newCart=copiedCart.filter(productCart=>productCart.id!==id)

            set({cart:newCart})

        },
        removeOneCart:(id)=>{
            const {cart} =get()
            const copiedCart= [...cart]
            const indexProduct=copiedCart.findIndex(productCart=>productCart.id==id)
            
            if ( copiedCart[indexProduct].quantity==1) {
                const newCart=copiedCart.filter(productCart=>productCart.id!==id)
                return set({cart:newCart})
            }

            copiedCart[indexProduct].quantity-=1
            return set({cart:copiedCart})

        }
    }
},{
    name: 'cartState',
  }))
