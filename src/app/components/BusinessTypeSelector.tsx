import { Building2, User } from 'lucide-react';
import type { BusinessType } from '../App';

interface BusinessTypeSelectorProps {
  value: BusinessType;
  onChange: (value: BusinessType) => void;
}

export function BusinessTypeSelector({ value, onChange }: BusinessTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm text-slate-700 mb-3">
        Business Type
      </label>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onChange('personal')}
          className={`w-full flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
            value === 'personal'
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`p-2 rounded-lg ${
            value === 'personal' ? 'bg-emerald-100' : 'bg-slate-100'
          }`}>
            <User className={`w-5 h-5 ${
              value === 'personal' ? 'text-emerald-600' : 'text-slate-600'
            }`} />
          </div>
          <div className="flex-1 text-left">
            <div className={`${
              value === 'personal' ? 'text-emerald-900' : 'text-slate-900'
            }`}>
              Sole Proprietorship / Business Name
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Subject to Personal Income Tax (PIT)
            </div>
          </div>
          {value === 'personal' && (
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => onChange('limited')}
          className={`w-full flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
            value === 'limited'
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className={`p-2 rounded-lg ${
            value === 'limited' ? 'bg-emerald-100' : 'bg-slate-100'
          }`}>
            <Building2 className={`w-5 h-5 ${
              value === 'limited' ? 'text-emerald-600' : 'text-slate-600'
            }`} />
          </div>
          <div className="flex-1 text-left">
            <div className={`${
              value === 'limited' ? 'text-emerald-900' : 'text-slate-900'
            }`}>
              Limited Company
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Subject to Company Income Tax (CIT)
            </div>
          </div>
          {value === 'limited' && (
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