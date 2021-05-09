import { useContext, useEffect, useMemo } from "react";
import { Context as UserContext } from "../context/UserContext";

// eslint-disable-next-line import/no-anonymous-default-export
export default (isStaff) => {
  const {
    state: { clientsForRole, loading },
    getClientListForRole,
  } = useContext(UserContext);

  useEffect(() => {
    getClientListForRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const staffList = useMemo(() => {
    return isStaff
      ? clientsForRole.filter((client) => client.role !== "client")
      : clientsForRole.filter((client) => client.role === "client");
  }, [clientsForRole, isStaff]);

  return [staffList, loading];
};
