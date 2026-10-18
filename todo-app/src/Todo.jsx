import { Fragment, useEffect, useState } from "react";
const limit = 10;
const baseUrl = "https://dummyjson.com/todos";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalTodos, setTotalTodos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTodo, setEditTodo] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [showTodoForm, setShowTodoForm] = useState(false);

  useEffect(() => {
    const skip = (page - 1) * limit;
    const c = new AbortController();
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`, {
          signal: c.signal,
        });

        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        setTodos(data.todos);
        setTotalTodos(data.total);
        setLoading(false);
      } catch (err) {
        if(err.name !== "AbortError") setError(err.message);
      }
    };

    fetchTodos();

    return () => c.abort();
  }, [page]);

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      const response = await fetch(`${baseUrl}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: editTodo,
        }),
      });

      if (!response.ok) {
        throw new Error("Error in updating");
      }
      const data = await response.json();

      setTodos((prev) => prev.map((t) => (t.id === data.id ? data : t)));
      setEditId(null);
      setEditTodo("");
      setUpdateLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Error in updating");
      }
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const addTodo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: newTodo,
          completed: false,
          userId: 4,
        }),
      });

      if (!response.ok) {
        throw new Error("Error in adding todo");
      }
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    const updatedTodo = todos.find((t) => t.id === id);

    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !updatedTodo.completed,
        }),
      });

      const data = await response.json();

      // update UI with response
      setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const renderPagination = () => {
    const totalPage = Math.ceil(totalTodos / limit);

    return Array.from({ length: totalPage }, (_, i) => (
      <button
        onClick={() => setPage(i + 1)}
        style={{ background: page == i + 1 ? "yellow" : undefined }}
      >
        {i + 1}
      </button>
    ));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div>
        <button onClick={() => setShowTodoForm(!showTodoForm)}>
          {!showTodoForm ? "add todo" : "back"}
        </button>
        {showTodoForm && (
          <>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>add</button>
          </>
        )}
      </div>
      <ul className="row">
        {todos.length !== 0 ? (
          todos.map((todo) =>
            editId === todo.id ? (
              <Fragment key={todo.id}>
                <input
                  type="text"
                  name="todo"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                />
                <button onClick={handleUpdate} disabled={updateLoading}>
                  {updateLoading ? "updating.." : "update"}
                </button>
              </Fragment>
            ) : (
              <li
                key={todo.id}
                className="col-6"
                style={{
                  border: "1px solid",
                  padding: "5px",
                  margin: "5px",
                  listStyle: "none",
                }}
              >
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.todo}
                </span>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <div className="col-6 d-flex flex-end">
                  <button
                    onClick={() => {
                      setEditId(todo.id);
                      setEditTodo(todo.todo);
                    }}
                    className="btn btn-primary"
                  >
                    edit
                  </button>
                  <button onClick={() => handleDelete(todo.id)} className="btn btn-warning">delete</button>
                </div>
              </li>
            )
          )
        ) : (
          <p>No todos</p>
        )}
      </ul>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {todos.length !== 0 && renderPagination()}
    </div>
  );
}

export default Todo;
