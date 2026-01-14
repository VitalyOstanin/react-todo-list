import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AddTodoFormProps {
  onAdd: (title: string) => Promise<void>;
}

// Компонент формы для добавления новой задачи
// Использует контролируемые компоненты для управления формой
// Документация: https://ru.react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращение стандартного поведения формы
    
    if (title.trim() === '' || isLoading) return;

    try {
      setIsLoading(true);
      await onAdd(title.trim());
      setTitle(''); // Очистка поля после успешного добавления
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('todo.taskPlaceholder')}
        disabled={isLoading}
        required
      />
      <button type="submit" disabled={isLoading || title.trim() === ''}>
        {isLoading ? t('common.loading') : t('todo.addTask')}
      </button>
    </form>
  );
};
