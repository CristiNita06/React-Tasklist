import "./editTask.css";
import { useState } from "react";
var axios = require("axios");

export default function EditTask({ editTask, modalVisibility, getData }) {
  const [title, setTitle] = useState(editTask.title);
  const [details, setDetails] = useState(editTask.details);
  const [dueDate, setDueDate] = useState(editTask.date);

  //REST API Patch Method
  const edit = () => {
    var data = JSON.stringify({
      // "grant_type": "password",
      // "client_id": "f5310f090dfd11107f17158b75eeaff2",
      // "client_secret": "<UpvsoyH6@",
      // "username": "rest.user",
      // "password": "Ac}}v2qC%2dTlFn#p@",
      title: title,
      details: details,
      dueDate: dueDate,
    });

    var config = {
      method: "patch",
      url: `https://dev193198.service-now.com/api/x_723118_dashboard/task_list/${editTask.sys_id}`,
      headers: {
        //'Authorization': 'Bearer WIJpHnPnZhmn5TFKPzayZolwZ2W9TsxNv0Rj1UdpVFECKXV2BdjGMG0INye5IGoyyDyWVWXk9Eoz5Gv28n8CDA',
        "Content-Type": "application/json",
        Authorization: "Basic YWRtaW46akNScDAqUWc2JHFS",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="modalWrapper">
      <div className="modal-popup">
        <div className="exitButton">
          <button
            className=" btn"
            onClick={(event) => {
              modalVisibility(false);
            }}
          >
            X
          </button>
        </div>

        <div>
          <form>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label>Details:</label>
            <input
              type="text"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
            />

            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </form>
        </div>
        <div className="editTaskButton">
          <button
            className="editTaskButton btn btn-success"
            onClick={() => {
              edit();
              modalVisibility(false);
            }}
          >
            EDIT TASK
          </button>
        </div>
      </div>
    </div>
  );
}
