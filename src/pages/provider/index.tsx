import React, { useState, Fragment, useEffect } from "react";
import useStyles from "./style";
import { Helmet } from "react-helmet";
import { WEBSITE_NAME } from "../../utils/websiteData";
import { Dialog, Transition } from "@headlessui/react";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getDays,
  getSlots,
  getPlanning,
  addPlanning,
  addError,
} from "../../redux/planning/planning-slice";
import { loadUser } from "../../redux/auth/auth-slice";
// Types
import { AddPlanningSchema } from "../../types";
import { setAlert } from "../../redux/error/error-slice";

const Provider: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { planning, days, slots, error } = useAppSelector(
    state => state.planning
  );
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const [requestToSend, setRequestToSend] = useState<AddPlanningSchema>({
    token: "",
    email: "",
    daysAvailability: [],
    slotsAvailability: [],
  });

  const [daysAvailability, setDaysAvailability] = useState<Array<number>>([]);
  const [timing, setTiming] = useState({
    start: 0,
    end: 0,
  });
  const { start, end } = timing;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTiming({
      ...timing,
      [e.target.name]: +e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (start === 0 || end === 0) {
      dispatch(addError("Please select start and end time"));
    } else if (daysAvailability.length === 0) {
      dispatch(addError("Please select at least one day"));
    } else {
      const slots = Array<number>();
      for (let i = start; i <= end; i++) {
        slots.push(+i);
      }
      const token = localStorage.getItem("token");
      const email = user?.email;
      if (token && email) {
        const request: AddPlanningSchema = {
          token,
          email,
          daysAvailability: daysAvailability,
          slotsAvailability: slots,
        };
        setRequestToSend(request);
        openModal();
        //dispatch(addPlanning(request));
      } else {
        dispatch(addError("Please login to add planning"));
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function submitAndClose() {
    dispatch(addPlanning(requestToSend));
    closeModal();
    dispatch(setAlert("Planning added successfully", "success"));
  }
  useEffect(() => {
    dispatch(getDays());
    dispatch(getSlots());
    if (!isAuthenticated) {
      dispatch(loadUser());
    } else {
      dispatch(getPlanning(user?.username as string));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error.length > 0) {
      error.forEach(element => {
        dispatch(setAlert(element.message, "danger"));
      });
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Planning`}</title>
      </Helmet>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          style={{ position: "relative", zIndex: 10 }}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
          </Transition.Child>

          <div
            style={{
              overflowY: "auto",
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "1rem",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
              }}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{
                    overflow: "hidden",
                    padding: "1.5rem",
                    backgroundColor: "#ffffff",
                    transitionProperty: "all",
                    textAlign: "left",
                    verticalAlign: "middle",
                    width: "100%",
                    maxWidth: "28rem",
                    borderRadius: "1rem",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Dialog.Title
                    as="h3"
                    style={{
                      color: "#111827",
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      lineHeight: "1.5rem",
                    }}
                  >
                    Confirm Work Shift
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure
                      <br />
                      You want to confirm this work shift.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      style={{
                        display: " inline-flex",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        backgroundColor: "#DBEAFE",
                        color: "#1E3A8A",
                        fontSize: "0.875rem",
                        lineHeight: "1.25rem",
                        fontWeight: "500",
                        justifyContent: "center",
                        borderRadius: "0.375rem",
                        borderWidth: "1px",
                        borderColor: "transparent",
                      }}
                      onClick={submitAndClose}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className={`${classes.page} card-shadow text-center`}>
        <div className="head">
          <h3 className="title">Provider Planning</h3>
          <h6 className="subtitle">
            Change days and time slots to be flexible
          </h6>
        </div>

        <form onSubmit={onSubmit} className="content mt-5 mb-5">
          <h4 className="post-title">Current Work Shift</h4>
          <div className="posts-sub-title mt-3">
            You are currently available from :{" "}
            {planning && planning.days && planning.days.length > 0
              ? planning.days
                  .reduce((minObj, currentObj) =>
                    currentObj.dayId < minObj.dayId ? currentObj : minObj
                  )
                  .dayName.toLowerCase() +
                " to " +
                planning.days
                  .reduce((maxObj, currentObj) =>
                    currentObj.dayId > maxObj.dayId ? currentObj : maxObj
                  )
                  .dayName.toLowerCase()
              : "No work days yet"}
          </div>
          <div className="posts-sub-title mt-3">
            Time to schedule interviews from :{" "}
            {planning && planning.slots && planning.slots.length > 0
              ? planning.slots
                  .reduce((minObj, currentObj) =>
                    currentObj.startsAt < minObj.startsAt ? currentObj : minObj
                  )
                  .startsAt.substring(0, 5) +
                " to " +
                planning.slots
                  .reduce((maxObj, currentObj) =>
                    currentObj.endsAt > maxObj.endsAt ? currentObj : maxObj
                  )
                  .endsAt.substring(0, 5)
              : "No work days yet"}
          </div>

          <h4 className="post-title">Work Days</h4>

          <div className="posts mt-3">
            {days.map(day => (
              <div
                key={day.dayId}
                className={`postitem postitem-card p-3 mb-4 ${
                  daysAvailability.some(num => num === day.dayId)
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  if (daysAvailability.some(num => num === day.dayId)) {
                    setDaysAvailability([
                      ...daysAvailability.filter(num => num !== day.dayId),
                    ]);
                  } else {
                    setDaysAvailability([...daysAvailability, day.dayId]);
                  }
                }}
              >
                {day.dayName}
              </div>
            ))}
          </div>
          <h4 className="post-title">Work Shift</h4>

          <div className="posts mt-3 work-shift">
            <div className="form-group">
              <label htmlFor="start" className="input-label">
                Start Time
              </label>
              <select
                id="start"
                name="start"
                value={start}
                onChange={onChange}
                className="custom-select input-select input-text"
              >
                <option value={0}>Select Time To Start</option>
                {slots.map(slot => (
                  <option key={slot.timeSlotId} value={slot.timeSlotId}>
                    {slot.startsAt.substring(0, 5)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="end" className="input-label">
                End Time
              </label>
              <select
                id="end"
                name="end"
                value={end}
                onChange={onChange}
                className="custom-select input-select input-text"
              >
                <option value={0}>Select Time To End</option>
                {slots.map(slot => (
                  <option key={slot.timeSlotId} value={slot.timeSlotId}>
                    {slot.endsAt.substring(0, 5)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="posts" style={{ marginTop: "48px" }}>
            <button type="submit" className="button-primary-outline">
              Save Work Plan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Provider;
