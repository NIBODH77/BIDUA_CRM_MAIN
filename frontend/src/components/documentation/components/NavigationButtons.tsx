import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getNextSection, getPreviousSection, getSectionTitle } from '../utils/navigationUtils';

interface NavigationButtonsProps {
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentSection,
  onSectionChange
}) => {
  const previousSection = getPreviousSection(currentSection);
  const nextSection = getNextSection(currentSection);

  return (
    <div className="flex items-center justify-between pt-8 border-t border-gray-200">
      <div className="flex-1">
        {previousSection && (
          <button
            onClick={() => onSectionChange(previousSection)}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Previous</div>
              <div className="text-sm font-medium">{getSectionTitle(previousSection)}</div>
            </div>
          </button>
        )}
      </div>
      
      <div className="flex-1 text-right">
        {nextSection && (
          <button
            onClick={() => onSectionChange(nextSection)}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors group ml-auto"
          >
            <div className="text-right">
              <div className="text-xs text-gray-500">Next</div>
              <div className="text-sm font-medium">{getSectionTitle(nextSection)}</div>
            </div>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;