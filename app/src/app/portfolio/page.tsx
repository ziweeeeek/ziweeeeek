"use client";

import React, { useState, useMemo } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NavigationBar from "@/components/NavigationBar";
import { usePortfolioTranslations } from "@/hooks/usePortfolioTranslations";
import { PortfolioProject, PortfolioCategory } from "@/types/portfolio";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import FilterTabs from "@/components/portfolio/FilterTabs";

function PortfolioContent() {
  const { messages } = usePortfolioTranslations();
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('all');

  const portfolioSection = messages?.portfolio;

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    const projects = (portfolioSection?.content as PortfolioProject[] | undefined) || [];
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter((project) =>
      project.category?.includes(activeFilter)
    );
  }, [portfolioSection?.content, activeFilter]);

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-gray-900">
      <NavigationBar />

      <div className="max-w-7xl p-8 mx-auto">
        {/* Main Content: Filter Sidebar + Projects */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr]">
          {/* Left Sidebar: Filter Tabs */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </aside>

          {/* Right Content: Projects List (1 column) */}
          <div className="space-y-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <PortfolioCard key={index} project={project} />
              ))
            ) : (
              <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                No projects found for this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
