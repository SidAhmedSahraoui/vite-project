import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
// Actions
import { useAppDispatch } from "../../redux/hooks";
import { loadProvider } from "../../redux/categories/categories-slice";

// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";
import { useParams } from "react-router-dom";

// Styles
import useStyles from "./style";

const BookingPage: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const [days, setDays] = useState(Array<any>());

  const [slots, setSlots] = useState(Array<any>());
  useEffect(() => {
    dispatch(loadProvider(id || ""));

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Booking`}</title>
      </Helmet>
      <div className={`${classes.page} card-shadow text-center`}>
        <div className="head">
          <h3 className="title">Booking Info</h3>
        </div>

        <div className="content mt-5">
          <>
            <div className="section basic-info mt-4">
              <h5 className="title text-left mt-2">
                Select a time slot for the interview
              </h5>
            </div>
          </>
          <div className="days">
            {days.map(day => (
              <div className="card" key={day.dayId}>
                <div className="card-body">{`${day.dayName[0]}${day.dayName.to}`}</div>
              </div>
            ))}
          </div>
          <div className="slots">
            {slots.map(slot => (
              <div className="row" key={slot.timeSlotId}>
                <div className="col-slots">
                  <div className="card">
                    <div className="card-body">
                      {`from ${slot.startsAt} to ${slot.endsAt}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
