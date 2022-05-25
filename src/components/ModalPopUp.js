import React, { Component, Fragment } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class ModalPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  isShowModal = (status) => {
    this.handleClose();
    this.setState({ showModal: status });
  };

  handleClose = () => {
    this.props.onPopupClose(false);
  };

  render() {
    return (
      <Fragment>
        <Modal
          show={this.props.showModalPopup}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader closeButton></ModalHeader>
          <ModalBody>
            <hr />
            <div className="signUp">
              <p>
                Want to close the pop up?
                <button
                  type="button"
                  className="link-button"
                  onClick={() => this.isShowModal(true)}
                >
                  {" "}
                  Close
                </button>
              </p>
            </div>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default ModalPopUp;
