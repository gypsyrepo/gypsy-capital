import { useContext, useEffect, useState, useMemo } from "react";
import { Context as LoanContext } from "../context/LoanContext";

// eslint-disable-next-line import/no-anonymous-default-export
export default (clientId) => {
  const [loanDeets, setLoanDeets] = useState(null);
  const {
    state: { loans, loanDetails, loading },
    retrieveClientLoans,
    retrieveLoan,
  } = useContext(LoanContext);

  useEffect(() => {
    retrieveClientLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userLoans = useMemo(() => {
    return loans.filter((loan) => loan.clientInfo[0]?._id === clientId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loans]);

  console.log(clientId);

  useEffect(() => {
    retrieveLoan(userLoans[0]?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoans]);

  useEffect(() => {
    if (loanDetails) {
      setLoanDeets(loanDetails);
    }
  }, [loanDetails]);

  return [loanDeets, loading];
};
