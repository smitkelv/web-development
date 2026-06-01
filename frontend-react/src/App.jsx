import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import RetrieveExercises from './pages/RetrieveExercises'
import CreateExercise from './pages/CreateExercise'
import EditExercise from './pages/EditExercise'
import { useState } from 'react'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  return (
    <BrowserRouter>
      <header>
        <h1>Exercise Tracker</h1>
        <p>Track your workouts and monitor your progress.</p>
      </header>
      <nav>
        <Navigation />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<RetrieveExercises setExerciseToEdit={setExerciseToEdit} />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/edit" element={<EditExercise exerciseToEdit={exerciseToEdit} />} />
        </Routes>
      </main>
      <footer>
        <p>Copyright &copy; {new Date().getFullYear()} Your Name</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
