import React, { useState, useEffect, Fragment } from "react";
import Helmet from "react-helmet";
// Actions
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getPlanning } from "../../redux/planning/planning-slice";

// Utils
import { WEBSITE_NAME } from "../../utils/websiteData";
import { useParams } from "react-router-dom";

// Styles
import useStyles from "./style";
import "react-day-picker/dist/style.css";

// Calendar
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

// Components
import Spinner from "../../components/spinner";
import { RadioGroup, Tab } from "@headlessui/react";
import { Row } from "react-bootstrap";
import clsx from "clsx";

const BookingPage: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { planning, loading } = useAppSelector(state => state.planning);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPlanning(id || ""));
    //eslint-disable-next-line
  }, [id]);

  const [selected, setSelected] = useState<Date>();
  const [formatedDate, setFormatedDate] = useState<string>("");
  const [plan, setPlan] = useState<number>(0);

  const onBookInterview = () => {
    console.log(formatedDate, plan);
  };

  useEffect(() => {
    setFormatedDate(format(selected || new Date(), "yyyy-MM-dd"));
    //eslint-disable-next-line
  }, [selected]);
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
                Select a date for the interview
              </h5>
            </div>
          </>
          <Row className="pick">
            <div className="days">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                footer={false}
              />
            </div>
            <div className="slots">
              {!loading ? (
                <Tab.Group>
                  <Tab.List className="tab-list">
                    <Tab className="page">Page 1</Tab>
                    <Tab className="page">Page 2</Tab>
                    <Tab className="page">Page 3</Tab>
                  </Tab.List>
                  <Tab.Panels className="radio-group">
                    <Tab.Panel>
                      <RadioGroup
                        className="radio-group"
                        value={plan}
                        onChange={setPlan}
                      >
                        {planning?.slots.map(
                          slot =>
                            slot.timeSlotId > 0 &&
                            slot.timeSlotId < 16 && (
                              <Fragment key={slot.timeSlotId}>
                                <RadioGroup.Option
                                  className={clsx("radio-option", {
                                    "bg-selected": plan === slot.timeSlotId,
                                    "bg-not-selected": plan !== slot.timeSlotId,
                                  })}
                                  value={slot.timeSlotId}
                                >
                                  <span>
                                    From {slot.startsAt.substring(0, 5)} to{" "}
                                    {slot.endsAt.substring(0, 5)}
                                  </span>
                                </RadioGroup.Option>
                              </Fragment>
                            )
                        )}
                      </RadioGroup>
                    </Tab.Panel>
                    <Tab.Panel>
                      <RadioGroup
                        className="radio-group"
                        value={plan}
                        onChange={setPlan}
                      >
                        {planning?.slots.map(
                          slot =>
                            slot.timeSlotId > 15 &&
                            slot.timeSlotId < 33 && (
                              <Fragment key={slot.timeSlotId}>
                                <RadioGroup.Option
                                  className={clsx("radio-option", {
                                    "bg-selected": plan === slot.timeSlotId,
                                    "bg-not-selected": plan !== slot.timeSlotId,
                                  })}
                                  value={slot.timeSlotId}
                                >
                                  <span>
                                    From {slot.startsAt.substring(0, 5)} to{" "}
                                    {slot.endsAt.substring(0, 5)}
                                  </span>
                                </RadioGroup.Option>
                              </Fragment>
                            )
                        )}
                      </RadioGroup>
                    </Tab.Panel>
                    <Tab.Panel>
                      {" "}
                      <RadioGroup
                        className="radio-group"
                        value={plan}
                        onChange={setPlan}
                      >
                        {planning?.slots.map(
                          slot =>
                            slot.timeSlotId > 32 && (
                              <Fragment key={slot.timeSlotId}>
                                <RadioGroup.Option
                                  className={clsx("radio-option", {
                                    "bg-selected": plan === slot.timeSlotId,
                                    "bg-not-selected": plan !== slot.timeSlotId,
                                  })}
                                  value={slot.timeSlotId}
                                >
                                  <span>
                                    From {slot.startsAt.substring(0, 5)} to{" "}
                                    {slot.endsAt.substring(0, 5)}
                                  </span>
                                </RadioGroup.Option>
                              </Fragment>
                            )
                        )}
                      </RadioGroup>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              ) : (
                <Spinner />
              )}
            </div>
          </Row>
          <div className="section basic-info mt-4">
            <button onClick={onBookInterview} className="btn btn-primary">
              Book interview
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
