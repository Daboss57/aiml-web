import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPublicProjects } from '../../lib/supabase'
import { PublicProject } from '../../types'
import Button from '../../components/ui/Button'
import OutputConsole from '../../components/CodeEditor/OutputConsole'

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const [project, setProject] = useState<PublicProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [output, setOutput] = useState<string>('')
  const [outputError, setOutputError] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await getPublicProjects()
        if (error) throw error
        const found = data?.find(p => p.id === projectId) || null
        setProject(found as PublicProject)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [projectId])

  const handleRun = () => {
    if (!project) return
    setOutputError(false)
    try {
      const logs: string[] = []
      const orig = console.log
      console.log = (...args) => logs.push(args.join(' '))
      new Function(project.code)()
      console.log = orig
      setOutput(logs.join('\n') || 'No output')
    } catch (e) {
      setOutputError(true)
      setOutput((e as Error).message)
    }
  }

  if (loading) return <div>Loading…</div>
  if (error)   return <div>Error: {error}</div>
  if (!project) return <div>Project not found</div>

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>← Back</Button>

      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="text-sm text-gray-500">
        By {project.profiles.full_name || project.profiles.email}
      </p>
      <p className="text-gray-700">{project.description}</p>

      <div>
        <h2 className="mb-2 font-medium">Code</h2>
        <pre className="p-4 overflow-x-auto bg-gray-100 rounded">{project.code}</pre>
        <Button className="mt-4" onClick={handleRun}>Run Code</Button>
      </div>

      {output !== '' && (
        <div>
          <h2 className="mb-2 font-medium">Output</h2>
          <OutputConsole output={output} error={outputError} />
        </div>
      )}
    </div>
  )
}

export default ProjectDetailPage