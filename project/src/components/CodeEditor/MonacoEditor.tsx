import React, { useEffect, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Play } from 'lucide-react';
import Button from '../ui/Button';

interface MonacoEditorProps {
  initialCode?: string;
  language?: string;
  height?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onRun?: (code: string) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  initialCode = '// Start coding here\n\n',
  language = 'javascript',
  height = '400px',
  readOnly = false,
  onChange,
  onRun,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isEditorReady, setIsEditorReady] = useState(false);
  
  // Reset code if initialCode changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleEditorDidMount: OnMount = () => {
    setIsEditorReady(true);
  };

  const handleEditorChange = (value: string = '') => {
    setCode(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleRunCode = () => {
    if (onRun) {
      onRun(code);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-2 flex justify-between items-center border-b border-gray-300">
        <div className="text-sm font-medium text-gray-700">
          {language === 'javascript' && 'JavaScript'}
          {language === 'python' && 'Python'}
          {language === 'html' && 'HTML'}
          {language === 'css' && 'CSS'}
          {language === 'typescript' && 'TypeScript'}
        </div>
        
        {onRun && (
          <Button
            onClick={handleRunCode}
            variant="primary"
            size="sm"
            icon={<Play size={16} />}
            disabled={!isEditorReady}
          >
            Run
          </Button>
        )}
      </div>
      
      <Editor
        height={height}
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: 'on',
          readOnly,
          automaticLayout: true,
          lineNumbers: 'on',
          tabSize: 2,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
        theme="vs-light"
      />
    </div>
  );
};

export default MonacoEditor;