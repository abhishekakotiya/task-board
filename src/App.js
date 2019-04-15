import React, { Component } from "react";
import "./App.css";
import Task from "./Task";
import Target from "./Target";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

class App extends Component {
  state = {
    tasks: ["Task 2", "Task 3"],

    completed: ["Task 1"]
  };

  addCompleted = task => {
    const { completed } = this.state;
    const newCompleted = task;

    this.setState({
      completed: [...this.state.completed, task]
    });

    const newTasks = this.state.tasks.filter(t => {
      return t !== task;
    });

    this.setState({
      tasks: [...newTasks]
    });
  };

  addTask = e => {
    e.preventDefault();
    const { tasks } = this.state;
    const newTask = this.newTask.value;

    this.setState({
      tasks: [...this.state.tasks, newTask]
    });

    this.emptyField.reset();
  };

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Welcome to To-Do Task-Board</h1>
        </header>
        <div className="info">
          <p>
            Type task name and click on Add button to add new tasks. Drag and
            drop completed tasks to completed board.
          </p>
          <br></br><br></br>
          <div class="container">
            <div className="add-container">
              <form
                ref={input => (this.emptyField = input)}
                className="add-task"
                onSubmit={e => {
                  this.addTask(e);
                }}
              >
                <div>
                  <label>Add New Task</label>
                  <input
                    ref={input => (this.newTask = input)}
                    type="text"
                    id="newTask"
                  />
                </div>
                <br></br>
                <button class="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div class="completed-board">
            <h2>Completed</h2>
                {this.state.completed.map(task => (
                  <Target task={task} />
                ))}
            </div>
            <div class="todo-board">
            <h2>To-do</h2>
                {this.state.tasks.map(task => (
                  <Task
                    task={task}
                    handleDrop={task => this.addCompleted(task)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
