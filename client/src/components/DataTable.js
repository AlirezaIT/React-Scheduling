import React from "react";
import Header from "./Header";
import { Button } from "react-bootstrap";

function DataTable({ data, header, classes }) {
  return (
    <div className="container">
      {/* {console.log(data)} */}
      <table className={classes ? classes.join(" ") : ""}>
        <thead>
          <tr>
            {header.map((x, i) => (
              <th scope="col" key={i}>
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((x, i) => (
            <tr key={i}>
              {header.map((l, k) => (
                <td key={k}>{x[header[k]]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
