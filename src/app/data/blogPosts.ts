export interface BlogPost {
  title: string;
  description: string;
  publishDate: string;
  slug: string;
  category: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    title: 'How to Calculate PAYE in Nigeria (2026 Guide)',
    description:
      'Learn the steps to estimate Pay As You Earn (PAYE) in Nigeria, including taxable income, reliefs, and practical 2026 guidance.',
    publishDate: 'July 15, 2026',
    slug: 'how-to-calculate-paye-nigeria',
    category: 'PAYE',
    content: [
      'PAYE is the tax deducted from employment income before you receive your salary. Understanding the calculation helps you plan better and verify that your employer is deducting the correct amount.',
  'Start by determining your gross annual income, then subtract allowable deductions and reliefs where applicable. The remaining amount is your taxable income. From there, apply the progressive tax bands that apply to your circumstances.',
      'For many employees, the key difference between the gross salary and taxable income comes from reliefs such as consolidated relief allowance and pension contributions. If you are unsure which reliefs apply to you, a quick estimate using a reliable calculator can help you validate the numbers.',
      'Use our calculator to estimate your PAYE quickly and compare the result with your payslip. This is especially useful when you are reviewing new salary offers or planning for year-end tax obligations.',
    ],
  },

   {
    title: 'How to Calculate PAYE in Nigeria (2026 Guide)',
    description:
      'Learn the steps to estimate Pay As You Earn (PAYE) in Nigeria, including taxable income, reliefs, and practical 2026 guidance.',
    publishDate: 'July 15, 2026',
    slug: 'how-to-calculate-paye-nigeria',
    category: 'PAYE',
    content: [
      'PAYE is the tax deducted from employment income before you receive your salary. Understanding the calculation helps you plan better and verify that your employer is deducting the correct amount.',
      'Start by determining your gross annual income, then subtract allowable deductions and reliefs where applicable. The remaining amount is your taxable income. From there, apply the progressive tax bands that apply to your circumstances.',
      'For many employees, the key difference between the gross salary and taxable income comes from reliefs such as consolidated relief allowance and pension contributions. If you are unsure which reliefs apply to you, a quick estimate using a reliable calculator can help you validate the numbers.',
      'Use our calculator to estimate your PAYE quickly and compare the result with your payslip. This is especially useful when you are reviewing new salary offers or planning for year-end tax obligations.',
    ],
  },
];


