import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    // Use Web Worker to execute Python code in a sandboxed environment
    const worker = new Worker(
      `data:text/javascript,${encodeURIComponent(`
        self.onmessage = async (e) => {
          try {
            const pyodide = await loadPyodide();
            await pyodide.loadPackage('numpy');
            const output = await pyodide.runPythonAsync(e.data);
            self.postMessage({ output: output.toString() });
          } catch (error) {
            self.postMessage({ error: error.toString() });
          }
        };
      `)}`,
      { type: 'module' }
    );

    return new Promise((resolve) => {
      worker.onmessage = (e) => {
        worker.terminate();
        resolve(new Response(
          JSON.stringify(e.data),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        ));
      };

      worker.postMessage(code);
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});