import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddTodoForm } from '../AddTodoForm';
import '../../i18n';

describe('AddTodoForm', () => {
  it('renders form elements', () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    expect(screen.getByPlaceholderText('Введите описание задачи')).toBeInTheDocument();
    expect(screen.getByText('Добавить задачу')).toBeInTheDocument();
  });

  it('calls onAdd when form is submitted', async () => {
    const mockOnAdd = jest.fn().mockResolvedValue(undefined);
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Введите описание задачи');
    const button = screen.getByText('Добавить задачу');
    
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith('Тестовая задача');
    });
  });

  it('clears input after successful submission', async () => {
    const mockOnAdd = jest.fn().mockResolvedValue(undefined);
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Введите описание задачи') as HTMLInputElement;
    const button = screen.getByText('Добавить задачу');
    
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});
