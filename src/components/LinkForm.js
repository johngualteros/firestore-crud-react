import { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const LinkForm = ({ addOrEdit, currentId, links }) => {
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const validateUrl = (str) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      str
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUrl(values.url)) {
      return toast("Invalid URL", {
        type: "warning",
        autoClose: 200,
      });
    }
    addOrEdit(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
  };
  useEffect(() => {
    if (currentId === "") {
      setValues(initialStateValues);
    } else {
      getLinkById(currentId);
    }
  }, [currentId]);
  return (
    <form className="card card-body bg-primary" onSubmit={handleSubmit}>
      <div className="form-group input-group my-2">
        <div className="input-group-text bg-dark">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Paste a link here..."
          name="url"
          onChange={handleChange}
          value={values.url}
        />
      </div>

      <div className="form-group input-group my-2">
        <div className="input-group-text bg-dark">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Website Name"
          name="name"
          onChange={handleChange}
          value={values.name}
        />
      </div>

      <div className="form-grup">
        <textarea
          name="description"
          className="form-control"
          rows="3"
          placeholder="Website Description"
          onChange={handleChange}
          value={values.description}
        ></textarea>
      </div>
      <button className="btn btn-success my-3 rounded fw-bold">
        {currentId === "" ? "Add Link" : "Update Link"}
      </button>
    </form>
  );
};

export default LinkForm;
