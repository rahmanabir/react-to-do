import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import './App.css';

class App extends Component {

  state = {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Finish assignment',
        completed: false
      },
      {
        id: 3,
        title: 'Eat breakfast',
        completed: false
      },
      {
        id: 4,
        title: 'Do something',
        completed: false
      }
    ]
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
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });

  }


  //AddTodo
  addTodo = (title) => {
    const newTodo = {
      id: 5,
      title, //ES6 feature, since names are the same, can directly wirte that here.
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] });

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
