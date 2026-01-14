import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from '../components/TodoItem';
import { AddTodoForm } from '../components/AddTodoForm';

// Главная страница приложения со списком задач
// Использует кастомный хук useTodos для управления состоянием
export const TodoPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { todos, loading, error, createTodo, updateTodo, deleteTodo } = useTodos();

  // Обработчик переключения языка
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  // Обработчик добавления новой задачи
  const handleAddTodo = async (title: string) => {
    await createTodo({ title });
  };

  if (loading && todos.length === 0) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  return (
    <div className="todo-page">
      <header className="todo-header">
        <h1>{t('todo.title')}</h1>
        <button onClick={toggleLanguage} className="language-toggle">
          {i18n.language === 'ru' ? 'EN' : 'RU'}
        </button>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <AddTodoForm onAdd={handleAddTodo} />

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="no-todos">{t('todo.noTasks')}</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      <div className="todo-stats">
        <p>
          {t('todo.completed')}: {todos.filter(t => t.completed).length} / {todos.length}
        </p>
      </div>
    </div>
  );
};
