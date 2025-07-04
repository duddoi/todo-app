import './App.css';
import './components/component-common.scss';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useState, useCallback } from 'react';
import { formatDate } from './lib/format.js';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const getNoteList = JSON.parse(localStorage.getItem('noteList'));

  const [todos, setTodos] = useState(getNoteList === null ? [] : getNoteList);
  const [error, setError] = useState('');

  const addList = useCallback(
    (text) => {
      if (text === '') {
        setError('내용을 입력해 주삼.');
        return;
      } else {
        setError('');
        setTodos([
          ...todos,
          {
            id: uuidv4(),
            text: text,
            checked: false,
            time: formatDate(new Date()),
          },
        ]);
      }
    },
    [todos],
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  function handleRemove(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  // const removeList = useCallback((id)=>{
  //   setTodos(
  //     todos.filter(todo=>todo.id!==id)
  //   )
  // }, [todos])

  // function createBulkTodos() {
  //   const arr = [];
  //   for (let i = 1; i <= 5; i++) {
  //     arr.push({
  //       id: i,
  //       text: `해야 할 일 ${i}`,
  //       checked: false,
  //       time: formatDate(new Date()),
  //     });
  //   }
  //   return arr;
  // }

  return (
    <TodoTemplate>
      <TodoInsert onInsert={addList} error={error} />
      <TodoList todo={todos} onRemove={handleRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}
export default App;
