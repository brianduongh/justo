import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";


// import freelancers from "../../freelancers.json";


class Upload extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
    }

    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
  
      return (
        <div>
  
          <Button onClick={this.handleShow}>
            Upload Profile Photo
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div>
                    <form method="post" enctype="multipart/form-data" action={`/account/${this.props.id}`}>
                        <input type="file" name="file"/>
                        <input type="submit" value="Submit"/>
                    </form>
                    

                </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

export default Upload;


  
