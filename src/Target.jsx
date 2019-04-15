import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const taskTarget = {
    drop(props, monitor) {
        task: monitor.getItem()
    }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
  }
}

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, task } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    return connectDropTarget(
      <div className="target">
        <div>{task}</div>
      </div>
    );
  }
}

export default DropTarget('task', taskTarget, collect)(Target);