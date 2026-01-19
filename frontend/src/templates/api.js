import axios from "axios";

const API_URL = `${import.meta.env.VITE_API}api/todos/`;

export const fetchTodos = () => axios.get(API_URL);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const toggleTodo = (id, todo) => axios.put(`${API_URL}${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}${id}`);
