import React from 'react';
import { Construction, Clock, ArrowRight } from 'lucide-react';

interface UnderDevelopmentSectionProps {
  title: string;
  description?: string;
  estimatedCompletion?: string;
  plannedFeatures?: string[];
  relatedSections?: string[];
  currentProgress?: string;
}

const UnderDevelopmentSection: React.FC<UnderDevelopmentSectionProps> = ({
  title,
  description,
  estimatedCompletion,
  plannedFeatures = [],
  relatedSections = [],
  currentProgress
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mb-6">
          {description || 'This section is currently under development.'}
        </p>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-8">
        <div className="text-center">
          <Construction className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Under Development</h2>
          <p className="text-gray-600 mb-6">
            We're actively working on this documentation section to provide you with 
            comprehensive and detailed information.
          </p>
          {estimatedCompletion && (
            <div className="flex items-center justify-center space-x-2 text-sm text-yellow-700">
              <Clock className="w-4 h-4" />
              <span>Estimated completion: {estimatedCompletion}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Coming</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Planned Content</h4>
            {plannedFeatures.length > 0 ? (
              <ul className="text-sm text-gray-600 space-y-2">
                {plannedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  <span>Detailed technical documentation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  <span>Code examples and snippets</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  <span>Best practices and guidelines</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  <span>Implementation tutorials</span>
                </li>
              </ul>
            )}
          </div>
          <div>
            {relatedSections.length > 0 ? (
              <>
                <h4 className="font-semibold text-gray-900 mb-3">Related Sections</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Explore these related sections for additional context:
                </p>
                <ul className="text-sm text-blue-600 space-y-1">
                  {relatedSections.map((section, index) => (
                    <li key={index}>• {section}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h4 className="font-semibold text-gray-900 mb-3">Available Sections</h4>
                <p className="text-sm text-gray-600 mb-3">
                  While this section is being developed, you can explore these completed sections:
                </p>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Project Overview</li>
                  <li>• System Architecture</li>
                  <li>• Technology Stack</li>
                  <li>• Project Blueprint</li>
                  <li>• Database Schema sections</li>
                  <li>• API Documentation</li>
                </ul>
              </>
            )}
          </div>
        </div>
        
        {currentProgress && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Current Progress</h4>
            <p className="text-sm text-gray-600">{currentProgress}</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
        <p className="text-blue-800 text-sm">
          If you need immediate assistance with this topic, please check the completed sections 
          or contact the development team for specific guidance. You can also explore the related 
          sections mentioned above for additional context and information.
        </p>
      </div>
    </div>
  );
};

export default UnderDevelopmentSection;