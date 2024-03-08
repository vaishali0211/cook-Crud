import React, { useEffect, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [cooks, setCooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  useEffect(() => {
    // Fetch cooks data from the API
    axios
      .get("http://localhost:3001/api/cooks")
      .then((response) => setCooks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteCook = (cookId) => {
    axios
      .delete(`http://localhost:3001/api/cooks/${cookId}`)
      .then((response) => {
        console.log(response.data);

        setCooks(response.data);
      })
      .catch((error) => {
        console.error("Error deleting cook:", error);
      });
  };

  console.log("Hi", cooks);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCooks = cooks.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div style={{ margin: "5rem" }}>
      <Link className="align-items-right" to="/createcook">
        <Button className="float-end mb-2" variant="success">
          Create
        </Button>
      </Link>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Cuisines</th>
            <th>City</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cooks.map((cook) => (
            <tr key={cook._id}>
              <td>{cook.name}</td>
              <td>{cook.mobile}</td>
              <td>{cook.cuisines}</td>
              <td>{cook.city}</td>

              <td>
              <div className="d-flex gap-2">
                <Link className="gap-2" to={`/editcook/${cook.id}`}>
                  <Button
                    onClick={() =>
                      setCooks(
                        cook._id,
                        cook.Name,
                        cook.Mobile,
                        cook.Cuisines,
                        cook.City,
                        cook.Discription
                      )
                    }
                    variant="warning"
                  >
                    Update
                  </Button>
                </Link>

                <Button
                  className="gap-2"
                  onClick={() => deleteCook(cook.id)}
                  variant="danger"
                >
                  Delete
                </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: Math.ceil(cooks.length / itemsPerPage) }).map(
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
}

export default Home;
