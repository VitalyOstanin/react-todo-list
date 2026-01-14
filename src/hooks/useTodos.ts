import { useState, useEffect } from 'react';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import { todoApi } from '../services/todoService';

// Кастомный хук для управления состоянием задач
// Использует useState для локального состояния и useEffect для побочных эффектов
// Документация: https://ru.react.dev/reference/react/useState
// Документация: https://ru.react.dev/reference/react/useEffect
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка задач при монтировании компонента
  useEffect(() => {
    loadTodos();
  }, []); // Пустой массив зависимостей означает выполнение только при монтировании

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки задач');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (request: CreateTodoRequest) => {
    try {
      setError(null);
      const newTodo = await todoApi.createTodo(request);
      // Обновление состояния с помощью функции обновления
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания задачи');
      throw err;
    }
  };

  const updateTodo = async (id: string, request: UpdateTodoRequest) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, request);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления задачи');
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления задачи');
      throw err;
    }
  };

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    refetch: loadTodos
  };
};
