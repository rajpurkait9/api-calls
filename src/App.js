import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(data);
  console.log(update);
  const handleAdd = async () => {
    const obj = {
      title: "raj purkait",
    };
    const create = await axios.post(url, obj);
    setData([create.data, ...data]);
  };
  const handleUpdate = async post => {
    post.title = "updated";
    const update = await axios.put(url + "/" + post.id, post.title);
    setUpdate(update, [...data]);
  };
  const fetchData = async () => {
    const create = await axios.get(url);
    setData(create.data);
  };
  const handleDelete = async post => {
    await axios.delete(url + "/" + post.id);
    const newData = data.filter(nd => nd.id !== post.id);
    setData(newData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <button className='btn btn-primary m-2' onClick={() => handleAdd()}>
        Add
      </button>
      <table className='table'>
        <thead>
          <tr>
            <th>Data</th>
            <th>update btn</th>
            <th>delete btn</th>
          </tr>
        </thead>
        <tbody>
          {data.map(singleData => {
            return (
              <tr key={singleData.id}>
                <td>{singleData.title}</td>
                <td>
                  <button
                    className='btn btn-warning m-2'
                    onClick={() => handleUpdate(singleData)}
                  >
                    update
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-danger m-2'
                    onClick={() => handleDelete(singleData)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default App;
