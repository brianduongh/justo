import React from "react";
import "./style.css";
import { Modal, Button } from "react-bootstrap";

class AddUser extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false
    };
  }

  handleHide() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div className="img-card" xs={12} sm={12} md={4}> 

        <div>
          <button onClick={() => this.setState({ show: true })} className="button-refresh">
              <img src="images/user.png" />
          </button>
        </div>

        <div className="modal-container" style={{ height: 200 }}>

          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Add User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Enter the Justo ID of the user you would like to add:
              <form style={{ marginTop:"10px" }}>
                <input type="text" placeholder="Justo ID" name="add_id" />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>

      </div>
    );
  }
}

export default AddUser;
