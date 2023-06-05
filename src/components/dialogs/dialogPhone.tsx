import React from "react";
import { Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

import Spinner from "../spinner";

import useStyles from "./style";

interface Props {
  show: boolean;
  phone: string;
  onHide: () => void;
  loading: boolean;
}

const DialogPhone: React.FC<Props> = props => {
  const classes = useStyles();

  const { show, phone, onHide, loading } = props;

  return (
    <>
      <Modal
        className={`${classes.dialog}`}
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Body className="text-center py-4">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <FontAwesomeIcon className="icon mr-2" icon={faPhoneAlt} />
              <h5 className="title">Phone number</h5>
              <span className="phone-number">{phone}</span>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DialogPhone;
