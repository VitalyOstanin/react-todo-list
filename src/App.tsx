import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoPage } from './pages/TodoPage';
import './App.css';

// Главный компонент приложения
// Использует React Router для SPA навигации
// Документация: https://reactrouter.com/en/main/start/tutorial
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Главная страница со списком задач */}
          <Route path="/" element={<TodoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
