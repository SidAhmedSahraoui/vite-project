import React from "react";
import useStyles from "./style";
import { AddCategorySchema } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { addCategory } from "../../../redux/admin/admin-slice";
import { setAlert } from "../../../redux/error/error-slice";
const AddCategories: React.FC = () => {
  const classes = useStyles();
  const [category, setCategory] = React.useState<AddCategorySchema>({
    title: "",
    type: 0,
    description: "",
    space: 0,
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCategory({ ...category, title: e.target.value });

  const handleChangeSelectSpace = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory({ ...category, space: parseInt(e.target.value) });

  const handleChangeSelectType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory({ ...category, type: parseInt(e.target.value) });

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCategory({ ...category, description: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category.title === "") {
      dispatch(setAlert("Title is required", "danger"));
      return;
    }
    if (category.description === "") {
      dispatch(setAlert("Description is required", "danger"));
      return;
    }
    dispatch(addCategory(category));
  };
  return (
    <>
      <div className={classes.page}>
        <h3>Add Categories</h3>
        <div className="content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="category">Category title</label>
              <input
                type="text"
                id="category"
                name="category"
                onChange={handleChange}
                placeholder="Category title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                onChange={handleChangeTextArea}
                placeholder="Description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="space">Type</label>
              <select onChange={handleChangeSelectType} id="space" name="space">
                <option value={0}>Hiring</option>
                <option value={1}>Study</option>
                <option value={2}>Training</option>
                <option value={3}>Part Time</option>
                <option value={4}>Others</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="space">Space</label>
              <select
                onChange={handleChangeSelectSpace}
                id="space"
                name="space"
              >
                <option value={0}>Interview</option>
                <option value={1}>Consultation</option>
                <option value={2}>Sharing Experience</option>
              </select>
            </div>
            <div className="form-btn">
              <button type="submit">Add Category</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategories;
