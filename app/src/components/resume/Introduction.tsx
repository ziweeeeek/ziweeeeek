"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { TranslationMessages } from "@/types/translations";

export default function Introduction() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  const profile = resumeData?.profile;

  if (!profile) return null;

  return (
    <div className="space-y-2 md:col-span-2 print:col-span-2">
      <p className="text-sm leading-relaxed text-justify text-gray-700 dark:text-gray-300 print:text-xs print:text-black">
        {profile.description}
      </p>
    </div>
  );
}
