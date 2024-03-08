import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateCook() {
  const navigate = useNavigate();
  const [cooks, setCooks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    cuisines: [],
    city: "",
    description: "",
  });
  const [selectedCook, setSelectedCook] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/cooks")
      .then((response) => setCooks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCheckboxChange = (e) => {
    const cuisines = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFormData({ ...formData, cuisines: [...formData.cuisines, cuisines] });
    } else {
      setFormData({
        ...formData,
        cuisines: formData.cuisines.filter((item) => item !== cuisines),
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedCook) {
      axios
        .put(`http://localhost:3001/api/cooks/${selectedCook._id}`, formData)
        .then((response) => {
          const updatedCooks = cooks.map((cook) =>
            cook._id === selectedCook._id ? response.data : cook
          );
          setCooks(updatedCooks);
          setFormData({
            name: "",
            mobile: "",
            cuisines: [],
            city: "",
            description: "",
          });
          setSelectedCook(null);
        })
        .catch((error) => console.error(error));
    } else {
      // Create a new cook
      axios
        .post("http://localhost:3001/api/cooks", formData)
        .then((response) => {
          setCooks([...cooks, response.data]);
          setFormData({
            name: "",
            mobile: "",
            cuisines: [],
            city: "",
            description: "",
          });
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEditClick = (cook) => {
    setFormData(cook);
    setSelectedCook(cook);
  };

  const handleDeleteClick = (cookId) => {
    axios
      .delete(`http://localhost:3001/api/cooks/${cookId}`)
      .then(() => {
        const updatedCooks = cooks.filter((cook) => cook._id !== cookId);
        setCooks(updatedCooks);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            {/* Form fields */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                type="number"
                placeholder="Enter Mobile"
                value={formData.mobile}
                required
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
              <div className="row">
                <div className="col-md-1">
                  <Form.Label className="text-md-end">City</Form.Label>
                </div>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  value={formData.city}
                  required
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
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  type="text"
                  value={formData.description}
                  required
                />
              </div>
            </Form.Group>

            <button type="submit" className="btn btn-primary">
              {selectedCook ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>

      {/* Grid to display a list of cooks */}
      {/* <div className="row mt-4">
        {cooks.map((cook) => (
          <div className="col-md-4 mb-4" key={cook._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{cook.name}</h5>
                <p className="card-text">Mobile: {cook.mobile}</p>
                
                <p className="card-text">
                  Cuisines: {cook.cuisines ? cook.cuisines.join(", ") : ""}
                </p>

                <p className="card-text">City: {cook.city}</p>
                <p className="card-text">Description: {cook.description}</p>
                <Link className="gap-2" to={`/editcook/${cook._id}`}>
                  <button
                    onClick={() => handleEditClick(cook)}
                    className="btn btn-primary me-2"
                  >
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteClick(cook._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
export default CreateCook;
