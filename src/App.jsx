// import { useState } from 'react'

import { ToastContainer } from 'react-toastify';
import './App.css'
import { TodoPageTemplate } from './modules/todo_page/templates/todo-page-template';

function App() {
  return (
    <>
      <TodoPageTemplate />
      <ToastContainer />
    </>
  )
}

export default App
