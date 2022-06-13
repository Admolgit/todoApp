import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Todo from './page/TodoApp'
import TodoView from './page/TodoView'

const Router = () => {
  return (
   <Routes>
       <Route path='/' element={<Todo />}/>
       <Route path='/view/:id' element={<TodoView />}/>
   </Routes>
  )
}

export default Router