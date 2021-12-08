import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Todo from './Todo';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('A single todo is rendered correctly', async () => {
  const todo = {
    text: "test todo",
    done: false
  };
  const onClickDelete = () => { };
  const onClickComplete = () => { };

  await act(async () => {
    render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />, container)
  });

  expect(container.querySelector(".todo").textContent).toContain(todo.text);
  expect(container.querySelector(".todo").textContent).toContain("This todo is not done");
});