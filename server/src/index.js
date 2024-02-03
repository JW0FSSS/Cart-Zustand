import express from "express";
import cors from "cors";
import { createServer } from "http";
import { config } from "dotenv";
import Stripe from 'stripe'

config()


const app = express()
const StripeBack=new Stripe(process.env.STRIPE_KEY)

app.use(cors())
app.use(express.json())


app.post('/checkout',async (req,res)=>{
    const {products}=req.body

    const lineItems=products.map(product=>({
        price_data:{
            currency:'usd',
            product_data:{
                name:product.title,
                images:[product.image]
            },
            unit_amount:Math.round(product.price*100)
        },
        quantity:product.quantity
    }))

    const session=await StripeBack.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:lineItems,
        mode:'payment',
        success_url:'http://localhost:5173',
        cancel_url:'http://localhost:3000',
    })

    res.json({url:session.url})
})

app.use((req,res,next)=>{
    const error=new Error('Not Found')
    error.status=404
    next(error)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
    });
})

const server=createServer(app)

server.listen(process.env.PORT,()=>console.log(`server turn on http://localhost:${process.env.PORT}`))