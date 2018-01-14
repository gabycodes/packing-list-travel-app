import React from 'react';
import ReactDOM from 'react-dom';

class AddClothing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            text: ""
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.markItemCompleted = this.markItemCompleted.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.removeFromFirebase = this.removeFromFirebase.bind(this);
        this.category = "clothing";
    }
    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }
    handleAddItem(event) {
        event.preventDefault();
        //issue an ID number using the date
        const newItem = {
            id: Date.now(),
            text: this.state.text,
            done: false
        };

        // const dbRef = firebase.database().ref();
        // dbRef.push({
        //     userEmail: this.props.userEmail,
        //     clothing: this.state.items
        // });
        const userName = this.props.userName;
        const category = "clothing"
        const database = firebase.database().ref('users/' + userName + "/" + category);
        database.push(newItem.text);

        this.setState((prevState) => ({
            items: prevState.items.concat(newItem),
            text: ""
        }));
    }
    markItemCompleted(itemId) {
        let updatedItems = this.state.items.map(item => {
            if (itemId === item.id)
                item.done = !item.done;

            return item;
        });

        // State Updates are Merged
        this.setState({
            items: [].concat(updatedItems)
        });
    }
    handleDeleteItem(itemId) {
        let updatedItems = this.state.items.filter(item => {
            return item.id !== itemId;
        });

        this.setState({
            items: [].concat(updatedItems)
        });
        const dbRef = firebase.database().ref(itemID);
        dbRef.remove();
    }
    removeFromFirebase() {

    }
    render() {
        return (
            <div className="main-category">
                <div className='inner-wrapper'>

                <h3 className="item-category">Clothing</h3>
                <div className="addedItems">
                    <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />

                </div>
                <form action="">

                    <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} />

                    <button className="btn btn-primary" onClick={this.handleAddItem} disabled={!this.state.text}>{"Add #" + (this.state.items.length + 1)}</button>

                </form>
                </div>
            </div>
        );
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.markCompleted = this.markCompleted.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    markCompleted(event) {
        this.props.onItemCompleted(this.props.id);
    }
    deleteItem(event) {
        this.props.onDeleteItem(this.props.id);
    }
    // Highlight newly added item for several seconds.
    componentDidMount() {
        if (this._listItem) {
            // 1. Add highlight class.
            this._listItem.classList.add("highlight");

            // 2. Set timeout.
            setTimeout((listItem) => {
                // 3. Remove highlight class.
                listItem.classList.remove("highlight");
            }, 500, this._listItem);
        }
    }
    render() {
        let itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone");
        return (
            <li className={itemClass} ref={li => this._listItem = li}>
                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" onChange={this.markCompleted} /> {this.props.text}
                </label>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => {this.deleteItem(); this.removeFromFirebase()}}>x</button>
            </li>
        );
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul className="todolist">
                {this.props.items.map(item => (
                    <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
                ))}
            </ul>
        );
    }
}
export default AddClothing