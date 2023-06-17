import React, { useEffect, useState, Fragment } from "react";
import useStyles from "./style";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getUsers,
  getCategories,
  updateProvider,
} from "../../../redux/admin/admin-slice";
import { User } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import { INPUT_TEXT } from "../../../styling/styling";

const Users: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { users, categories, loading } = useAppSelector(state => state.admin);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCategories());
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Entretien Campus France"
  );
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(username: string) {
    setIsOpen(true);
    setSelectedUser(username);
  }

  function submitAndClose() {
    if (selectedUser) {
      dispatch(
        updateProvider({
          username: selectedUser,
          categoryTitle: selectedCategory,
        })
      );
    }
    closeModal();
    //dispatch(getProviders());
  }
  return (
    <>
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
                    Confirm Upgrade Account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please select a category
                    </p>
                    <select
                      name="categoryTitle"
                      id="categoryTitle"
                      style={{
                        ...INPUT_TEXT,
                      }}
                      onChange={onChangeSelect}
                      value={selectedCategory}
                    >
                      {categories.map(category => (
                        <option
                          key={category.categoryId}
                          value={category.title}
                        >
                          {category.title}
                        </option>
                      ))}
                    </select>
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
                      Yes, I confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className={classes.page}>
        <div className="content">
          <h3>Users</h3>
          <table className="table text-left">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Upgrade</th>
              </tr>
            </thead>
            <tbody>
              {!loading && users.length > 0 ? (
                users.map((user: User) => (
                  <tr>
                    <td>{user.userId}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.authorities.some(
                        authority => authority.authority === "ADMIN"
                      ) ? (
                        <button className="btn-admin">Admin</button>
                      ) : user.authorities.some(
                          authority => authority.authority === "PROVIDER"
                        ) ? (
                        <button className="btn-provider">Provider</button>
                      ) : (
                        <button className="btn-user">User</button>
                      )}
                    </td>
                    <td>
                      {user.authorities.some(
                        authority => authority.authority === "ADMIN"
                      ) ||
                      user.authorities.some(
                        authority => authority.authority === "PROVIDER"
                      ) ? null : (
                        <button
                          className="button-primary"
                          onClick={() => openModal(user.username)}
                        >
                          {"Upgrade!"}{" "}
                          <FontAwesomeIcon
                            className="ml-1"
                            icon={faArrowAltCircleRight}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
