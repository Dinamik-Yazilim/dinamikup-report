import { NextResponse } from 'next/server'
export async function GET(request: Request) {
  return NextResponse.json({
    success: true,
    data: 'AliAbi-Org Kernel Resful Service /api/v1',
  })
}
