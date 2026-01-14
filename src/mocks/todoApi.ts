import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

// Мок данные для разработки
// В будущем можно заменить на реальные API вызовы
let mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Изучить React',
    completed: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Настроить TypeScript',
    completed: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];

// Симуляция задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockTodoApi = {
  // Получение всех задач
  async getTodos(): Promise<Todo[]> {
    await delay(500);
    return [...mockTodos];
  },

  // Создание новой задачи
  async createTodo(request: CreateTodoRequest): Promise<Todo> {
    await delay(300);
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: request.title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockTodos.push(newTodo);
    return newTodo;
  },

  // Обновление задачи
  async updateTodo(id: string, request: UpdateTodoRequest): Promise<Todo> {
    await delay(300);
    const todoIndex = mockTodos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    mockTodos[todoIndex] = {
      ...mockTodos[todoIndex],
      ...request,
      updatedAt: new Date()
    };
    
    return mockTodos[todoIndex];
  },

  // Удаление задачи
  async deleteTodo(id: string): Promise<void> {
    await delay(300);
    const todoIndex = mockTodos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    mockTodos.splice(todoIndex, 1);
  }
};
