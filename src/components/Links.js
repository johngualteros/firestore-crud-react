import LinkForm from "./LinkForm";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEdit = async (LinkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(LinkObject);
        toast("Link added successfully", {
          type: "success",
          autoClose: 3000,
        });
      } else {
        await db.collection("links").doc(currentId).update(LinkObject);
        toast("Link Updated successfully", {
          type: "info",
          autoClose: 3000,
        });
      }
      setCurrentId("");
    } catch (e) {
      toast.error(e.message);
    }
  };
  const onDeleteLink = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      await db.collection("links").doc(id).delete();
      toast("Link deleted successfully", {
        type: "error",
        autoClose: 3000,
      });
    }
  };
  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };
  useEffect(() => {
    getLinks();
  }, []);
  return (
    <div>
      <div className="col-md-4  offset-md-4 p-2">
        <LinkForm {...{ addOrEdit, currentId, links }} />
      </div>
      <div className="col-md-8 offset-md-2 p-2">
        {links.map((link) => (
          <div
            className="card mb-1 bg-primary text-light fw-bold"
            key={link.id}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{link.name}</h5>
                <div>
                  <i
                    className="material-icons text-light bg-danger rounded"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>

                  <i
                    className="material-icons text-light bg-info ms-2 rounded"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p className="card-text">{link.description}</p>
              <a href={link.url} className="btn btn-success">
                Go to the website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
