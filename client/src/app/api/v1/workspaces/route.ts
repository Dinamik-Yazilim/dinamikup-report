export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ success: true, data: ['database1', 'database2'] }),
  )
}

// import { auth } from '@/auth'
// import { NextResponse } from 'next/server'

// export const GET = auth(function GET(req) {
//   if (req.auth)
//     return NextResponse.json(
//       { success: true, data: ['database1', 'database2'] },
//       { status: 200 },
//     )
//   return NextResponse.json(
//     { success: false, error: 'Not authenticated' },
//     { status: 401 },
//   )
// })
