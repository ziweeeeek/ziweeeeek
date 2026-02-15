"use client";

import React from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NavigationBar from "@/components/NavigationBar";
import Introduction from "@/components/resume/Introduction";
import Contact from "@/components/resume/Contact";
import Skills from "@/components/resume/Skills";
import Experience from "@/components/resume/Experience";
import Education from "@/components/resume/Education";
import Projects from "@/components/resume/Projects";
import Awards from "@/components/resume/Awards";
import Languages from "@/components/resume/Languages";
import Certifications from "@/components/resume/Certifications";
import Title from "@/components/resume/Title";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTranslations } from "@/hooks/useTranslations";
import { TranslationMessages } from "@/types/translations";

function ResumeContent() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-gray-900 print:bg-white">
      <NavigationBar />

      <div className="max-w-4xl p-8 mx-auto print:p-4">
        {/* Header Section */}
        <Title />
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3 print:grid-cols-3 print:gap-6 print:mb-6">
          <Introduction />
          <Contact />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 print:grid-cols-3 print:gap-6">
          {/* Left Column - Main Content */}
          <div className="space-y-8 md:col-span-2 print:col-span-2 print:space-y-6">
            <Skills />
            <Experience />
            <Projects />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8 print:space-y-6">
            <Education />
            <Awards />
            <Languages />
            <Certifications />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-12 text-sm text-center text-gray-500 border-t border-gray-200 dark:border-gray-700 dark:text-gray-400 print:hidden">
          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-4">
            {resumeData?.profile?.items?.map((item: { type: string; content: string }, index: number) => {
              const isEmail = item.content.includes("@");
              const isLinkedIn = item.content.includes("linkedin");
              const isGitHub = item.content.includes("github");

              if (isEmail) {
                return (
                  <a
                    key={index}
                    href={`mailto:${item.content}`}
                    className="text-gray-600 transition-colors dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <MdEmail size={20} />
                  </a>
                );
              }
              if (isLinkedIn) {
                return (
                  <a
                    key={index}
                    href={item.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <FaLinkedin size={20} />
                  </a>
                );
              }
              if (isGitHub) {
                return (
                  <a
                    key={index}
                    href={item.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaGithub size={20} />
                  </a>
                );
              }
              return null;
            })}
          </div>
          <p>2025.11.16</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ResumeContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
