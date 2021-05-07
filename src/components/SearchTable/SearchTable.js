import React, { useMemo } from "react";
import styles from "./SearchTable.module.scss";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";

const SearchTable = ({ searchList, role }) => {
  const detailRoutePrefix = useMemo(() => {
    if (role === "sales") {
      return "sales-agent";
    } else if (role === "super") {
      return "super-admin";
    } else {
      return role;
    }
  }, [role]);

  return (
    <div className={styles.tableContainer}>
      <h3>Search Results: Clients</h3>
      <Table striped className={styles.table}>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Client ID</th>
            <th>Phone Number</th>
            <th>BVN</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {searchList.map((client) => {
            return (
              <tr>
                <td>{`${_.capitalize(client.firstName)} ${_.capitalize(
                  client.lastName
                )}`}</td>
                <td>
                  <Link to={`/${detailRoutePrefix}/client/${client._id}`}>
                    {client._id.slice(0, 6)}
                  </Link>
                </td>
                <td>{client.phoneNumber.replace("234", "0")}</td>
                <td>{client?.more_info[0]?.bioData?.BVN || "-----"}</td>
                <td>{moment(client.createdAt).format("lll")}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default SearchTable;
