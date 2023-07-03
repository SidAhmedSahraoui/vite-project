import React from "react";
import { Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowDown,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

import useStyles from "./style";

interface Props {
  show: boolean;
  phone: string;
  onHide: () => void;
}

const DialogPhone: React.FC<Props> = props => {
  const classes = useStyles();

  const { show, phone, onHide } = props;

  return (
    <>
      <Modal
        className={`${classes.dialog}`}
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Body className="text-center py-4">
          {!phone ? (
            <>
              <FontAwesomeIcon className="icon mr-2" icon={faCircleArrowDown} />
              <h5 className="title">No phone number available</h5>
            </>
          ) : (
            <>
              <FontAwesomeIcon className="icon mr-2" icon={faPhoneAlt} />
              <h5 className="title">Numero de téléphone</h5>
              <span className="phone-number">{phone}</span>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DialogPhone;
