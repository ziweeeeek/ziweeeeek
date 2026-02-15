export interface Profile {
  title: { type: "text"; content: string; url?: string; inactive?: boolean };
  subtitle: string;
  description: string;
  items: Array<{ type: string; content: string }>;
}

export interface SectionContent {
  type: string;
  title?: { type: "text"; content: string; url?: string; inactive?: boolean };
  subtitle?: string;
  variant?: string;
  level?: string;
  tag?: string;
  content?: Array<{ type: string; content: string } | SectionContent>;
}

export interface Section {
  title: { type: "text"; content: string; url?: string; inactive?: boolean };
  content: SectionContent[];
}

export interface Sections {
  skillsSummary: Section;
  experience: Section;
  skills?: Section; // 선택: 일부 언어/메시지에서만 사용
  awards: Section;
  languages: Section;
  projects: Section;
  education: Section;
  certifications: Section;
}

export interface TranslationMessages {
  profile: Profile;
  sections: Sections;
}
