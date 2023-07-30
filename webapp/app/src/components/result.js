import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "../CSS/result.css";

function Result({ res }) {
  const [resstate, setres] = useState(res);
  let pieChartData = {};
  if (res.probablities) {
    pieChartData = {
      labels: ["Placed", "Not Placed"],
      datasets: [
        {
          data: [resstate["probablities"][1], resstate["probablities"][0]],
          backgroundColor: ["#447E31", "#FE5B5B"],
          hoverBackgroundColor: ["#447E31", "#FE5B5B"],
        },
      ],
    };
  }
  return (
    <div className="page respage">
      <div className="prediction">
        <div>
          {res.predclass
            ? "Based of the data provided"
            : "Fill the form and submit to see results"}
        </div>
        <div className="chart-container">
          {res.probablities ? (
            <Pie
              data={pieChartData}
              className="chart"
              width={"297"}
              height={"297"}
            />
          ) : (
            ""
          )}
        </div>
        <div>
          {res.predclass === 0 || res.predclass === 1
            ? `There is a ${(res.probablities[1] * 100).toFixed(
                2
              )}% probablity of you being placed ${
                res.predclass === 1
                  ? `with salary of Rs. ${res.sal.toFixed(0)}`
                  : ""
              }`
            : ""}
        </div>
      </div>
      <div className="accuracy">
        <div>Models used for the prediction :</div>
        <div className="bold">Logistic Regression</div>
        <div>Accuracy : 96%</div>
        <div className="bold">Linear Regression</div>
        <div>Accuracy : 40%</div>
      </div>
    </div>
  );
}
export default Result;
