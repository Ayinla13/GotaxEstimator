import { Calculator, TrendingUp, BarChart3, Shield, ArrowRight, Briefcase, Wallet, Users } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-emerald-600 p-1.5 sm:p-2 rounded-lg">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900 text-lg sm:text-2xl">GoTax Estimator</h1>
                <p className="text-xs text-slate-500">Tax Ready</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm">
                For Small Businesses, Freelancers & Traders
              </div>
              <h2 className="text-slate-900 leading-tight">
                Estimate Your Taxes in Seconds
              </h2>
              <p className="text-lg text-slate-600">
                See how much PIT or BIT you may pay and plan better. Get instant calculations, 
                understand progressive tax rates, and receive smart recommendations.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-200 group"
            >
              <span className="text-lg">Start Estimating</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Illustration Container */}
            <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/50 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200/50 rounded-full blur-3xl"></div>
              
              {/* Main Visual */}
              <div className="relative z-10 space-y-6">
                {/* Calculator Icon */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-100 h-3 rounded w-3/4"></div>
                    <div className="bg-slate-100 h-3 rounded w-full"></div>
                    <div className="bg-emerald-100 h-8 rounded w-full mt-4"></div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/90 backdrop-blur rounded-lg p-4 shadow">
                    <TrendingUp className="w-6 h-6 text-emerald-600 mb-2" />
                    <div className="text-xs text-slate-600">Tax Rate</div>
                    <div className="text-slate-900">Progressive</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur rounded-lg p-4 shadow">
                    <BarChart3 className="w-6 h-6 text-blue-600 mb-2" />
                    <div className="text-xs text-slate-600">Breakdown</div>
                    <div className="text-slate-900">Detailed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-slate-900 mb-2">Instant Calculation</h3>
            <p className="text-sm text-slate-600">
              Get immediate tax estimates based on current Nigerian tax laws for both PIT and CIT.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-slate-900 mb-2">Clear Breakdown</h3>
            <p className="text-sm text-slate-600">
              Understand exactly how your tax is calculated with progressive bracket breakdowns.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-slate-900 mb-2">Smart Recommendations</h3>
            <p className="text-sm text-slate-600">
              Receive personalized tips to optimize your tax position and track expenses better.
            </p>
          </div>
        </div>

        {/* Who Is This For Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4">
              Who is this for?
            </div>
            <h2 className="text-slate-900 mb-4">
              Built for Nigeria's Self-Employed & Entrepreneurs
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Whether you're earning a salary, running a business, or freelancing, 
              GoTax Estimator helps you understand your tax obligations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Freelancers & Traders */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200">
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Wallet className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-slate-900 mb-3">Freelancers & Traders</h3>
              <p className="text-sm text-slate-700 mb-6">
                Self-employed individuals providing services or trading goods. Calculate your Personal Income Tax (PIT) based on your annual earnings.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Graphic designers, writers, consultants</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Online sellers & market traders</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Independent contractors</span>
                </li>
              </ul>
            </div>

            {/* Small Business Owners */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Briefcase className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-slate-900 mb-3">Small Business Owners</h3>
              <p className="text-sm text-slate-700 mb-6">
                Registered businesses and limited companies. Compare PIT vs Company Income Tax (CIT) to make informed decisions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Registered business names</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Limited liability companies (LLC)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>SMEs exploring incorporation</span>
                </li>
              </ul>
            </div>

            {/* Salary Earners */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-slate-900 mb-3">Salary Earners</h3>
              <p className="text-sm text-slate-700 mb-6">
                Employees with additional income streams. Understand how your total income affects your tax bracket and plan accordingly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Employees with side hustles</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Multiple income streams</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Contract workers & part-timers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <button
              onClick={onGetStarted}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2 shadow-lg shadow-emerald-200 group"
            >
              <span className="text-lg">Get Your Tax Estimate Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-sm text-slate-600 text-center">
            <strong>Disclaimer:</strong> GoTax Estimator provides tax estimates for informational purposes only. 
            These calculations do not constitute professional tax or legal advice. Please consult with a qualified 
            tax professional for accurate tax planning and compliance with Nigerian tax regulations.
          </p>
        </div>
      </footer>
    </div>
  );
}