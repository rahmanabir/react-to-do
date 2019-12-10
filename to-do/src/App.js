import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    todos: []
  }

  async componentDidMount() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    this.setState({ todos: data });
  }



  //Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed  // ! acts as a toggle  
        }

        return todo;
      })
    })

  }

  //Delete Todo
  delTodo = async (id) => {

    //Need to add try catch block and error handling
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`); //Deletes from server
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }); // Updates UI

  }


  //AddTodo
  addTodo = async (title) => {

    const newTodo = {
      title,
      completed: false
    }
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
    this.setState({ todos: [...this.state.todos, data] });

  }

  render() {

    return (

      <Router>
        <div className="App">

          <div className="container">
            <Header />

            <Route exact path="/" render={props => (
              <Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>

        </div>

      </Router>



    );
  }
}

export default App;
