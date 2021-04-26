import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./AdminStaffs.module.scss";
import { routes } from "../../routes/sidebarRoutes";
import { Row, Col } from "react-bootstrap";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import {
  useLocation,
  useHistory,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import ClientList from "../../components/ClientList/ClientList";
import Loader from "../../components/Loader/Loader";
import { validateInput } from "../../utils/validateInput";
import { toast } from "react-toastify";

const AdminStaffs = () => {
  const adminRoutes = routes[4];
  const location = useLocation();
  const history = useHistory();
  const { path } = useRouteMatch();

  const {
    state: { user, loading: addingStaff, error },
    addStaff,
    clearErrors,
  } = useContext(AuthContext);

  const {
    state: { clientsForRole, loading },
    getClientListForRole,
  } = useContext(UserContext);

  useEffect(() => {
    getClientListForRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const staffList = useMemo(() => {
    return clientsForRole.filter(
      (client) => client.role !== "client" && client._id !== user?.user_id
    );
  }, [clientsForRole, user?.user_id]);

  console.log(staffList);

  const goToAddNew = () => {
    history.push("/super-admin/staffs/add");
  };

  const AddStaffForm = () => {
    const [addData, setAddData] = useState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      staffRole: null,
    });

    const [validationErrors, setValidationErrors] = useState({
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      phoneNo: null,
      staffRole: null,
    });

    useEffect(() => {
      if (error) {
        toast.error(error, {
          onClose: () => clearErrors(),
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const handleAddStaff = () => {
      const validated = validateInput(addData, setValidationErrors);
      console.log(validated);
      if (validated) {
        const data = {
          email: addData.email,
          firstName: addData.firstName,
          lastName: addData.lastName,
          phoneNumber: addData.phoneNo.replace("0", "234"),
          password: addData.password,
          referralCode: "Admin",
          hearAboutUs: "NIL",
          city: "Lagos",
          staffRole: addData.staffRole,
        };

        addStaff(data);
      }
    };

    return (
      <div className={styles.addForm}>
        <Row className="mb-4">
          <Col>
            <InputField
              label="Email"
              nameAttr="email"
              type="email"
              value={addData.email}
              changed={(val) => {
                setAddData({ ...addData, email: val });
                setValidationErrors({ ...validationErrors, email: null });
              }}
              error={validationErrors?.email}
            />
          </Col>
          <Col>
            <InputField
              label="Password"
              nameAttr="password"
              type="password"
              value={addData.password}
              changed={(val) => {
                setAddData({ ...addData, password: val });
                setValidationErrors({ ...validationErrors, password: null });
              }}
              error={validationErrors?.password}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField
              label="First Name"
              nameAttr="firstName"
              type="text"
              value={addData.firstName}
              changed={(val) => {
                setAddData({ ...addData, firstName: val });
                setValidationErrors({ ...validationErrors, firstName: null });
              }}
              error={validationErrors?.firstName}
            />
          </Col>
          <Col>
            <InputField
              label="Last Name"
              nameAttr="lastName"
              type="text"
              value={addData.lastName}
              changed={(val) => {
                setAddData({ ...addData, lastName: val });
                setValidationErrors({ ...validationErrors, lastName: null });
              }}
              error={validationErrors?.lastName}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <InputField
              label="Phone Number"
              nameAttr="phoneNo"
              type="number"
              value={addData.phoneNo}
              changed={(val) => {
                setAddData({ ...addData, phoneNo: val });
                setValidationErrors({ ...validationErrors, phoneNo: null });
              }}
              error={validationErrors?.phoneNo}
            />
          </Col>
          <Col>
            <InputField
              label="Staff Role"
              nameAttr="staffRole"
              type="select"
              options={[
                "Sales Agent",
                "Authorizer",
                "Processor",
                "Super Admin",
              ]}
              value={addData.staffRole}
              changed={(val) => {
                setAddData({ ...addData, staffRole: val });
                setValidationErrors({ ...validationErrors, staffRole: null });
              }}
              error={validationErrors?.staffRole}
            />
          </Col>
        </Row>
        <Button
          bgColor="#741763"
          className="mt-4"
          color="#fff"
          fullWidth
          size="lg"
          clicked={handleAddStaff}
          loading={addingStaff}
          disabled={addingStaff}
        >
          Submit
        </Button>
      </div>
    );
  };

  return (
    <Dashboard sidebarRoutes={adminRoutes} location={location}>
      <Switch>
        <Route path={`${path}/list`}>
          {!loading ? (
            <ClientList
              clientList={staffList}
              role={user?.role}
              handleBtnClick={goToAddNew}
            />
          ) : (
            <Loader />
          )}
        </Route>
        <Route path={`${path}/add`}>
          <AddStaffForm />
        </Route>
      </Switch>
    </Dashboard>
  );
};

export default AdminStaffs;
