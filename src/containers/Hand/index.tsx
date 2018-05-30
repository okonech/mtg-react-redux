import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// fake; data; generator;
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  overflow: 'auto',
  padding: grid
});


export default class Hand extends React.Component<Props, State> {
  public cards: string[];

  constructor(props: any) {
    super(props);
    this.state = {
      items: getItems(20),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  public onDragEnd(result: any) {
    // dropped outside the list
      if (!result.destination) {
        return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }


    public render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId='droppable' direction='horizontal'>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {this.state.items.map((item: any, index: number) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(providedDroppable, snapshotDroppable) => (
                          <div
                            ref={providedDroppable.innerRef}
                            {...providedDroppable.draggableProps}
                            {...providedDroppable.dragHandleProps}
                            style={getItemStyle(
                              snapshotDroppable.isDragging,
                              providedDroppable.draggableProps.style
                            )}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              </DragDropContext>
        );
      }
}

interface Props {
  cards: string[];
}

interface State {
  items: any;
}
