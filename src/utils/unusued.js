export const DecisionApproval = ({
  loanId,
  loanData,
  userRole,
  disburseBank,
}) => {
  const {
    state: { loading, error, approvedStatus },
    decideApproval,
    disburseLoan,
    clearError,
    resetApprovalStatus,
  } = useContext(ApprovalContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  // useEffect(() => {
  //   if(approvedStatus) {
  //     resetApprovalStatus();
  //     setShowModal(true);
  //   }
  // }, [approvedStatus])

  const [approvalData, setApprovalData] = useState({
    decision: "",
    approvedRate: "",
    approvedTenure: "",
    repaymentDate: "",
    decisionReason: "",
    totalPay: "",
    approvedAmount: "",
  });

  const [approvalErrors, setApprovalErrors] = useState({
    decision: null,
    approvedRate: null,
    approvedTenure: null,
    repaymentDate: null,
    decisionReason: null,
    totalPay: null,
    approvedAmount: null,
  });

  const {
    state: { bankList },
    getBankList,
  } = useContext(BankContext);

  useEffect(() => {
    (async () => {
      await getBankList();
    })();
  }, []);

  useEffect(() => {
    if (loanData && loanData.processorDecision) {
      console.log(loanData);
      setApprovalData({
        ...approvalData,
        decision: loanData.processorDecision,
        approvedRate: loanData.approvedInterest,
        approvedTenure: loanData.approvedTenure,
        repaymentDate: loanData.determinedRepaymentDate,
        approvedAmount: loanData.amount,
        decisionReason: loanData.processorDecisionReason,
      });
    }
  }, [loanData]);

  const approveLoan = async () => {
    if (userRole === "processor") {
      const validated = validateInput(approvalData, setApprovalErrors);
      console.log(validated);
      if (validated) {
        const data = {
          decision: approvalData.decision,
          approved_interest: approvalData.approvedRate,
          approved_tenure: approvalData.approvedTenure,
          determined_repayment_date: approvalData.repaymentDate,
          decision_reason: approvalData.decisionReason,
          total_pay: approvalData.totalPay,
          approvedAmount: approvalData.approvedAmount,
        };
        decideApproval(loanId, data);
      }
    } else if (userRole === "authorizer") {
      if (loanData && loanData?.processorDecision) {
        await decideApproval(loanId, {
          decision: loanData?.processorDecision,
          approved_interest: loanData?.approvedInterest?.toString(),
          approved_tenure: loanData?.approvedTenure?.toString(),
          determined_repayment_date: loanData?.determinedRepaymentDate,
          total_pay: loanData?.calculatedPayBack?.toString(),
          decision_reason: loanData?.processorDecisionReason,
          approvedAmount: loanData?.amount?.toString(),
        });
        setShowModal(true);
      } else {
        const validated = validateInput(approvalData, setApprovalErrors);
        console.log(validated);
        if (validated) {
          const data = {
            decision: approvalData.decision,
            approved_interest: approvalData.approvedRate,
            approved_tenure: approvalData.approvedTenure,
            determined_repayment_date: approvalData.repaymentDate,
            decision_reason: approvalData.decisionReason,
            total_pay: approvalData.totalPay,
          };
          await decideApproval(loanId, data);
        }
      }
    }
  };

  const transferPaymentToClient = () => {
    const bankInfo = bankList.filter(
      (bank) => bank.name.toLowerCase() === disburseBank.bank.toLowerCase()
    );
    // console.log(bankInfo[0].code);
    const paymentData = {
      account_bank: bankInfo[0].code,
      account_number: disburseBank.accountNumber,
      amount: loanData.amount,
    };
    disburseLoan(loanId, paymentData);
  };

  const DisburseModal = () => {
    const handleClose = () => {
      setShowModal(false);
    };

    const [clientBank, setClientBank] = useState({
      bankName: "",
      accountNumber: "",
      amount: "",
    });

    useEffect(() => {
      if (disburseBank && disburseBank.isDisbursement) {
        setClientBank({
          ...clientBank,
          bankName: _.startCase(disburseBank.bank),
          accountNumber: disburseBank.accountNumber,
          amount: numberWithCommas(loanData.amount),
        });
      }
    }, [disburseBank]);

    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className={styles.disburseModal}>
          <Row className="mb-4">
            <Col>
              <InputField
                type="text"
                label="Bank Name"
                nameAttr="bankName"
                value={clientBank.bankName}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField
                type="text"
                label="Account Number"
                nameAttr="accNumber"
                value={clientBank.accountNumber}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <InputField
                type="text"
                label="Amount"
                nameAttr="amount"
                value={clientBank.amount}
              />
            </Col>
          </Row>
          <Button
            className="mt-4"
            fullWidth
            clicked={transferPaymentToClient}
            bgColor="#741763"
            size="lg"
            color="#EBEBEB"
            disabled={loading}
            loading={loading}
          >
            Disburse
          </Button>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Row className="mb-4">
        <Col>
          <InputField
            type="select"
            label="Decision"
            nameAttr="decision"
            options={["Approve", "Decline"]}
            value={approvalData.decision}
            changed={(val) => {
              setApprovalData({ ...approvalData, decision: val });
              setApprovalErrors({ ...approvalErrors, decision: null });
            }}
            error={approvalErrors.decision && approvalErrors.decision}
            disable={!!loanData?.processorDecision}
          />
        </Col>
        <Col>
          <InputField
            type="text"
            label="Approved Interest Rate"
            nameAttr="interestRate"
            value={approvalData.approvedRate}
            changed={(val) => {
              setApprovalData({ ...approvalData, approvedRate: val });
              setApprovalErrors({ ...approvalErrors, approvedRate: null });
            }}
            error={approvalErrors.approvedRate && approvalErrors.approvedRate}
            disable={!!loanData?.processorDecision}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Approved Tenure"
            nameAttr="approvedTenure"
            value={approvalData.approvedTenure}
            changed={(val) => {
              setApprovalData({ ...approvalData, approvedTenure: val });
              setApprovalErrors({ ...approvalErrors, approvedTenure: null });
            }}
            error={
              approvalErrors.approvedTenure && approvalErrors.approvedTenure
            }
            disable={!!loanData?.processorDecision}
          />
        </Col>
        <Col>
          <InputField
            type="text"
            label="Determined Repayment Date"
            nameAttr="repaymentDate"
            value={approvalData.repaymentDate}
            changed={(val) => {
              setApprovalData({ ...approvalData, repaymentDate: val });
              setApprovalErrors({ ...approvalErrors, repaymentDate: null });
            }}
            error={approvalErrors.repaymentDate && approvalErrors.repaymentDate}
            disable={!!loanData?.processorDecision}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="text"
            label="Total Repayment"
            nameAttr="totalRepayment"
            value={approvalData.totalPay}
            changed={(val) => {
              setApprovalData({ ...approvalData, totalPay: val });
              setApprovalErrors({ ...approvalErrors, totalPay: null });
            }}
            error={approvalErrors.totalPay && approvalErrors.totalPay}
            disable={!!loanData?.processorDecision}
          />
        </Col>
        <Col>
          <InputField
            type="text"
            label="Approved Loan Amount"
            nameAttr="approvedAmount"
            value={approvalData.approvedAmount}
            changed={(val) => {
              setApprovalData({ ...approvalData, approvedAmount: val });
              setApprovalErrors({ ...approvalErrors, approvedAmount: null });
            }}
            error={
              approvalErrors.approvedAmount && approvalErrors.approvedAmount
            }
            disable={!!loanData?.processorDecision}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputField
            type="textarea"
            label="Decision Reason"
            nameAttr="decisionReason"
            value={approvalData.decisionReason}
            changed={(val) => {
              setApprovalData({ ...approvalData, decisionReason: val });
              setApprovalErrors({ ...approvalErrors, decisionReason: null });
            }}
            error={
              approvalErrors.decisionReason && approvalErrors.decisionReason
            }
            disable={!!loanData?.processorDecision}
          />
        </Col>
      </Row>
      <Button
        className="mt-4"
        fullWidth
        clicked={approveLoan}
        bgColor="#741763"
        size="lg"
        color="#EBEBEB"
        disabled={loading}
        loading={loading}
      >
        {userRole === "processor" ? `Submit Decision` : `Submit & Disburse`}
      </Button>
      <DisburseModal />
    </>
  );
};
