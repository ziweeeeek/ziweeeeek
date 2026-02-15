"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { TranslationMessages } from "@/types/translations";
import koMessages from "@/messages/ko.json";
import personalConfig from "@/config/personal.json";

type Language = "ko" | "en" | "jp";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  messages: TranslationMessages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko");
  const [messages, setMessages] = useState<TranslationMessages>(
    koMessages as unknown as TranslationMessages
  );

  useEffect(() => {
    // Load saved language from localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && ["ko", "en", "jp"].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    // Load messages for current language
    const loadMessages = async () => {
      try {
        const messageModule = await import(`../messages/${language}.json`);
        const rawMessages = messageModule.default;
        
        // Replace template variables with personal config values
        const processedMessages = JSON.parse(
          JSON.stringify(rawMessages).replace(
            /\{\{personal\.([^}]+)\}\}/g,
            (match, path) => {
              const keys = path.split('.');
              let value: unknown = personalConfig;
              for (const key of keys) {
                value = (value as Record<string, unknown>)?.[key];
              }
              return (typeof value === 'string' ? value : match);
            }
          )
        );
        
        setMessages(processedMessages);
      } catch (error) {
        console.error(
          `Failed to load messages for language: ${language}`,
          error
        );
        // Fallback to Korean
        const processedKoMessages = JSON.parse(
          JSON.stringify(koMessages).replace(
            /\{\{personal\.([^}]+)\}\}/g,
            (match, path) => {
              const keys = path.split('.');
              let value: unknown = personalConfig;
              for (const key of keys) {
                value = (value as Record<string, unknown>)?.[key];
              }
              return (typeof value === 'string' ? value : match);
            }
          )
        );
        setMessages(processedKoMessages as unknown as TranslationMessages);
      }
    };

    loadMessages();

    // Save language to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
