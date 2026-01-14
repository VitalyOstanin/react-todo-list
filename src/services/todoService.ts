import axios from 'axios';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import { mockTodoApi } from '../mocks/todoApi';

// Конфигурация для переключения между мок и реальным API
const USE_MOCK_API = true; // Изменить на false для использования реального API
const API_BASE_URL = 'http://localhost:3001/api'; // URL реального бэкенда

// Настройка axios для реального API
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Реальный API сервис (для будущего использования)
const realTodoApi = {
  async getTodos(): Promise<Todo[]> {
    const response = await apiClient.get<Todo[]>('/todos');
    return response.data;
  },

  async createTodo(request: CreateTodoRequest): Promise<Todo> {
    const response = await apiClient.post<Todo>('/todos', request);
    return response.data;
  },

  async updateTodo(id: string, request: UpdateTodoRequest): Promise<Todo> {
    const response = await apiClient.put<Todo>(`/todos/${id}`, request);
    return response.data;
  },

  async deleteTodo(id: string): Promise<void> {
    await apiClient.delete(`/todos/${id}`);
  }
};

// Экспорт API сервиса с возможностью переключения
export const todoApi = USE_MOCK_API ? mockTodoApi : realTodoApi;
