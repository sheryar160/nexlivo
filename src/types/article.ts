export type BusinessCategory =
  | 'Real Estate & Trade'
  | 'Digital & Technology'
  | 'Marketing & Media'
  | 'Finance & Markets'
  | 'Advisory & Formation';

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  keyPoints?: string[];
}

export interface ArticleStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ArticleMistake {
  title: string;
  explanation: string;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface BusinessArticle {
  id: number;
  slug: string;
  title: string;
  category: BusinessCategory;
  readTime: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  secondaryImage?: string;
  secondaryImageCaption?: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string[];
  sections: ArticleSection[];
  beginnerSteps: ArticleStep[];
  advantages: string[];
  disadvantages: string[];
  requiredSkills: string[];
  requiredResources: string[];
  commonMistakes: ArticleMistake[];
  faqs: ArticleFaq[];
  relatedSlugs: string[];
}
