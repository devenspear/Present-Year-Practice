'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loadState, updateState, AppState, ServiceProject } from '@/lib/store'
import { generateICS, downloadICS, showNotification } from '@/lib/utils'
import { format } from 'date-fns'
import Header from '@/components/Header'

export default function ServicePage() {
  const router = useRouter()
  const [state, setState] = useState<AppState | null>(null)
  const [newProject, setNewProject] = useState({
    cause: '',
    date: '',
    tasks: ['']
  })
  const [reflection, setReflection] = useState('')
  const [selectedProject, setSelectedProject] = useState<ServiceProject | null>(null)

  useEffect(() => {
    const appState = loadState()
    if (!appState.onboardingComplete) {
      router.push('/')
      return
    }
    setState(appState)
  }, [router])

  const addTask = () => {
    setNewProject({
      ...newProject,
      tasks: [...newProject.tasks, '']
    })
  }

  const updateTask = (index: number, value: string) => {
    const tasks = [...newProject.tasks]
    tasks[index] = value
    setNewProject({ ...newProject, tasks })
  }

  const createProject = () => {
    if (!newProject.cause || !newProject.date || !state) return

    const project: ServiceProject = {
      id: Date.now().toString(),
      cause: newProject.cause,
      date: newProject.date,
      tasks: newProject.tasks.filter(t => t).map(text => ({ text, done: false })),
      reflection: ''
    }

    const newState = updateState({
      serviceProjects: [...state.serviceProjects, project]
    })
    
    setState(newState)
    setNewProject({ cause: '', date: '', tasks: [''] })
    
    const icsContent = generateICS(
      `Service Project: ${project.cause}`,
      `Service project for Present Year Practice`,
      new Date(project.date),
      120
    )
    downloadICS(`service-${project.cause.toLowerCase().replace(/\s+/g, '-')}`, icsContent)
    
    showNotification('Service project created!', 'success')
  }

  const toggleTask = (projectId: string, taskIndex: number) => {
    if (!state) return
    
    const projects = state.serviceProjects.map(p => {
      if (p.id === projectId) {
        const tasks = [...p.tasks]
        tasks[taskIndex] = { ...tasks[taskIndex], done: !tasks[taskIndex].done }
        return { ...p, tasks }
      }
      return p
    })
    
    const newState = updateState({ serviceProjects: projects })
    setState(newState)
  }

  const saveReflection = (projectId: string) => {
    if (!state || !reflection) return
    
    const projects = state.serviceProjects.map(p => {
      if (p.id === projectId) {
        return { ...p, reflection }
      }
      return p
    })
    
    const newState = updateState({ serviceProjects: projects })
    setState(newState)
    setReflection('')
    setSelectedProject(null)
    showNotification('Reflection saved!', 'success')
  }

  if (!state) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-calm dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 px-8 py-3">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Service Projects</h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Service Project</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Cause or Organization</label>
              <input
                type="text"
                value={newProject.cause}
                onChange={(e) => setNewProject({ ...newProject, cause: e.target.value })}
                placeholder="e.g., Local Food Bank, Beach Cleanup"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date & Time</label>
              <input
                type="datetime-local"
                value={newProject.date}
                onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tasks</label>
              {newProject.tasks.map((task, i) => (
                <input
                  key={i}
                  type="text"
                  value={task}
                  onChange={(e) => updateTask(i, e.target.value)}
                  placeholder="Task to complete"
                  className="w-full p-3 border rounded-lg mb-2"
                />
              ))}
              <button onClick={addTask} className="text-primary hover:underline">
                + Add another task
              </button>
            </div>

            <button onClick={createProject} className="btn-primary">
              Create Project & Add to Calendar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {state.serviceProjects.map(project => (
            <div key={project.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{project.cause}</h3>
                  <p className="text-gray-600">
                    {format(new Date(project.date), 'PPP p')}
                  </p>
                </div>
                {!project.reflection && (
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-primary hover:underline"
                  >
                    Add Reflection
                  </button>
                )}
              </div>

              <div className="space-y-2 mb-4">
                {project.tasks.map((task, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(project.id, i)}
                      className="w-4 h-4"
                    />
                    <span className={task.done ? 'line-through text-gray-400' : ''}>
                      {task.text}
                    </span>
                  </label>
                ))}
              </div>

              {project.reflection && (
                <div className="bg-calm p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Reflection:</h4>
                  <p className="text-gray-700">{project.reflection}</p>
                </div>
              )}

              {selectedProject?.id === project.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Add Reflection</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    "How did serving change your inner state? One sentence. One breath."
                  </p>
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full p-3 border rounded-lg h-24 mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveReflection(project.id)}
                      className="btn-primary text-sm"
                    >
                      Save Reflection
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProject(null)
                        setReflection('')
                      }}
                      className="btn-secondary text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {state.serviceProjects.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p>No service projects yet.</p>
            <p className="mt-2">Create your first project above to give back to your community.</p>
          </div>
        )}
      </main>
    </div>
  )
}