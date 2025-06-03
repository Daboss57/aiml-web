import React from 'react';

interface OutputConsoleProps {
  output: string;
  error?: boolean;
  height?: string;
}

const OutputConsole: React.FC<OutputConsoleProps> = ({
  output,
  error = false,
  height = '150px',
}) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-2 border-b border-gray-300">
        <div className="text-sm font-medium text-gray-700">Output</div>
      </div>
      
      <div 
        className={`font-mono text-sm p-3 overflow-auto ${error ? 'bg-red-50 text-red-700' : 'bg-black text-gray-100'}`}
        style={{ height, whiteSpace: 'pre-wrap' }}
      >
        {output || 'No output to display. Run your code to see the results.'}
      </div>
    </div>
  );
};

export default OutputConsole;