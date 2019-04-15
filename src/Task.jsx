import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const taskSource = {
  beginDrag(props) {
    return {};
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return props.handleDrop(props.task);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class Task extends Component {
  render() {
    const { isDragging, connectDragSource, task } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div className="task" style={{ opacity }}>
        <div>{task}</div>
      </div>
    );
  }
}

export default DragSource('task', taskSource, collect)(Task);