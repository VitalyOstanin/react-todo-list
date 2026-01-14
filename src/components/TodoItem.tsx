import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: { title?: string; completed?: boolean }) => Promise<Todo>;
  onDelete: (id: string) => Promise<void>;
}

// Компонент для отображения отдельной задачи
// Использует React.memo для оптимизации перерендеров
// Документация: https://ru.react.dev/reference/react/memo
export const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo, onUpdate, onDelete }) => {
  const { t } = useTranslation(); // Хук для локализации
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик изменения статуса выполнения
  const handleToggleComplete = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      await onUpdate(todo.id, { completed: !todo.completed });
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик сохранения изменений
  const handleSave = async () => {
    if (isLoading || editTitle.trim() === '') return;
    
    try {
      setIsLoading(true);
      await onUpdate(todo.id, { title: editTitle.trim() });
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик отмены редактирования
  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  // Обработчик удаления задачи
  const handleDelete = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      await onDelete(todo.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={isLoading}
      />
      
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            disabled={isLoading}
            autoFocus
          />
          <button onClick={handleSave} disabled={isLoading}>
            {t('common.save')}
          </button>
          <button onClick={handleCancel} disabled={isLoading}>
            {t('common.cancel')}
          </button>
        </div>
      ) : (
        <div className="todo-display">
          <span className={todo.completed ? 'completed' : ''}>
            {todo.title}
          </span>
          <button onClick={() => setIsEditing(true)} disabled={isLoading}>
            {t('common.edit')}
          </button>
          <button onClick={handleDelete} disabled={isLoading}>
            {t('common.delete')}
          </button>
        </div>
      )}
      
      {isLoading && <span className="loading">{t('common.loading')}</span>}
    </div>
  );
});
