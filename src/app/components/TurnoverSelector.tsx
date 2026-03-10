import { Building, Building2, TrendingUp } from 'lucide-react';

export type TurnoverBracket = 'small' | 'medium' | 'large';

interface TurnoverSelectorProps {
  value: TurnoverBracket;
  onChange: (value: TurnoverBracket) => void;
}

export function TurnoverSelector({ value, onChange }: TurnoverSelectorProps) {
  return (
    <div>
      <label className="block text-slate-700 mb-2">
        What is your annual turnover?
      </label>
      <p className="text-sm text-slate-500 mb-3">
        This helps us understand your business size and provide accurate recommendations
      </p>
      <div className="space-y-3">
        {/* Small Company */}
        <button
          type="button"
          onClick={() => onChange('small')}
          className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
            value === 'small'
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`p-2 rounded-lg flex-shrink-0 ${
            value === 'small' ? 'bg-emerald-100' : 'bg-slate-100'
          }`}>
            <Building className={`w-5 h-5 ${
              value === 'small' ? 'text-emerald-600' : 'text-slate-600'
            }`} />
          </div>
          <div className="flex-1 text-left">
            <div className={`${
              value === 'small' ? 'text-emerald-900' : 'text-slate-900'
            }`}>
              Small Company
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Annual turnover: ≤ ₦25,000,000
            </div>
            <div className="text-xs text-slate-500 mt-2 space-y-1">
              <div>• CIT: Exempt or lower rate</div>
              <div>• VAT: Normal rules apply if registered</div>
            </div>
          </div>
          {value === 'small' && (
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>

        {/* Medium Company */}
        <button
          type="button"
          onClick={() => onChange('medium')}
          className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
            value === 'medium'
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`p-2 rounded-lg flex-shrink-0 ${
            value === 'medium' ? 'bg-emerald-100' : 'bg-slate-100'
          }`}>
            <Building2 className={`w-5 h-5 ${
              value === 'medium' ? 'text-emerald-600' : 'text-slate-600'
            }`} />
          </div>
          <div className="flex-1 text-left">
            <div className={`${
              value === 'medium' ? 'text-emerald-900' : 'text-slate-900'
            }`}>
              Medium Company
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Annual turnover: ₦25,000,001 – ₦100,000,000
            </div>
            <div className="text-xs text-slate-500 mt-2 space-y-1">
              <div>• CIT: Standard 30% on taxable profit</div>
              <div>• Other compliance: PAYE, VAT, TET apply</div>
            </div>
          </div>
          {value === 'medium' && (
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>

        {/* Large Company */}
        <button
          type="button"
          onClick={() => onChange('large')}
          className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
            value === 'large'
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`p-2 rounded-lg flex-shrink-0 ${
            value === 'large' ? 'bg-emerald-100' : 'bg-slate-100'
          }`}>
            <TrendingUp className={`w-5 h-5 ${
              value === 'large' ? 'text-emerald-600' : 'text-slate-600'
            }`} />
          </div>
          <div className="flex-1 text-left">
            <div className={`${
              value === 'large' ? 'text-emerald-900' : 'text-slate-900'
            }`}>
              Large Company
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Annual turnover: &gt; ₦100,000,000
            </div>
            <div className="text-xs text-slate-500 mt-2 space-y-1">
              <div>• CIT: 30% of taxable profit</div>
              <div>• TET: 2%–2.5% of assessable profit</div>
              <div>• Strict compliance: VAT, PAYE, filings closely monitored</div>
            </div>
          </div>
          {value === 'large' && (
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}