import React from 'react';

function DataTable({data, header, classes}) {

  return (
    <div className="container">
        <table className={classes ? classes.join(' ') : '' }>
        <thead>
        <tr>
            {header.map((x, i) => (<th scope="col" key={i}>{x}</th>))}
        </tr>
        </thead>
        <tbody>
            {data.map((x, i) => (<td key={i}>{x[header[i]]}</td>))}
        </tbody>
    </table>
    </div>
  );
}

export default DataTable;
