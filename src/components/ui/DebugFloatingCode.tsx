'use client';

import React from 'react';

export default function DebugFloatingCode() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-xs pointer-events-auto">
        <div className="flex items-center mb-2">
          <div className="h-3 w-3 rounded-full mr-2 bg-blue-500"></div>
          <span className="text-xs font-medium text-gray-500">JavaScript</span>
        </div>
        <pre className="text-xs overflow-hidden">
          <code className="font-mono text-blue-500">
            {`function testVisibility() {
  console.log("Can you see me?");
  return true;
}`}
          </code>
        </pre>
      </div>
    </div>
  );
} 