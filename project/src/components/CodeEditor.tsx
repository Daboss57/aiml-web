import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { motion } from 'framer-motion';
import { Play, Save, Terminal } from 'lucide-react';

declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

const CodeEditor = () => {
  const [code, setCode] = useState(`# Welcome to A.I.M.L Python Editor!
# Try running this example:

def greet(name):
    return f"Hello, {name}! Welcome to AI/ML!"

print(greet("Student"))`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [pyodide, setPyodide] = useState<any>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        if (!window.loadPyodide) {
          throw new Error('Pyodide not loaded');
        }
        
        const pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });
        await pyodideInstance.loadPackage(['numpy']);
        setPyodide(pyodideInstance);
      } catch (err) {
        console.error('Failed to load Pyodide:', err);
        setError('Failed to initialize Python environment. Please refresh the page.');
      }
    };

    loadPyodide();
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value) setCode(value);
  };

  const handleRunCode = async () => {
    if (!pyodide) {
      setError('Python environment not ready. Please wait or refresh the page.');
      return;
    }

    setIsRunning(true);
    setError('');
    setOutput('');

    try {
      // Redirect stdout to capture print statements
      pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
      `);

      // Run the user's code
      await pyodide.runPythonAsync(code);

      // Get the captured output
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(stdout);

      // Reset stdout
      pyodide.runPython("sys.stdout = sys.__stdout__");
    } catch (err: any) {
      setError(err.message || 'An error occurred while executing the code');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen bg-gray-900 p-4">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Python Editor</h2>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 ${
                isRunning || !pyodide ? 'bg-gray-600' : 'bg-green-600'
              } text-white px-4 py-2 rounded-md`}
              onClick={handleRunCode}
              disabled={isRunning || !pyodide}
            >
              <Play className="h-4 w-4" />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </motion.button>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-full overflow-hidden rounded-lg border border-gray-700">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>
          
          <div className="h-full overflow-hidden rounded-lg border border-gray-700 bg-black/50">
            <div className="flex items-center px-4 py-2 border-b border-gray-700">
              <Terminal className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-400">Output</span>
            </div>
            <div className="p-4 font-mono text-sm h-[calc(100%-40px)] overflow-auto">
              {error ? (
                <span className="text-red-400">{error}</span>
              ) : output ? (
                <span className="text-green-400">{output}</span>
              ) : (
                <span className="text-gray-500">Run your code to see the output here...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;