import { useState } from "react";

import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [{title: 'Project 1', description: 'Description 1', dueDate: '2022-12-31', id: 0}, {title: 'Project 2', description: 'Description 2', dueDate: '2022-12-31', id: 1}],
    tasks: []
  });

  function handleAddTask (text) {
    setProjectsState (prevState => {
      const taskId = Math.random ();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask (id) {
    setProjectsState (prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter (t => t.id !== id)
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState (prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleSelectProject (id) {
    console.log (id)
    setProjectsState (prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleCancelAddProject () {
    setProjectsState (prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject (projectData) {
    setProjectsState (prevState => {
      const newProject = {
        ...projectData, 
        id: prevState.projects.length
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject () {
    setProjectsState (prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter (p => p.id !== prevState.selectedProjectId)
      }
    })
  }

  console.log (projectsState.projects[0])
  const selectedProject = projectsState.projects.find (project => project.id === projectsState.selectedProjectId)
  console.log ('selectedProject', selectedProject)

  let content = <SelectedProject 
                    project={selectedProject} 
                    onDelete={handleDeleteProject} 
                    onAddTask={handleAddTask} 
                    onDeleteTask={handleDeleteTask}
                    tasks={projectsState.tasks} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects} 
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
        />
      {/* <NewProject /> */}
      {content}
    </main>
  );
}

export default App;
