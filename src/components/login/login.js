import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './loginmodal';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';


export function LoginModal () {

    return (
      <div className="container-entrada_login">
        <Login/>

        <div className="vertical-center_login">
         
          <Button
            color="danger" data-toggle="modal" data-target="#loginModal"
            onClick={function noRefCheck() { } }
          >
            Login
          </Button>
          <Modal
            toggle={function noRefCheck() { } }
          >
            <ModalHeader toggle={function noRefCheck() { } }>
              Login
            </ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={function noRefCheck() { } }
              >
                Login
              </Button>
              {' '}
              <Button onClick={function noRefCheck() { } }>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
          )

          }