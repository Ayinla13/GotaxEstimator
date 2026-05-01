import { Calculator } from 'lucide-react';

interface FooterProps {
  onNavigate?: () => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-border-color">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">GoTax Estimator</span>
            </div>
            <p className="text-sm text-slate-600">
              Simple, accurate tax estimates for Nigerian small businesses, freelancers, and traders.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.firs.gov.ng" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-slate-600 transition-colors hover:text-border-color"
                >
                  FIRS Official Website
                </a>
              </li>
              <li>
                <a 
                  href="https://www.firs.gov.ng/tax-management/tax-laws" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-slate-600 transition-colors hover:text-border-color"
                >
                  Nigerian Tax Laws
                </a>
              </li>
              <li>
                <button 
                  onClick={onNavigate} 
                  className="text-sm text-slate-600 transition-colors hover:text-border-color"
                >
                  About GoTax
                </button>
              </li>
            </ul>
          </div>

          {/* Tax Types */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Tax Types</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-border-color mt-0.5">•</span>
                <span>Personal Income Tax (PIT) - 7-24%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-border-color mt-0.5">•</span>
                <span>Company Income Tax (CIT) - 0-30%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-border-color mt-0.5">•</span>
                <span>Small Company Exemption</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} GoTax Estimator. Built for Nigerian entrepreneurs.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400">Made with 💚 in Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
