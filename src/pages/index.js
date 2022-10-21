import React from 'react';
import firebase from '../firebase';

export class App extends React.Component {

constructor (props) {

    super(props);

    this.state = {questIdslist: []}
    }

    componentDidMount() {
        firebase.database().ref("questId-list").on("value", snapshot => {
            let questIdlist = [];
            snapshot.forEach(snap => {
                questIdlist.push(snap.val());
            });
            this.setState( {questIdslist: questIdlist });
        });

}
    
    render() {
    return (
        <div className='MainDiv'>
            <div>
                <h3>Words</h3>
            </div>

            <div className="container">
                <table id="example">
                    <thead>
                        <tr>
                            <th>Field 1</th>
                            <th>Field 2</th>
                            <th>Field 3</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.questIdslist.map(data => {
                        return (
                            <tr>
                            <td>{data.questId}</td>
                            </tr>
                        );
                    })}


                    </tbody>
                </table>
            </div>
        </div>
    )
    }
}