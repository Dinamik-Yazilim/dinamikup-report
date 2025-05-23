export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ success: true, data: 'Hello, Next.js!' }),
  )
}
export async function POST(request: Request) {
  return new Response(
    JSON.stringify({ success: true, data: 'Hello, Next.js!' }),
  )
}