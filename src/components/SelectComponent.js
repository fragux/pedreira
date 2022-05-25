import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";

function RenderMenuItem({ maquina, onClick }) {
  return (
    <Card onClick={() => onClick(maquina.id)}>
      <CardTitle>{maquina.name}</CardTitle>
      <CardText>{maquina.description}</CardText>
    </Card>
  );
}

const Menu = (props) => {
  const menu = props.maquinas.map((maquina) => {
    return (
      <div className="col-12 col-md-5 m-1" key={maquina.id}>
        <RenderMenuItem maquina={maquina} onClick={props.onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row sub-header">
        <ul>{menu}</ul>
      </div>
    </div>
  );
};

export default Menu;
