import React from "react";
import { Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import useStyles from "./style";

interface Props {
  show: boolean;
  message: string;
  loadingSend: boolean;
  onHide: () => void;
  handleMessageOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sendMessage: () => void;
}

const DialogMessage: React.FC<Props> = props => {
  const classes = useStyles();

  const {
    show,
    message,
    loadingSend,
    onHide,
    handleMessageOnChange,
    sendMessage,
  } = props;
  return (
    <>
      <Modal
        className={`${classes.dialog}`}
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Body className="text-center py-4">
          <FontAwesomeIcon className="icon mr-2" icon={faEnvelope} />
          <h5 className="title">Send a message</h5>

          <textarea
            className="form-control mt-3"
            rows={4}
            value={message}
            disabled={loadingSend}
            onChange={handleMessageOnChange}
          />

          <button
            className="button-primary mt-3"
            disabled={loadingSend}
            onClick={sendMessage}
          >
            <FontAwesomeIcon className="mr-2" icon={faPaperPlane} />
            {loadingSend ? "Sending..." : "Send"}
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DialogMessage;
