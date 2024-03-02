import { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import "./tasklist.css";
const axios = require("axios");

export default function Tasklist() {
  const [servicenowData, setServicenowData] = useState([]);
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [editTaskData, setEditTaskData] = useState({});

  // Creating Tasks Modal
  const closeModal = (value) => {
    setmodalVisibility(value);
  };

  const showModal = () => {
    setmodalVisibility(true);
  };

  // Editing Tasks Modal
  const showEditModal = (element) => {
    setEditModalVisibility(true);
    setEditTaskData(element);
  };

  const closeEditModal = (value) => {
    setEditModalVisibility(value);
  };

  // REST API Get Method
  const getData = () => {
    var qs = require("qs");
    var data = qs.stringify({
      // grant_type: "password",
      // client_id: "f5310f090dfd11107f17158b75eeaff2",
      // client_secret: "<UpvsoyH6@",
      // username: "rest.user",
      // password: "Ac}}v2qC%2dTlFn#p@",
    });
    var config = {
      method: "get",
      url: "https://dev193198.service-now.com/api/x_723118_dashboard/task_list",
      headers: {
        //Authorization': 'Bearer WIJpHnPnZhmn5TFKPzayZolwZ2W9TsxNv0Rj1UdpVFECKXV2BdjGMG0INye5IGoyyDyWVWXk9Eoz5Gv28n8CDA',
        Authorization: "Basic YWRtaW46akNScDAqUWc2JHFS",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const retrievedData = response.data.result;
        setServicenowData(retrievedData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // REST API Delete Method
  const deleteTask = (sys_id) => {
    var qs = require("qs");
    var data = qs.stringify({
      // grant_type: "password",
      // client_id: "f5310f090dfd11107f17158b75eeaff2",
      // client_secret: "<UpvsoyH6@",
      // username: "rest.user",
      // password: "Ac}}v2qC%2dTlFn#p@",
    });
    var config = {
      method: "delete",
      url: `https://dev193198.service-now.com/api/x_723118_dashboard/task_list/${sys_id}`,
      headers: {
        // 'Authorization': 'Bearer WIJpHnPnZhmn5TFKPzayZolwZ2W9TsxNv0Rj1UdpVFECKXV2BdjGMG0INye5IGoyyDyWVWXk9Eoz5Gv28n8CDA',
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="wrapper">
      <h3>TASK LIST APP</h3>

      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">TITLE</th>
              <th scope="col">DETAILS</th>
              <th scope="col">DUE DATA</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {servicenowData.map((element) => (
              <tr key={element.number}>
                <td>{element.title}</td>
                <td>{element.details}</td>
                <td>{element.date}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteTask(element.sys_id);
                    }}
                  >
                    DELETE
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      showEditModal({
                        title: element.title,
                        details: element.details,
                        date: element.date,
                        sys_id: element.sys_id,
                      });
                    }}
                  >
                    EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*End of Table container*/}
      </div>

      <button
        className="btn btn-success"
        onClick={() => {
          showModal();
        }}
      >
        CREATE TASK
      </button>

      {modalVisibility && (
        <CreateTask modalVisibility={closeModal} getData={getData} />
      )}
      {editModalVisibility && (
        <EditTask
          modalVisibility={closeEditModal}
          editTask={editTaskData}
          getData={getData}
        />
      )}

      {/*End of Wrapper*/}
    </div>
  );
}
