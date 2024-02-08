import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import AddWaterfall from "../components/AddWaterfall";
import ShowWaterfalls from "../components/ShowWaterfalls";
import BackButton from "../components/BackButton";

const WaterfallDetails = () => {
  const [waterfalls, setWaterfalls] = useState([]);

  const fetchWaterfalls = () => {
    axios
      .get("http://localhost:5000/api/Waterfall")
      .then((response) => {
        setWaterfalls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching waterfalls:", error);
      });
  };
  useEffect(() => {
    fetchWaterfalls();
  }, []);

  return (
    <>
      <BackButton />

      <Container className="mt-5">
        <h1 className="text-center mb-5 fw-bold text-decoration-underline">
          Waterfall Details
        </h1>
        <Tabs
          defaultActiveKey="showWaterfalls"
          className="fs-5 w-100 my-5 fw-bold"
          fill
          onSelect={() => fetchWaterfalls()}
        >
          <Tab eventKey="showWaterfalls" title="Show Waterfalls">
            <ShowWaterfalls data={waterfalls} />
          </Tab>
          <Tab eventKey="addWaterfall" title="Add Waterfall">
            <AddWaterfall />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default WaterfallDetails;
