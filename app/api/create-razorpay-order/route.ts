import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

// Only initialize Razorpay if keys are present
const razorpayKeyId = process.env.RAZORPAY_KEY_ID
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

let razorpay: Razorpay | null = null
if (razorpayKeyId && razorpayKeySecret) {
    razorpay = new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
    })
}

export async function POST(req: Request) {
    // Check if Razorpay is configured
    if (!razorpay) {
        return NextResponse.json(
            { error: 'Payment gateway not configured' },
            { status: 503 }
        )
    }

    try {
        const { amount, currency = 'INR', receipt } = await req.json()

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency,
            receipt,
        }

        const order = await razorpay.orders.create(options)
        return NextResponse.json(order)
    } catch (error) {
        console.error('Error creating Razorpay order:', error)
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }
}
