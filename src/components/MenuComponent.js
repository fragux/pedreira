import React, { Component } from "react";
import "../components/MenuComponent.css";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMaquina: this.props.maquina,
    };
    console.log("Menu maquina: " + this.props.maquina);
  }

  onMaquinaSelect(maquina) {
    this.setState({ selectedMaquina: maquina });
  }

  renderMaquina(maquina) {
    if (maquina != null)
      return (
        <Card className="card-view">
          <CardBody>
            <CardTitle>&#9881;</CardTitle>
            <CardTitle>
              <h5>{maquina.name}</h5>
            </CardTitle>
            <CardText>{maquina.description}</CardText>
            <CardText>
              Peças Produzidas:<h4>3</h4>
              Tensão do Fio:<h4>45N</h4>
              Consumo Água:<h4>300L</h4>
              Tempo Lubrificação:<h4>30H</h4>
              Velocidade do Fio:<h4>3500rpm</h4>
              Consumo Corrente:<h4>30A</h4>
            </CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  render() {
    const menu = this.props.maquina.map((maquina) => {
      console.log(menu);
      return (
        <Card
          className="col-12 col-md-4 m-1"
          style={{ width: "15rem" }}
          key={maquina.id}
          onClick={() => this.onMaquinaSelect(maquina)}
        >
          <CardTitle className="card-box-header">
            &#9881;{maquina.name}
          </CardTitle>
        </Card>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="card-box col-12 col-md-4 m-1">
          {this.renderMaquina(this.state.selectedMaquina)}
        </div>
      </div>
    );
  }
}

export default Menu;
