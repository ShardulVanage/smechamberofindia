export async function GET() {
  return new Response("Contact API. Use POST /api/contact/send-otp and POST /api/contact/verify-otp.", {
    status: 200,
  })
}
