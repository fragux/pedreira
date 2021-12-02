import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';



class ListaComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            maquinas: [
                {
                  id: 0,
                  name:'MONOFIO NFC 2000',
                  image: '',
                  category: 'fio',
                  description:'Máquina de fio'
                },
               {
                  id: 1,
                  name:'LOUSADA 2000',
                  image: '',
                  category: 'corte',
                  description:'Máquina com disco de corte' 
                }
               ],
            isListOpen: false,
            headerTitle: this.props.title
        };
    }
    toggleList = () => {
        this.setState(prevState => ({
          isListOpen: !prevState.isListOpen
       }))
     }
     selectItem = (item) => {
        const { resetThenSet } = this.props;
        const { title, id, key } = item;
      
        this.setState({
          headerTitle: title,
          isListOpen: false,
        }, () => resetThenSet(id, key));
      }
    

    render() {
        const { isListOpen, headerTitle } = this.state;
        const { list } = this.props;
      
        return (
          <div className="dd-wrapper">
            <button
              type="button"
              className="dd-header"
              onClick={this.toggleList}
            >
              <div className="dd-header-title">{headerTitle}</div>
              {isListOpen
                ? <FontAwesome name="angle-up" size="2x" />
                : <FontAwesome name="angle-down" size="2x" />}
            </button>
            {isListOpen && (
              <div
                role="list"
                className="dd-list"
              >
                {list.map((item) => (
                  <button
                    type="button"
                    className="dd-list-item"
                    key={item.id}
                    onClick={() => this.selectItem(item.name)}
                  >
                    {item.title}
                    {' '}
                    {item.selected && <FontAwesome name="check" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      }
}

export default ListaComponent;