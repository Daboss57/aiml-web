import React, { useState, useEffect } from 'react';
import { Play, Save, Download, Upload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MonacoEditor from '../components/CodeEditor/MonacoEditor';
import OutputConsole from '../components/CodeEditor/OutputConsole';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { loadPyodide, type PyodideInterface } from 'pyodide';

// Global variable to store pyodide instance
let pyodideInstance: PyodideInterface | null = null;

const PlaygroundPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { saveUserProject, isLoading } = useProjectStore();

  const [activeLanguage, setActiveLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [outputError, setOutputError] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);

  useEffect(() => {
    // Set default code templates based on language
    switch (activeLanguage) {
      case 'javascript':
        setCode('// JavaScript Code\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));\nconsole.log("Welcome to the playground!");\n');
        break;
      case 'python':
        setCode('# Python Code\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\nprint("Welcome to the playground!")\n\n# Try some calculations\nresult = 2 + 2\nprint(f"2 + 2 = {result}")\n');
        break;
      case 'html':
        setCode('<!-- HTML Code -->\n\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Web Page</title>\n  <style>\n    body { font-family: Arial, sans-serif; padding: 20px; }\n    h1 { color: #333; }\n  </style>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is a simple HTML page.</p>\n  <button onclick="alert(\'Hello from JavaScript!\')">Click me!</button>\n</body>\n</html>\n');
        break;
      default:
        setCode('// Start coding here\n\n');
    }

    setOutput('');
    setOutputError(false);
  }, [activeLanguage]);

  const initializePyodide = async (): Promise<PyodideInterface> => {
    if (!pyodideInstance) {
      setOutput('Initializing Python environment...');
      pyodideInstance = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/',
      });
    }
    return pyodideInstance;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutputError(false);

    try {
      if (activeLanguage === 'python') {
        const pyodide = await initializePyodide();
        
        // Capture Python stdout
        const capturedOutput: string[] = [];
        pyodide.runPython(`
import sys
from io import StringIO

# Create a StringIO object to capture stdout
captured_output = StringIO()
sys.stdout = captured_output
        `);

        // Run the user's code
        try {
          pyodide.runPython(code);
        } catch (pythonError) {
          // Restore stdout before throwing
          pyodide.runPython('sys.stdout = sys.__stdout__');
          throw pythonError;
        }

        // Get the captured output and restore stdout
        const result = pyodide.runPython(`
output = captured_output.getvalue()
sys.stdout = sys.__stdout__
output
        `);

        setOutput(result || 'Code executed successfully (no output)');

      } else if (activeLanguage === 'javascript') {
        const logs: string[] = [];
        const errors: string[] = [];
        
        // Override console methods
        const originalConsole = {
          log: console.log,
          error: console.error,
          warn: console.warn,
          info: console.info
        };

        console.log = (...args) => {
          logs.push(args.map(arg => {
            if (typeof arg === 'object') {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          }).join(' '));
        };

        console.error = (...args) => {
          errors.push('ERROR: ' + args.map(arg => String(arg)).join(' '));
        };

        console.warn = (...args) => {
          logs.push('WARNING: ' + args.map(arg => String(arg)).join(' '));
        };

        console.info = (...args) => {
          logs.push('INFO: ' + args.map(arg => String(arg)).join(' '));
        };

        try {
          // Execute the JavaScript code
          const result = new Function(code)();
          
          // If the function returns something, log it
          if (result !== undefined) {
            logs.push(`Returned: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}`);
          }
        } catch (jsError) {
          errors.push(`Execution Error: ${(jsError as Error).message}`);
        } finally {
          // Restore original console methods
          Object.assign(console, originalConsole);
        }

        const allOutput = [...logs, ...errors];
        if (errors.length > 0) {
          setOutputError(true);
        }
        
        setOutput(allOutput.length > 0 ? allOutput.join('\n') : 'Code executed successfully (no output)');

      } else if (activeLanguage === 'html') {
        // For HTML, we'll show a preview message and the HTML structure
        const parser = new DOMParser();
        try {
          const doc = parser.parseFromString(code, 'text/html');
          const hasContent = doc.body.children.length > 0 || doc.body.textContent?.trim();
          
          if (hasContent) {
            setOutput('HTML parsed successfully!\n\nIn a full implementation, this would render in an iframe or preview panel.\n\nHTML structure detected:\n' + 
              Array.from(doc.body.children).map(el => `- <${el.tagName.toLowerCase()}>`).join('\n'));
          } else {
            setOutput('HTML parsed successfully, but no body content detected.');
          }
        } catch (htmlError) {
          setOutput(`HTML Parse Error: ${(htmlError as Error).message}`);
          setOutputError(true);
        }
      } else {
        setOutput('Language not supported yet');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput(`Error: ${errorMessage}`);
      setOutputError(true);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveProject = async () => {
    if (!user) {
      setOutput('Please log in to save your project');
      setOutputError(true);
      return;
    }

    if (!projectTitle.trim()) {
      setOutput('Please enter a project title');
      setOutputError(true);
      return;
    }

    try {
      await saveUserProject(
        user.id,
        projectTitle,
        projectDescription,
        code,
        isPublic
      );

      setShowSaveDialog(false);
      setOutput('Project saved successfully');
      setOutputError(false);
    } catch (error) {
      setOutput(`Error saving project: ${(error as Error).message}`);
      setOutputError(true);
    }
  };

  const handleUploadProject = async () => {
    if (!user) {
      alert('Please log in to upload your project');
      return;
    }
    const title = window.prompt('Enter a title for your project');
    if (!title?.trim()) return;
    try {
      await saveUserProject(
        user.id,
        title,
        '',             // you could also prompt for a description
        code,
        true            // mark public
      );
      navigate('/community');
    } catch (e) {
      console.error(e);
      alert('Upload failed: ' + (e as Error).message);
    }
  };

  const handleCodeChange = (value: string = '') => {
    setCode(value);
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="pb-5 mb-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Code Playground</h1>
        <p className="mt-2 text-sm text-gray-600">
          Write, test, and experiment with code in a safe environment
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Language</h2>
            </div>
            <div className="p-4 space-y-2">
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeLanguage === 'javascript'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-gray-100'
                  }`}
                onClick={() => setActiveLanguage('javascript')}
              >
                JavaScript
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeLanguage === 'python'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-gray-100'
                  }`}
                onClick={() => setActiveLanguage('python')}
              >
                Python
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeLanguage === 'html'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-gray-100'
                  }`}
                onClick={() => setActiveLanguage('html')}
              >
                HTML
              </button>
            </div>

            <div className="p-4 border-t border-gray-200">
              <h2 className="mb-3 font-medium text-gray-700">Actions</h2>
              <div className="space-y-2">
                <Button
                  variant="primary"
                  fullWidth
                  icon={<Play size={16} />}
                  onClick={handleRunCode}
                  isLoading={isRunning}
                >
                  Run Code
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Save size={16} />}
                  onClick={() => setShowSaveDialog(true)}
                  disabled={!user}
                >
                  Save Project
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Download size={16} />}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Upload size={16} />}
                  onClick={handleUploadProject}
                >
                  Upload
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Trash2 size={16} />}
                  onClick={() => {
                    setCode('');
                    setOutput('');
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="space-y-6 lg:col-span-4">
          <MonacoEditor
            initialCode={code}
            language={activeLanguage}
            height="400px"
            onChange={handleCodeChange}
            onRun={handleRunCode}
          />

          <OutputConsole
            output={output}
            error={outputError}
          />
        </div>
      </div>

      {/* Save Project Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <h2 className="mb-4 text-xl font-bold">Save Project</h2>

            <div className="space-y-4">
              <Input
                label="Project Title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter a title for your project"
                fullWidth
              />

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe what your code does"
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 p-2.5"
                  rows={3}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="isPublic"
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isPublic" className="block ml-2 text-sm text-gray-700">
                  Make this project public (visible to other users)
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveProject}
                isLoading={isLoading}
              >
                Save Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaygroundPage;