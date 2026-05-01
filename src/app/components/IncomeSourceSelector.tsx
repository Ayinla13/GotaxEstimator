import { Briefcase, Wallet, Users } from 'lucide-react';

export type IncomeSource = 'salary' | 'freelancer' | 'business';

interface IncomeSourceSelectorProps {
  value: IncomeSource;
  onChange: (value: IncomeSource) => void;
}

export function IncomeSourceSelector({ value, onChange }: IncomeSourceSelectorProps) {
  return (
    <div>
      <label className="block text-sm text-slate-700 mb-3">
        Where does your income come from?
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Salary Earner */}
        <button
          type="button"
          onClick={() => onChange('salary')}
          className={`flex flex-col items-center gap-3 p-5 rounded-lg border-2 transition-all relative ${
            value === 'salary'
              ? 'border-border-color bg-accent-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`p-3 rounded-lg ${
            value === 'salary' ? 'bg-accent-100' : 'bg-slate-100'
          }`}>
            <Users className={`w-7 h-7 ${
              value === 'salary' ? 'text-accent-600' : 'text-slate-600'
            }`} />
          </div>
          <div className="text-center">
            <div className={`${
              value === 'salary' ? 'text-accent-900' : 'text-slate-900'
            }`}>
              Salary Earner
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Employment income
            </div>
          </div>
          {value === 'salary' && (
            <div className="w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center absolute top-3 right-3">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>

        {/* Freelancer */}
        <button
          type="button"
          onClick={() => onChange('freelancer')}
          className={`flex flex-col items-center gap-3 p-5 rounded-lg border-2 transition-all relative ${
            value === 'freelancer'
              ? 'border-border-color bg-accent-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`p-3 rounded-lg ${
            value === 'freelancer' ? 'bg-accent-100' : 'bg-slate-100'
          }`}>
            <Wallet className={`w-7 h-7 ${
              value === 'freelancer' ? 'text-accent-600' : 'text-slate-600'
            }`} />
          </div>
          <div className="text-center">
            <div className={`${
              value === 'freelancer' ? 'text-accent-900' : 'text-slate-900'
            }`}>
              Freelancer
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Self-employment income
            </div>
          </div>
          {value === 'freelancer' && (
            <div className="w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center absolute top-3 right-3">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>

        {/* Business Owner */}
        <button
          type="button"
          onClick={() => onChange('business')}
          className={`flex flex-col items-center gap-3 p-5 rounded-lg border-2 transition-all relative ${
            value === 'business'
              ? 'border-border-color bg-accent-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`p-3 rounded-lg ${
            value === 'business' ? 'bg-accent-100' : 'bg-slate-100'
          }`}>
            <Briefcase className={`w-7 h-7 ${
              value === 'business' ? 'text-accent-600' : 'text-slate-600'
            }`} />
          </div>
          <div className="text-center">
            <div className={`${
              value === 'business' ? 'text-accent-900' : 'text-slate-900'
            }`}>
              Business Owner
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Registered business
            </div>
          </div>
          {value === 'business' && (
            <div className="w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center absolute top-3 right-3">
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