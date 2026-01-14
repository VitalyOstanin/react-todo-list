import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoItem } from '../TodoItem';
import type { Todo } from '../../types/todo';
import '../../i18n';

const mockTodo = {
  id: '1',
  title: 'Тестовая задача',
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

describe('TodoItem', () => {
  it('renders todo item', () => {
    const mockOnUpdate = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('toggles completion status', async () => {
    const mockOnUpdate = jest.fn().mockResolvedValue(undefined);
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('1', { completed: true });
    });
  });

  it('enters edit mode when edit button is clicked', () => {
    const mockOnUpdate = jest.fn();
    const mockOnDelete = jest.fn();
    
    render(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );
    
    const editButton = screen.getByText('Редактировать');
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Тестовая задача')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });
});
