import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import AddWaterfall from "../components/AddWaterfall";
import ShowWaterfalls from "../components/ShowWaterfalls";
import BackButton from "../components/BackButton";

const WaterfallDetails = () => {
  const [waterfalls, setWaterfalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWaterfalls = () => {
    axios
      .get("http://localhost:5000/api/Waterfall")
      .then((response) => {
        setWaterfalls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching waterfalls:", error);
      })
      .finally(() => setLoading(false));
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
        defaultActiveKey="addWaterfall"
        className="fs-5 w-100 my-5 fw-bold"
        fill
        onSelect={() => fetchWaterfalls()}
      >
        <Tab eventKey="addWaterfall" title="Add Waterfall">
          <AddWaterfall />
        </Tab>

        <Tab eventKey="showWaterfalls" title="Show Waterfalls">
          <ShowWaterfalls data={waterfalls} loading={loading} />
        </Tab>
      </Tabs>
    </Container>
    </>
  );
};

export default WaterfallDetails;
