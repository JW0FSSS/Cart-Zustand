export async function useFetchProducts(num=8) {
    const res=await fetch(`https://fakestoreapi.com/products?limit=${num}`)
    const products=await res.json()
    return products
}