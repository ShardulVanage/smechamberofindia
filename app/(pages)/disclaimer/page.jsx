import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Shield, Phone, Mail, ArrowLeft } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: "#29688A" }}
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4 text-balance">Disclaimer & Fraud Alert</h1>
              <p className="text-xl text-slate-600 text-balance">
                Caution Notice - Protect Yourself from Fraudulent Activities
              </p>
            </div>
          </div>

          {/* Main Alert */}
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 font-medium text-lg">
              <strong>FRAUD ALERT:</strong> Unauthorized individuals are fraudulently misrepresenting themselves as SME
              Chamber of India representatives.
            </AlertDescription>
          </Alert>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Fraud Warning */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3" style={{ color: "#29688A" }}>
                  <AlertTriangle className="w-6 h-6" />
                  Fraudulent Activities Detected
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  It has come to our attention that certain unauthorized individuals, enterprises, NGOs, trade
                  organisations and other entities are fraudulently misrepresenting themselves as representatives or
                  affiliates of SME Chamber of India and attracting entrepreneurs, enterprises, corporates & other
                  institutions to avail their services, which are not belonging to them or Chamber or not authorised to
                  connect & promote.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  These impostors may approach members or entrepreneurs with false promises for channelising bank
                  finance, Government grants, Government schemes, subsidiaries, investment opportunities, business
                  support services or registration benefits in exchange for fees or personal information or personal
                  gains with ulterior motives.
                </p>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3" style={{ color: "#29688A" }}>
                  <Shield className="w-6 h-6" />
                  Please Note That
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700 leading-relaxed font-medium">
                    SME Chamber of India does not authorize third party/parties or persons or institutions to deal or
                    co-ordinate or collect money or sensitive information on our behalf.
                  </p>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Few enterprises and entrepreneurs are also using phishing mails with fraud links, misguided
                  information, wrong information or information for attracting towards to make the payments on any
                  matter and similar types of websites and communications to attract and cheat other entrepreneurs and
                  enterprises for personal benefits.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Few organisations emphasising that they are authorised Government agencies and show casing
                  co-operation with SME Chamber of India, which we have not appointed or authorised for dealing with any
                  such third party/ies.
                </p>
              </CardContent>
            </Card>

            {/* Warning */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-slate-700 leading-relaxed">
                    The concerned are herewith warned and beware, while dealing with office bearers, casual employees of
                    the Chamber, any third person/s, institution, enterprise, corporate, association or any other office
                    bearers or employees of other organisations, etc. We have also not authorised any person or
                    institution to collect fee, service charges or channelising funds, investment or Government schemes
                    or any other commercial dealings pertaining to the activities and services of the Chamber.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Official Communication */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: "#29688A" }}>
                  Official Communication Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Verified Email Domains</h4>
                    <p className="text-green-700">
                      @smechamberofindia.com
                      <br />
                      @smechamber.com
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Security Reminder</h4>
                    <p className="text-blue-700">
                      No personal or financial information should be given unless verified through our official sources
                      only.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Guidelines */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3" style={{ color: "#29688A" }}>
                  <Shield className="w-6 h-6" />
                  Always Be Vigilant!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: "#29688A" }}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Verify Identity</h4>
                    <p className="text-slate-600 text-sm">
                      Always verify the identity of individuals claiming association with the Chamber
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: "#29688A" }}
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Contact Directly</h4>
                    <p className="text-slate-600 text-sm">
                      Contact us directly at +91-22-6951 1111 or report suspicious activity
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: "#29688A" }}
                    >
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">No Payments</h4>
                    <p className="text-slate-600 text-sm">
                      Do not make payments to unverified accounts or provide personal data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Fraud */}
            <Card className="border-0 shadow-lg" style={{ borderTop: `4px solid #29688A` }}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3" style={{ color: "#29688A" }}>
                  <Mail className="w-6 h-6" />
                  Report Fraud Immediately
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    If you suspect any fraudulent activity, immediately report it to us and register complaint under the
                    specific Indian laws.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="mailto:secretariat@smechamber.com" className="inline-flex">
                      <Button className="text-white font-medium" style={{ backgroundColor: "#29688A" }}>
                        <Mail className="w-4 h-4 mr-2" />
                        secretariat@smechamber.com
                      </Button>
                    </a>
                    <a href="tel:+912269511111" className="inline-flex">
                      <Button
                        variant="outline"
                        className="font-medium bg-transparent"
                        style={{ borderColor: "#29688A", color: "#29688A" }}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        +91-22-6951 1111
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </div>
      </div>
    </div>
  )
}
