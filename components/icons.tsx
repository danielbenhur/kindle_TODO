
import React from 'react';

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.93 13.5A2.25 2.25 0 0 0 7.5 12a2.25 2.25 0 0 0-2.43 1.5L3 20h9.07a2.25 2.25 0 0 0 2.12-3.33z"/><path d="M12 2a2.4 2.4 0 0 0-1.8 4.2l-1.3 2.6a2.4 2.4 0 0 0 1.8 4.2 2.4 2.4 0 0 0 4.2-1.8l2.6-1.3a2.4 2.4 0 0 0-4.2-1.8z"/><path d="m22 13.8-1.3 2.6a2.4 2.4 0 0 1-4.2-1.8c0-1.2.9-2.2 2.1-2.2a2.4 2.4 0 0 1 2.1 2.2z"/><path d="M18.93 5.5A2.25 2.25 0 0 0 16.5 4a2.25 2.25 0 0 0-2.43 1.5L12 11h9.07a2.25 2.25 0 0 0 2.12-3.33z"/>
    </svg>
);
