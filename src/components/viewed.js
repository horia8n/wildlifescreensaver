import React, {Component} from 'react';

class Viewed extends Component {

    constructor(){
        super();
        this.state = {
            viewed: 'loading'
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({viewed: this.props.data.viewed});
        }, 400);
    }

    render(){
        console.log('Viewed: ', this.props);
        if (this.state.viewed === 'loading') {
            return <div className="wait"><img src="img/wait7.gif" alt="wait"/></div>;
        }
        const listItems = [];
        const localPics = 'http://wayagent.com/MasterOntario/';
        // const localPics = 'http://wayagent.localhost/MasterOntario/';
        this.state.viewed.forEach(item => {
            if (item['Existent'] === '1') {
                listItems.push(<li className="item" onClick={() => this.props.listClick(item['ID'])}>
                    <div>
                        <span>{item['CommonName']} </span>
                        <span>{item['LatinName']} </span>
                    </div>
                    <div className="rankID10 filterpictures">
                        <img src={localPics + item.ID + '_0.jpeg'} alt="img"/>
                        <img src={localPics + item.ID + '_1.jpeg'} alt="img"/>
                        <img src={localPics + item.ID + '_2.jpeg'} alt="img"/>
                    </div>
                </li>);
            }
        });
        return (
            <div className="viewedWrap">
                <ul className="list">
                    {listItems}
                </ul>
            </div>
        );
    }

}

export default Viewed;
