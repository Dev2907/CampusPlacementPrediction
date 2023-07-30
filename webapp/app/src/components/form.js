import React, { useState } from "react";
import "../CSS/form.css";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";

function Form({ setpredres }) {
  const navigate = useNavigate();
  const handlesubmit = async (event) => {
    event.preventDefault();
    let form = event.target;
    form = new FormData(form);
    try {
      let response = await fetch("http://127.0.0.1:5000/pred", {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        response = await response.json();
        setpredres(response);
        navigate("/res");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="page">
      <div className="formhead bold">Predict Your Salary </div>
      <br />
      <div>
        <form onSubmit={handlesubmit}>
          <div>
            <div className="formpart1">
              <div>
                <div>Enter Full Name</div>
                <input name="Fullname" type="Text" required></input>
              </div>
              <br />
              <div>
                <div>Percentage in SSC</div>
                <input name="ssc_p" type="number" required></input>
              </div>
              <br />
              <div>
                <div>Percentage in HSC</div>
                <input name="hsc_p" type="number" required></input>
              </div>
              <br />
              <div>
                <div>Percentage in degree Course</div>
                <input name="degree_p" type="number" required></input>
              </div>
              <br />
              <div>
                <div>Percentage in Employablity Test</div>
                <input name="etest_p" type="number" required></input>
              </div>
              <br />
              <div>
                <div>Percentage in MBA</div>
                <input name="mba_p" type="number" required></input>
              </div>
            </div>
            <div className="formpart2">
              <div>
                <div>Do you have Work experience?</div>
                <select name="workex">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <br />
              <div>
                <div>SSC Board</div>
                <select name="ssc_b">
                  <option value="Others">Others</option>
                  <option value="Central">Central</option>
                </select>
              </div>
              <br />
              <div>
                <div>HSC Board</div>
                <select name="hsc_b">
                  <option value="Others">Others</option>
                  <option value="Central">Central</option>
                </select>
              </div>
              <br />
              <div>
                <div>HSC Stream</div>
                <select name="hsc_s">
                  <option value="Commerce">Commerce</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
              <br />
              <div>
                <div>Degree Field</div>
                <select name="degree_t">
                  <option value="Sci&Tech">Sci&Tech</option>
                  <option value="Comm&Mgmt">Comm&Mgmt</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <br />
              <div>
                <div>Specialisation</div>
                <select name="specialisation">
                  <option value="Mkt&HR">Mkt&HR</option>
                  <option value="Mkt&Fin">Mkt&Fin</option>
                </select>
              </div>
              <div>
                <div>Gender</div>
                <select name="gender">
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="subbutton">
            <button type="Submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
