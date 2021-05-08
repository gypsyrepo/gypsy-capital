import React, { useEffect, useMemo } from "react";
import styles from "./SearchTable.module.scss";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
import Highlighter from "react-highlight-words";

const SearchTable = ({ searchList, role, searchTerm }) => {
  const detailRoutePrefix = useMemo(() => {
    if (role === "sales") {
      return "sales-agent";
    } else if (role === "super") {
      return "super-admin";
    } else {
      return role;
    }
  }, [role]);

  useEffect(() => {}, [searchTerm]);

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
        <tbody id="table-body">
          {searchList.map((client) => {
            return (
              <tr>
                <td>
                  <Highlighter
                    searchWords={[searchTerm]}
                    textToHighlight={`${_.capitalize(
                      client.firstName
                    )} ${_.capitalize(client.lastName)}`}
                    autoEscape={true}
                  />
                </td>
                <td>
                  <Link to={`/${detailRoutePrefix}/client/${client._id}`}>
                    {client._id.slice(0, 6)}
                  </Link>
                </td>
                <td>
                  <Highlighter
                    searchWords={[searchTerm]}
                    textToHighlight={client.phoneNumber.replace("234", "0")}
                    autoEscape={true}
                  />
                </td>
                <td>
                  <Highlighter
                    searchWords={[searchTerm]}
                    textToHighlight={
                      client?.more_info[0]?.bioData?.BVN || "-----"
                    }
                    autoEscape={true}
                  />
                </td>
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
