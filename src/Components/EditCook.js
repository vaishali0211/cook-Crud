import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function EditCook() {
  const [cook] = useState([]);

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    cuisines: [],
    city: "",
    description: "",
  });
  const [selectedCook, setSelectedCook] = useState(null);

  const handleCheckboxChange = (e) => {
    const cuisines = e.target.value;
    const isChecked = e.target.checked;

    setFormData((prevData) => ({
      ...prevData,
      cuisines: isChecked
        ? [...prevData.cuisines, cuisines]
        : prevData.cuisines.filter((item) => item !== cuisines),
    }));
  };

  let history = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();

    if (selectedCook) {
      axios
        .put(`http://localhost:3001/api/cooks/${id}`, formData)
        .then((response) => {
          // Update the state correctly
          setFormData({
            name: "",
            mobile: "",
            cuisines: [],
            city: "",
            description: "",
          });
          setSelectedCook(null);
          history("/");
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:3001/api/cooks/${id}`)
      .then((response) => {
        setFormData(response.data);
        console.log(response.data);
        setSelectedCook(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
            {/* setting a name from the 
					input textfiled */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                // value={name}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>

            {/* setting a age from the input textfiled */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                type="number"
                placeholder="Mobile"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCuisines">
              <div className="row">
                <div className="col-md-1">
                  <Form.Label className="text-md-end">Cuisines:</Form.Label>
                </div>
                <div className="col-md-3">
                  {/* Cuisines checkboxes */}
                  {[
                    "Bengali",
                    "Chettinad",
                    "Continental",
                    "French",
                    "Hyderabadi",
                    "Mexican",
                  ].map((cuisine) => (
                    <div key={cuisine} className="mb-2">
                      <Form.Check
                        type="checkbox"
                        label={cuisine}
                        name="cuisines"
                        value={cuisine}
                        checked={formData.cuisines.includes(cuisine)}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              {/* City selection dropdown */}
              <div className="row">
                <div className="col-md-1">
                  <Form.Label className="text-md-end">City</Form.Label>
                </div>
                <Form.Control
                  as="select"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                >
                  <option value="">Select a city</option>
                  {["Bangalore", "Chennai", "Delhi", "Mumbai", "Kolkata"].map(
                    (city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    )
                  )}
                </Form.Control>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <div className="row">
                <div className="col-md-1">
                  <Form.Label className="text-md-end">Description:</Form.Label>
                </div>
                <Form.Control
                  as="textarea"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  required
                />
              </div>
            </Form.Group>

            <Button
              onClick={(e) => handelSubmit(e)}
              variant="primary"
              type="submit"
              className="btn btn-primary btn-sm mx-auto d-block"
            >
              Update
            </Button>

            <Link className="d-grid gap-2" to="/">
              <Button
                variant="info"
                className="btn btn-in btn-sm mx-auto d-block"
              >
                Home
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditCook;
