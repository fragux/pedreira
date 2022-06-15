import React, { Component } from "react";
/*import { Media } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText ,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import DropdownMaquina from './DropDownMaquina';
import ListaComponent from './ListaComponent';*/
import { Button, Modal, ModalHeader, ModalBody, Form, Input } from "reactstrap";
import "./SubHeaderComponent.css";
//import { Control, LocalForm } from 'react-redux-form';

class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maquinas: [],
      key: 1,
      isClicked: false,
      timeTotal: this.props.timeTotal,
      currentMode: "",
      isModalOpen: false,
      isModalConfigOpen: false,
      currentTime: false,
    };
    //this.currentMode ='dia';
    this.getTimePeriod = this.getTimePeriod.bind(this);
    this.timeTotal = this.props.timeTotal;
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalConfig = this.toggleModalConfig.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectTime = this.handleSelectTime.bind(this);
  }
  handleSubmit(values) {
    this.toggleModalConfig();
    //this.props.postComment(this.props.dishId, values.rating, values.comment);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  toggleModalConfig() {
    this.setState({
      isModalConfigOpen: !this.state.isModalConfigOpen,
    });
  }
  componentDidMount(){
    this.setState({currentMode : "dia"})
  }

  getTimePeriod(modo) {
    console.log("Estado actual: ", modo);
    //this.handleSelect(1, this.currentMode);
    this.setState({ currentMode: modo});
    switch (modo) {
      case "dia":
        return this.setState({ currentMode: modo });
      case "semana":
        return this.setState({ currentMode: modo});
      case "mes":
        return this.setState({ currentMode: modo });
      default:
        return;
    }
  }

  handleSelect(key, timePeriod) {
    console.log("Periodo selecionado:", timePeriod);
    this.getTimePeriod(timePeriod);
    this.currentMode = timePeriod;
    this.setState({
      isClicked: true,
      currentMode: this.currentMode,
    });
    //props.parentCallback(this.state.timeTotal)
    this.props.timePeriod(this.currentMode);
  }

  handleSelectTime() {
    this.setState((state) => ({
      currentTime: !state.currentTime,
    }));
    console.log("SELECTED REAL YES/NO?:  ", !this.state.currentTime);
    this.props.realTime(!this.state.currentTime);
  }

  render() {
    //console.log(this.currentMode);
    return (
      <div className="container-subheader" >
        <div className="row-subheader" >
          <div className="buttons" eventkey={this.state.currentMode} eventkeyActive = "dia">
            <button
              eventkey={"dia"}
              onClick={() => this.handleSelect(1, "dia")}
              className={"dia" + (this.state.currentMode === "dia" ? " active" : "")}
            >
              Dia
            </button>
            <button
              eventkey={"semana"}
              onClick={() => this.handleSelect(2, "semana")}
              className={
                "semana" + (this.state.currentMode === "semana" ? " active" : "")
              }
            >
              Semana
            </button>
            <button
              eventkey={"mes"}
              onClick={() => this.handleSelect(3, "mes")}
              className={"mes" + (this.state.currentMode === "mes" ? " active" : "")}
            >
              Mês
            </button>
          </div>
          <div className="time">
            {/* Tempo Funcionamento: <h5 className="horas"> {this.state.timeTotal}</h5>
            <button
              onClick={() => this.handleSelectTime()}
              className={
                "realtime" + (this.state.currentTime === true ? " active" : "")
              }
            >
              Real Time
              <span
                className={
                  "span" + (this.state.currentTime === true ? " active" : "")
                }
              ></span>
            </button>*/}
          </div>
          <div className="buttons" eventkey={this.state.key}>
            <button eventkey={1} onClick={this.toggleModal} className="erros">
              Erros
            </button>
            <button
              eventkey={3}
              onClick={this.toggleModalConfig}
              className="configurar"
            >
              Definições
            </button>
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              isOpen={this.state.isModalOpen}
              toggle={this.toggleModal}
              modalTransition={{ timeout: 500 }}
            >
              <ModalHeader toggle={this.toggleModal}>
                RELATÓRIO DE ERROS
              </ModalHeader>
              <ModalBody className="show-grid">
                <div className="row col-12">
                  <div className="col-xs-12 col-md-9 erro">
                    Erro da maquina - SOBREGACARGA CORRENTE{" "}
                  </div>
                  <div className="col-xs-6 col-md-2 codigo"> 000215 </div>

                  <div className="col-xs-12 col-md-9 erro">
                    Erro da maquina - SOBREGACARGA CORRENTE{" "}
                  </div>
                  <div className="col-xs-6 col-md-2 codigo"> 050230 </div>

                  <div className="col-xs-12 col-md-9 erro">
                    Erro da maquina - SOBREGACARGA CORRENTE{" "}
                  </div>
                  <div className="col-xs-6 col-md-2 codigo"> 000215 </div>

                  <div className="col-xs-12 col-md-9 erro">
                    Erro da maquina - SOBREGACARGA CORRENTE{" "}
                  </div>
                  <div className="col-xs-6 col-md-2 codigo"> 000215 </div>

                  <div className="col-xs-12 col-md-9 erro">
                    Erro da maquina - SOBREGACARGA CORRENTE{" "}
                  </div>
                  <div className="col-xs-6 col-md-2 codigo"> 056488 </div>

                  <div className="col-xs-12 col-md-9 erro">
                    Erro da maquina - SOBREGACARGA CORRENTE{" "}
                  </div>
                  <div className="col-xs-6 col-md-2 codigo"> 000215 </div>

                  <div className="col-xs-12 col-md-9 erro">
                    Erro da maquina - SOBREGACARGA CORRENTE{" "}
                  </div>
                  <div className="col-xs-6 col-md-2 codigo"> 000215 </div>
                </div>
              </ModalBody>
            </Modal>

            <Modal
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              isOpen={this.state.isModalConfigOpen}
              toggle={this.toggleModalConfig}
              modalTransition={{ timeout: 500 }}
            >
              <ModalHeader toggle={this.toggleModalConfig}>
                Configuração e Parametrização
              </ModalHeader>
              <ModalBody className="show-grid">
                <Form>
                  <div className="row col-12">
                    <div className="col-xs-12 col-md-7 cab">
                      Parâmetros a definir
                    </div>
                    <div className="col-xs-6 col-md-2 cab"> Valores</div>
                    <div className="col-xs-3 col-md-2 cab"> Notificar</div>

                    <div className="col-xs-12 col-md-7 linha">
                      <h6>Peças produzidas:</h6>
                    </div>
                    <div className="col-xs-6 col-md-3 linha">
                      {" "}
                      <Input
                        type="text"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-6 col-md-1 linha">
                      {" "}
                      <input
                        type="checkbox"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-12 col-md-7 linha">
                      <h6>Consumo Elétrico:</h6>
                    </div>
                    <div className="col-xs-6 col-md-3 linha ">
                      {" "}
                      <Input
                        type="text"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-6 col-md-1 linha">
                      {" "}
                      <input
                        type="checkbox"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-12 col-md-7 linha">
                      <h6>Funcionamento:</h6>
                    </div>
                    <div className="col-xs-6 col-md-3 linha ">
                      {" "}
                      <Input
                        type="text"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-6 col-md-1 linha">
                      {" "}
                      <input
                        type="checkbox"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-12 col-md-7 linha">
                      <h6>Velocidade do Fio:</h6>
                    </div>
                    <div className="col-xs-6 col-md-3 linha ">
                      {" "}
                      <Input
                        type="text"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-6 col-md-1 linha">
                      {" "}
                      <input
                        type="checkbox"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-12 col-md-7 linha">
                      <h6>Lubrificação:</h6>
                    </div>
                    <div className="col-xs-6 col-md-3 linha ">
                      {" "}
                      <Input
                        type="text"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                    <div className="col-xs-6 col-md-1 linha">
                      {" "}
                      <input
                        type="checkbox"
                        className="param"
                        id="peças"
                        name="peças"
                        innerRef={(input) => (this.peças = input)}
                      />
                    </div>
                  </div>
                  <div className="guardar">
                    <Button
                      type="submit"
                      value="submit"
                      color="secondary"
                      className="col-12"
                    >
                      Guardar
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default SubHeader;
