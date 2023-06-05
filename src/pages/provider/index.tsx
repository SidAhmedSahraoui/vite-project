import React, { useState, Fragment, useEffect } from "react";
import useStyles from "./style";
import { Helmet } from "react-helmet";
import { WEBSITE_NAME } from "../../utils/websiteData";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styling/colors";
import { Dialog, Transition } from "@headlessui/react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Provider: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { user, planning } = useAppSelector(state => state.auth);
  const [daysPlan, setDaysPlan] = useState([
    { id: 1, day: "Sunday", active: false },
    { id: 2, day: "Monday", active: false },
    { id: 3, day: "Tuesday", active: false },
    { id: 4, day: "Wednesday", active: false },
    { id: 5, day: "Thursday", active: false },
    { id: 6, day: "Friday", active: false },
    { id: 7, day: "Saturday", active: false },
  ]);

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const closeAndSave = () => {
    setIsOpen(true);
    let days = daysPlan.filter(day => day.active === true);
    let daysAvailability = days.map(day => day.id);
    let slots = timeSlots.filter(slot => slot.active === true);
    let slotsAvailability = slots.map(slot => slot.id);
    console.log(daysAvailability, slotsAvailability, user);
    addPlanning({
      email: user?.email || "",
      token: localStorage.getItem("token"),
      daysAvailability,
      slotsAvailability,
    });

    window.location.href = "/";
  };
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startsAt: "00:00", endsAt: "00:30", active: false },
    { id: 2, startsAt: "00:30", endsAt: "01:00", active: false },
    { id: 3, startsAt: "01:00", endsAt: "01:30", active: false },
    { id: 4, startsAt: "01:30", endsAt: "02:00", active: false },
    { id: 5, startsAt: "02:00", endsAt: "02:30", active: false },
    { id: 6, startsAt: "02:30", endsAt: "03:00", active: false },
    { id: 7, startsAt: "03:00", endsAt: "03:30", active: false },
    { id: 8, startsAt: "03:30", endsAt: "04:00", active: false },
    { id: 9, startsAt: "04:00", endsAt: "04:30", active: false },
    { id: 10, startsAt: "04:30", endsAt: "05:00", active: false },
    { id: 11, startsAt: "05:00", endsAt: "05:30", active: false },
    { id: 12, startsAt: "05:30", endsAt: "06:00", active: false },
    { id: 13, startsAt: "06:00", endsAt: "06:30", active: false },
    { id: 14, startsAt: "06:30", endsAt: "07:00", active: false },
    { id: 15, startsAt: "07:00", endsAt: "07:30", active: false },
    { id: 16, startsAt: "07:30", endsAt: "08:00", active: false },
    { id: 17, startsAt: "08:00", endsAt: "08:30", active: false },
    { id: 18, startsAt: "08:30", endsAt: "09:00", active: false },
    { id: 19, startsAt: "09:00", endsAt: "09:30", active: false },
    { id: 20, startsAt: "09:30", endsAt: "10:00", active: false },
    { id: 21, startsAt: "10:00", endsAt: "10:30", active: false },
    { id: 22, startsAt: "10:30", endsAt: "11:00", active: false },
    { id: 23, startsAt: "11:00", endsAt: "11:30", active: false },
    { id: 24, startsAt: "11:30", endsAt: "12:00", active: false },
    { id: 25, startsAt: "12:00", endsAt: "12:30", active: false },
    { id: 26, startsAt: "12:30", endsAt: "13:00", active: false },
    { id: 27, startsAt: "13:00", endsAt: "13:30", active: false },
    { id: 28, startsAt: "13:30", endsAt: "14:00", active: false },
    { id: 29, startsAt: "14:00", endsAt: "14:30", active: false },
    { id: 30, startsAt: "14:30", endsAt: "15:00", active: false },
    { id: 31, startsAt: "15:00", endsAt: "15:30", active: false },
    { id: 32, startsAt: "15:30", endsAt: "16:00", active: false },
    { id: 33, startsAt: "16:00", endsAt: "16:30", active: false },
    { id: 34, startsAt: "16:30", endsAt: "17:00", active: false },
    { id: 35, startsAt: "17:00", endsAt: "17:30", active: false },
    { id: 36, startsAt: "17:30", endsAt: "18:00", active: false },
    { id: 37, startsAt: "18:00", endsAt: "18:30", active: false },
    { id: 38, startsAt: "18:30", endsAt: "19:00", active: false },
    { id: 39, startsAt: "19:00", endsAt: "19:30", active: false },
    { id: 40, startsAt: "19:30", endsAt: "20:00", active: false },
    { id: 41, startsAt: "20:00", endsAt: "20:30", active: false },
    { id: 42, startsAt: "20:30", endsAt: "21:00", active: false },
    { id: 43, startsAt: "21:00", endsAt: "21:30", active: false },
    { id: 44, startsAt: "21:30", endsAt: "22:00", active: false },
    { id: 45, startsAt: "22:00", endsAt: "22:30", active: false },
    { id: 46, startsAt: "22:30", endsAt: "23:00", active: false },
    { id: 47, startsAt: "23:00", endsAt: "23:30", active: false },
    { id: 48, startsAt: "23:30", endsAt: "00:00", active: false },
  ]);

  const [slots, setSlots] = useState({
    startsAt: 0,
    endsAt: 0,
  });
  const { startsAt, endsAt } = slots;

  const onChange = e => {
    setSlots({ ...slots, [e.target.name]: +e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (startsAt === 0 || endsAt === 0) {
      toast("Please select time slot", {
        icon: <FontAwesomeIcon icon={faCircleInfo} />,
        style: {
          borderRadius: "10px",
          background: colors.danger,
          fontWeight: 500,
          fontSize: "1.2rem",
          color: "#fff",
        },
      });
      return;
    } else if (startsAt > endsAt) {
      toast("Start time must be less than end time", {
        icon: <FontAwesomeIcon icon={faCircleInfo} />,
        style: {
          borderRadius: "10px",
          background: colors.danger,
          fontWeight: 500,
          fontSize: "1.2rem",
          color: "#fff",
        },
      });
    } else if (!daysPlan.some(day => day.active === true)) {
      toast("Please select at least one day", {
        icon: <FontAwesomeIcon icon={faCircleInfo} />,
        style: {
          borderRadius: "10px",
          background: colors.danger,
          fontWeight: 500,
          fontSize: "1.2rem",
          color: "#fff",
        },
      });
    } else {
      let slots = timeSlots.map(slot => {
        slot.active = false;
        return slot;
      });

      for (let i = startsAt; i <= endsAt; i++) {
        // eslint-disable-next-line array-callback-return
        slots.filter(slot => {
          if (slot.id === i) {
            slot.active = true;
          }
        });
      }
      setTimeSlots(slots);
      openModal();
    }
  };

  useEffect(() => {
    if (user && user.email) {
      getProviderByEmail(user.email);
    }
    console.log(planning);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
                      onClick={closeAndSave}
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

        <div className="content mt-5 mb-5">
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
            {daysPlan.map(day => (
              <div
                key={day.id}
                className={`postitem postitem-card p-3 mb-4 ${
                  day.active ? "active" : ""
                }`}
                onClick={() => {
                  const newDays = daysPlan.map(d => {
                    if (d.day === day.day) {
                      return { ...d, active: !d.active };
                    }
                    return d;
                  });
                  setDaysPlan(newDays);
                }}
              >
                {day.day}
              </div>
            ))}
          </div>
          <h4 className="post-title">Work Shift</h4>

          <div className="posts mt-3 work-shift">
            <div className="form-group">
              <label htmlFor="startsAt" className="input-label">
                Start Time
              </label>
              <select
                id="startsAt"
                name="startsAt"
                value={startsAt}
                onChange={onChange}
                className="custom-select input-select input-text"
              >
                <option value={0}>Select Time To Start</option>
                {timeSlots.map(slot => (
                  <option key={slot.id} value={slot.id}>
                    {slot.startsAt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="endsAt" className="input-label">
                End Time
              </label>
              <select
                id="endsAt"
                name="endsAt"
                value={endsAt}
                onChange={onChange}
                className="custom-select input-select input-text"
              >
                <option value={0}>Select Time To End</option>
                {timeSlots.map(slot => (
                  <option key={slot.id} value={slot.id}>
                    {slot.endsAt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="posts" style={{ marginTop: "48px" }}>
            <button onClick={onSubmit} className="button-primary-outline">
              Save Work Plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Provider;
