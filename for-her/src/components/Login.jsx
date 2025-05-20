import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  function handleChange(e) {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formdata.username.trim() || !formdata.password.trim()) return;

    if (formdata.username === "ajay") {
      localStorage.setItem("isAuthenticated", true);
      navigate("/home");
    }
  }
  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <button>login</button>
      </form>
    </div>
  );
}

export default Login;
