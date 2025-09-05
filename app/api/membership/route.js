export async function GET() {
  return new Response("Membership API. Use POST /api/membership/send-otp and POST /api/membership/verify-otp.", {
    status: 200,
  })
}
