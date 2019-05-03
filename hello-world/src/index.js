import React from 'react';
import ReactDOM from 'react-dom';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rows: [1, 2, 3, 4, 5]};
    }

    deleteRow(id) {
        console.log('delete row ' + id)
    };
    createButton() {

    }
    render() {

        return (
            <div>
                <button onClick={(e) => this.deleteRow(1, e)}>Delete Row</button>
                <button onClick={this.deleteRow.bind(this, 2)}>Delete Row</button>
            </div>


        )
    }
}

ReactDOM.render(
    <List />,
    document.getElementById('root')
);
