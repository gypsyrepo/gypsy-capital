import { useContext, useEffect, useState, useMemo } from 'react';
import { Context as LoanContext } from '../context/LoanContext';

export default (clientId) => {

  const [loanDeets, setLoanDeets] = useState(null);
  const { state: { loans, loanDetails }, retrieveClientLoans, retrieveLoan } = useContext(LoanContext);

   useEffect(() => {
    retrieveClientLoans();
   }, []);

   const userLoans = useMemo(() => {
    return loans.filter(loan => loan.clientInfo[0]?._id === clientId)
  }, [loans]);

  useEffect(() => {
   retrieveLoan(userLoans[0]?._id)
  }, [userLoans])

  useEffect(() => {
   if(loanDetails) {
    setLoanDeets(loanDetails);
   }
  }, [loanDetails])

  return [ loanDeets ];
}