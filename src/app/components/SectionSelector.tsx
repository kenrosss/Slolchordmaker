interface SectionSelectorProps {
  sections: string[];
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

export function SectionSelector({
  sections,
  selectedSection,
  onSelectSection,
}: SectionSelectorProps) {
  return (
    <div className="flex gap-2 mb-6">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onSelectSection(section)}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedSection === section
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
}
