import { React, useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Sidenav from "./Sidenav";
import Header from "./Header";
import axios from "axios";

const active1 = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive1 = { color: "black", backgroundColor: "white" };

function EXBanner() {
  const [Height, setHeight] = useState(0);
  const [categorydata, setcategorydata] = useState([]);
  const [banner, setBanner] = useState("");
  const [Link, setLink] = useState("");

  const [bannerdata, setBannerdata] = useState([]);
  const formdata = new FormData();
  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postbanner = async (e) => {
    e.preventDefault();

    formdata.append("banner", banner);
    formdata.append("Link", Link);
    formdata.append("Height", Height);

    try {
      const config = {
        url: "/userapp/addexbanner",
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",

        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/exclusivebanner");
        }
      });
    } catch (error) {
      console.error(error);
      alert("banner  Not Added");
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat");
    if ((res.status = 200)) {
      setcategorydata(res.data?.subcategory);
    }
  };

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallexbanner"
    );
    if ((res.status = 200)) {
      setBannerdata(res.data?.banner);
    }
  };

  const deletebannerimg = async (id) => {
    axios({
      method: "post",
      url: "https://api.vijayhomesuperadmin.in/api/userapp/deleteexbanner/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row  set_margin ">
          <div>
            <div className="d-flex  mt-3">
              <h4 style={{ color: "#FF0060" }}>Exclusive Banner</h4>
            </div>
          </div>
        </div>
        <div className="row pt-3 m-auto" style={{ marginLeft: "-72px" }}>
          <div className="row  set_margin">
            <div>
              <div className="d-flex  mt-3 mb-3">
                <Button
                  className="btn-primary-button mx-2"
                  variant="danger"
                  onClick={handleShow}
                >
                  ADD
                </Button>
              </div>
            </div>

            <div className="row  justify-content-center ">
              <div className="col-md-12">
                <Table
                  className="table_container table_data text-center"
                  bordered
                  size="sm"
                  centered
                  variant
                >
                  <thead>
                    <tr>
                      <th>SI.No</th>
                      <th>Link</th>
                      <th> Images</th>
                      <th> Height</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerdata.map((element, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{element.Link}</td>
                          <td>
                            <img
                              className="header_logo"
                              src={`https://api.vijayhomesuperadmin.in/exbanner/${element.banner}`}
                              width={"100px"}
                              height={"50px"}
                            />
                          </td>
                          <td>{element.Height}</td>
                          <td>
                            <Button
                              style={{
                                margin: "5px",
                                fontSize: "12px",
                                padding: "6px",
                              }}
                              onClick={() => deletebannerimg(element._id)}
                              variant="danger"
                              key={i}
                            >
                              Delete
                            </Button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ADD</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="vhs-input-label mt-3">
              Link <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1">
              <input
                className="col-md-6 vhs-input-value"
                type="text"
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="vhs-input-label mt-3">
              Height <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1">
              <input
                className="col-md-6 vhs-input-value"
                type="text"
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>
              Ex-200 (its take pixels)
            </span>
            <div className="group pt-1 mt-4">
              <input
                className="col-md-6 vhs-input-value"
                type="file"
                onChange={(e) => setBanner(e.target.files[0])}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={postbanner}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default EXBanner;
