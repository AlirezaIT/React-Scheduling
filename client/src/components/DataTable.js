import React from "react";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    // ({ data, header, classes })
  }
 
  onClickHandler(row, header) {
    const { data } = this.state;
    if (header.includes('remove')) {
      this.setState({
        data: data.filter(x => row.name !== x.name),
      });
      console.log('removed');
    }
    if (header.includes('add')) {
      console.log('add');
    }
  }
  onCheckBoxHandler(e, row, header) {
    console.log(e);
    console.log(row);
    console.log(header);
  }
  render() {
    const {data, classes, header} = this.state;
    return (
      <div className="container">
        {console.log(data)}
        <table className={classes ? classes.join(" ") : ""}>
          <thead>
            <tr>
              {header.map((h, i) => (
                <th scope="col" key={i}>
                  {h.includes('btn') ||  h.includes('checkbox') ? h.split('_')[0] : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((x, i) => (
              <tr key={i}>
                {header.map((h, j) => {
                  if (h.includes('btn')) {
                    return <td><button key={i + j} onClick={() => this.onClickHandler(x, h)} className={h.includes('remove') ? 'btn btn-danger' : 'btn btn-success'}>{h.split('_')[0]}</button></td>
                  } if (h.includes('checkbox')) {
                    return <td><input type="checkbox" checked={x[`is_${h.split('_')[0]}`]} key={i + j} onChange={(e) => this.onCheckBoxHandler(e, x, h)} className="form-control"/></td>
                  } else {
                    return <td key={i + j}>{x[h]}</td>
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
