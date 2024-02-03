import { loadStripe} from "@stripe/stripe-js";

export async function Checkout({products}) {
    const stripe=loadStripe('pk_test_51OfoZSFkkG88uD0f89CF0GUggyT9ZKhfbEIZnGLllF2hookON0quG5WGCI59BNQ11KsygcxhxP3maaJQBceh2YQW009WEGwzXG')
    
    const body={
        products
    }
    const response = await fetch('http://localhost:3000/checkout',{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(body)
    })

    const res= await response.json()

    window.location.href=res.url

}