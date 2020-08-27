import React from "react";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    // ({ data, header, classes })
  }

  onClickHandler(row, header) {
    const { data } = this.state;
    if (header.includes("remove")) {
      this.setState({
        data: data.filter((x) => row.name !== x.name),
      });
      console.log("removed");
    }
    if (header.includes("add")) {
      console.log("add");
    }
    if (header.includes("detail")) {
      console.log(row);
      console.log("detail11111");
    }
  }
  onCheckBoxHandler(e, row, header) {
    const { data } = this.state;
    const foundItem = data.find((x) => x.name === row.name);
    foundItem.is_absent = !row["is_absent"];
    this.setState({
      data: data,
    });
    // database update
  }
  onSelectedHandler(e, row, header) {
    console.log(e.target.value);
  }
  render() {
    const { data, classes, header, dropdowns } = this.state;
    return (
      <div className="container">
        {console.log(data)}
        <table className={classes ? classes.join(" ") : ""}>
          <thead>
            <tr>
              {header.map((h, i) => (
                <th scope="col" key={i}>
                  {h.includes("btn") ||
                  h.includes("checkbox") ||
                  h.includes("dropdown")
                    ? h.split("_")[0]
                    : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {header.map((h, j) => {
                  if (h.includes("btn")) {
                    return (
                      <td>
                        <button
                          key={i + j}
                          onClick={() => this.onClickHandler(row, h)}
                          className={
                            h.includes("remove")
                              ? "btn btn-danger"
                              : "btn btn-success"
                          }
                        >
                          {h.split("_")[0]}
                        </button>
                      </td>
                    );
                  }
                  if (h.includes("checkbox")) {
                    return (
                      <td>
                        <input
                          type="checkbox"
                          checked={row[`is_${h.split("_")[0]}`]}
                          key={i + j}
                          onChange={(e) => this.onCheckBoxHandler(e, row, h)}
                          className="form-control"
                        />
                      </td>
                    );
                  } else if (h.includes("dropdown")) {
                    return (
                      <td>
                        <select
                          className="form-control"
                          id="inputState"
                          onChange={(e) => this.onSelectedHandler(e, row, h)}
                          defaultValue="2"
                        >
                          {/* dropdowns = {course_dropdown , teacher_dropdown}  */}
                          {/* h = course_dropdown , teacher_dropdown  */}
                          {dropdowns[h] &&
                            dropdowns[h]["length"] &&
                            dropdowns[h].map((d, di) => (
                              <option key={di} value={d.id}>
                                {d.name}
                              </option>
                            ))}
                        </select>
                      </td>
                    );
                    // return <td><input type="checkbox" checked={row[`is_${h.split('_')[0]}`]} key={i + j} onChange={(e) => this.onCheckBoxHandler(e, row, h)} className="form-control"/></td>
                  } else {
                    return <td key={i + j}>{row[h]}</td>;
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
