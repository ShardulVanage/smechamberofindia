import CouncilPageClient from "./components/council-page-client"

export default function Page() {
  // Read the site key on the server; no direct process.env access in client code
  const siteKey = process.env.RECAPTCHA_SITE_KEY || ""
  return <CouncilPageClient siteKey={siteKey} />
}
