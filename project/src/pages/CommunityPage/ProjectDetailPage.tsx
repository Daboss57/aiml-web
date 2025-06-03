// typescript
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPublicProjects } from '../../lib/supabase'   // or write a new fetchProjectById
import { Project } from '../../types'
import Button from '../../components/ui/Button'

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  
  useEffect(() => {
    async function load() {
      try {
        // if you have a getProjectById helper, use that instead
        const { data, error } = await getPublicProjects()  
        if (error) throw error
        setProject(data?.find(p => p.id === projectId) || null)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [projectId])

  if (loading) return <div>Loading…</div>
  if (error)   return <div>Error: {error}</div>
  if (!project) return <div>Project not found</div>

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <Button variant="outline" onClick={() => navigate(-1)}>← Back</Button>
      <h1 className="mt-4 text-2xl font-bold">{project.title}</h1>
      <p className="mt-2 text-gray-600">{project.description}</p>
      <pre className="p-4 mt-6 overflow-x-auto bg-gray-100 rounded">
        {project.code}
      </pre>
    </div>
  )
}

export default ProjectDetailPage