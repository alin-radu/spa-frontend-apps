import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from '../../api/TodoApiService';
import { useAuth } from '../../contexts/AuthContext';

const ListTodosPage = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const username = authContext.username;

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  const refreshTodos = useCallback(() => {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }, [username]);

  useEffect(() => refreshTodos(), [refreshTodos]);

  function deleteTodo(id) {
    console.log('clicked ' + id);
    deleteTodoApi(username, id)
      .then(() => {
        setMessage(`Delete of the todo with id = ${id} successful`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  function updateTodo(id) {
    console.log('clicked ' + id);
    navigate(`/todo/${id}`);
  }

  function addNewTodo() {
    navigate(`/todo/-1`);
  }

  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>

      {message && <div className="alert alert-warning">{message}</div>}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  {' '}
                  <button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>{' '}
                </td>
                <td>
                  {' '}
                  <button className="btn btn-success" onClick={() => updateTodo(todo.id)}>
                    Update
                  </button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
};

export default ListTodosPage;
