import connectMongoDB from '@/libs/mongodb'
import User from '@/models/user'
import { NextResponse } from 'next/server'

// 유저 회원가입
export async function POST(request) {
    const { name, email } = await request.json()
    await connectMongoDB()
    await User.create({ name, email })

    return NextResponse.json({ message: 'User registered' }, { status: 201 })
}

// 유저 _id 반환
export async function GET(request) {
    try {
        const userEmail = request.nextUrl.searchParams.get("userEmail")

        await connectMongoDB()
        const user = await User.findOne({"email":userEmail})

        if(!user) {
            NextResponse.json({ message: '유저를 찾을 수 없습니다.'}, {status: 404})
        }

        return NextResponse.json({userObjectId: user._id})
    } catch(error) {
        console.log(error)

        return NextResponse.json({ message: '서버 오류가 발생하였습니다.' })
    }
}