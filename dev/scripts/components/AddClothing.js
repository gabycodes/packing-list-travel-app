import React from 'react';
import ReactDOM from 'react-dom';

class AddClothing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            text: "",
            initialItems: []
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.markItemCompleted = this.markItemCompleted.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.getStoredData = this.getStoredData.bind(this);
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
        // const dbRef = firebase.database().ref(itemID);
        // dbRef.remove();
    }

    removeItem(itemToRemove) {
        const userName = this.props.userName;        
        console.log(itemToRemove);
        const database = firebase.database().ref('users/' + userName + "/" + category );
        database.child(itemToRemove).remove();
    }
    getAlert() {
        alert('clicked');
    }
    getStoredData() {
        const userName = this.props.userName;
        const category = "clothing"
        const dbRef = firebase.database().ref('users/' + userName + "/" + category);
        console.log("getting data...");
        if (this.props.userName) {
            dbRef.on("value", (firebaseData) => {
                const itemsArray = [];
                const itemsData = firebaseData.val();

                for (let itemKey in itemsData) {
                    // itemsData[itemKey].key = itemKey// We're adding a key property, in addition to name and item
                    itemsArray.push(itemsData[itemKey])
                }

                this.setState({
                    initialItems: itemsArray
                }, () => console.log(this.state.initialItems));
            });
            {
                this.state.initialItems.map((item, i) => {
                    console.log(this.state.initialItems[i]);
                    // return <ClubItem data={item} key={item.key} remove={this.removeItem} />
                })
            }
        }
    }
    render() {
        return (
            <div className="main-category">
                <div className='inner-wrapper'>

                <h3 className="item-category">Clothing</h3>
                {/* <div className="addedItems">
                    <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />

                </div> */}
                <ul className="items">
                    {this.state.initialItems.map((item, i) => {
                            console.log(this.state.initialItems);
                            return <ClubItem data={this.state.initialItems[i]} key={this.state.initialItems[i]} remove={this.removeItem} />
                    })}
                </ul>
                <form action="">
                    <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} />
                    <button className="btn btn-primary" onClick={this.handleAddItem} disabled={!this.state.text}>{"Add #" + (this.state.items.length + 1)}</button>
                </form>
                </div>
            </div>
        );
    }
}

export function ClubItem(props) {
    // constructor(props) {
    //     super(props);
    // }
    // render() {
        return(
            <li className="club-item">
                {/* <label htmlFor="form-check-label" className="form-check-label"></label> */}
                <input type="checkbox" className="form-check-input"/>
                {props.data}
                <button onClick={() => this.props.removeItem(props.data)}>Remove Item</button>
            </li>
        )
        // let itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone");
        // return (
        //     <li className={itemClass} ref={li => this._listItem = li}>
        //         <label className="form-check-label">
        //             <input type="checkbox" className="form-check-input" onChange={this.markCompleted} /> {this.props.text}
        //         </label>
        //         <button type="button" className="btn btn-danger btn-sm" onClick={() => {this.deleteItem(); this.removeFromFirebase()}}>x</button>
        //     </li>
        // );
    }
// }

// class TodoList extends React.Component {
//     render() {
//         return (
//             <ul className="items">
//                 {this.state.items.map((item, i) => {
//                     return <ClubItem data={item} key={item.key} remove={this.removeItem} />
//                 })}
//             </ul>
//         );
//     }
// }
export default AddClothing