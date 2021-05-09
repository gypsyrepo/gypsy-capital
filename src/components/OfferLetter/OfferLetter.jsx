import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import WhiteLogo from "../../assets/logo-white.png";

Font.register({
  family: "Source Sans Pro",
  src:
    "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    height: 500,
    paddingBottom: 50,
  },
  header: {
    backgroundColor: "#741763",
    width: "100%",
    height: 150,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  horizontalRule: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    alignSelf: "stretch",
    marginTop: 15,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    width: 140,
  },
  approvedDate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    fontSize: 16,
    width: "100%",
  },
  body: {
    color: "#000",
    paddingHorizontal: 30,
    paddingVertical: 30,
    fontSize: 15,
    lineHeight: 1.35,
  },
  address: {
    width: 200,
  },
  letterTitle: {
    fontWeight: 600,
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  paragraphOne: {
    marginTop: 20,
    fontSize: 14,
  },
  loanData: {
    marginTop: 15,
    fontSize: 14,
  },
  termsTitle: {
    fontWeight: "medium",
    marginTop: 60,
    fontSize: 16,
  },
  termsContent: {
    marginTop: 20,
    paddingLeft: 20,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 10,
  },
  line: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignSelf: "stretch",
    marginTop: 25,
  },
  lastPage: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    lineHeight: 1.4,
  },
  lastContent: {
    flex: 12,
    paddingHorizontal: 30,
  },
  footer: {
    flex: 1,
    height: 40,
    backgroundColor: "#741763",
    justifyContent: "center",
    alignItems: "center",
  },
  signature: {
    marginTop: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  signGroup: {
    fontSize: 16,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
});

const OfferLetterPdf = ({ dynamicData }) => {
  return (
    <Document>
      <Page style={styles.page} wrap>
        <View style={{ width: "100%" }}>
          <View style={styles.header}>
            <Image style={styles.logo} src={WhiteLogo} />
            <View style={styles.horizontalRule} />
            <View style={styles.approvedDate}>
              <Text style={{ fontWeight: "bold" }}>Loan Approved</Text>
              <Text>{`Date: ${dynamicData?.date}`}</Text>
            </View>
          </View>
          <View style={styles.body}>
            <Text>{`Dear ${dynamicData?.fullName},`}</Text>
            <Text style={styles.address}>{dynamicData?.clientAddress}</Text>
            <Text style={styles.letterTitle}>
              OFFER FOR PERSONAL LOAN FACILITY
            </Text>
            <Text style={styles.paragraphOne}>
              {`We are pleased to advise that the Management of Gypsy Capital Limited has approved the loan facility requested, hence, this offer made to you. This letter outlines the major terms and conditions under which we are willing to make available to you, the sum of ${dynamicData.loanAmount}.`}
            </Text>
            <Text style={styles.loanData}>Lender: Gypsy Capital</Text>
            <Text
              style={styles.loanData}
            >{`Borrower: ${dynamicData?.borrowerName}`}</Text>
            <Text
              style={styles.loanData}
            >{`Nature of Business: ${dynamicData?.natureofBusiness}`}</Text>
            <Text style={styles.loanData}>
              {`Amount of Loan Facility: N${dynamicData.loanFacility}`}
            </Text>
            <Text
              style={styles.loanData}
            >{`Purpose: ${dynamicData?.loanPurpose}`}</Text>
            <Text
              style={styles.loanData}
            >{`Monthly Repayment: N${dynamicData.monthlyRepayment}`}</Text>
            <Text style={styles.loanData}>Repayment Source/Method: Salary</Text>
            <Text
              style={styles.loanData}
            >{`Total Repayment: N${dynamicData.totalRepayment}`}</Text>
            <Text
              style={styles.loanData}
            >{`Loan Tenure: ${dynamicData.loanTenure}`}</Text>
            <Text style={styles.termsTitle}>TERMS OF THE OFFER:</Text>
            <View style={styles.termsContent}>
              <Text style={styles.listItem}>
                1. Disbursement is subject to the availability of funds and
                statutory regulation
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page>
        <View style={styles.body}>
          <View style={styles.termsContent}>
            <Text style={styles.listItem}>
              2. The Borrower will reimburse Gypsy Capital Limited on-demand,
              all expenses (including but not limited to legal and insurance
              expenses and all taxes Where-so applicable) thereon incurred by
              Gypsy Capital Limited in Processing this facility and in suing for
              or recovering any sum due hereunder or otherwise in enforcing or
              protecting its rights and interests hereunder.
            </Text>
            <Text style={styles.listItem}>
              3. Gypsy Capital reserves the right to refuse and/or withhold
              disbursement without notice.
            </Text>
            <Text style={styles.listItem}>
              4. The facility is expected to run its full course and there
              non-cancellable Otherwise a non-cancellable fee shall apply. This
              fee shall be equivalent to the interest for the month of
              Cancellation/Pre liquidation and an additional one month.
            </Text>
            <Text style={styles.listItem}>
              5. This Offer is subject to external confirmation and authenticity
              of all documents submitted for the loan application.
            </Text>
            <Text style={styles.listItem}>
              6. Where any document submitted by the Borrower is found to be
              ingenuine or unreliable this offer will automatically terminate.
            </Text>
          </View>
          <Text style={styles.termsTitle}>EVENTS OF DEFAULT:</Text>
          <Text style={{ marginTop: 15, fontSize: 14 }}>
            The occurrence of any of the following shall cause all outstanding
            sums under this facility to become immediately repayable:
          </Text>
          <View style={styles.termsContent}>
            <Text style={styles.listItem}>
              1. If the Borrower fails to settle when due, any outstanding
              amount owed to and advised by Gypsy Capital Limited;
            </Text>
            <Text style={styles.listItem}>
              2. If the Borrower defaults in the performance or the observance
              of any terms or/and conditions here-above stated;
            </Text>
            <Text style={styles.listItem}>
              3. Where Gypsy Capital Limited gives notice of said breach/default
              to the borrower and said Breach/default continues and remains
              unalleviated after (7) days' notice had been given to it; or
            </Text>
            <Text style={styles.listItem}>
              4. Where the repayment of the facility is not discharged as at
              when due (with reference to the monthly installment payment and
              other outstanding amounts applicable to the facility), Gypsy
              Capital Limited has the right to upload customer's data as
              delinquent on the Credit bureau.
            </Text>
          </View>
        </View>
      </Page>
      <Page>
        <View style={styles.body}>
          <View style={styles.termsContent}>
            <Text style={styles.listItem}>
              5. Should any of the rentals remain un-paid, for any reason
              whatsoever, a penalty equal to 1.67% of the amount of the rental
              shall be payable for each day of the period that the rental
              remained unpaid.
            </Text>
          </View>
          <Text style={styles.termsTitle}>General</Text>
          <View style={styles.termsContent}>
            <Text style={styles.listItem}>
              1. All cheques must be made in the name of Gypsy Capital Limited
              to the express exclusion of any known staff of the company.
            </Text>
            <Text style={styles.listItem}>
              2. The Borrower hereby irrevocably and unconditionally consents to
              Gypsy Capital Limited providing any and all information on the
              Borrower's dealings with it to the credit Bureaus/Registries as it
              may deem necessary.
            </Text>
            <Text style={styles.listItem}>
              3. The Borrower hereby irrevocably and unconditionally consents to
              Gypsy Capital Limited providing any and all information on its
              dealings with Gypsy Capital to such credit Bureaus/Registries as
              Gypsy Capital Limited may deem necessary.
            </Text>
          </View>
          <View style={styles.line} />
          <Text style={styles.termsTitle}>Important Notice</Text>
          <Text style={styles.paragraphOne}>
            Please note that where this offer is not accepted within 7 (Seven)
            days, it shall be subjected to review against the prevailing market
            values.
          </Text>
          <Text style={styles.paragraphOne}>
            We hope that our offer meets your needs. if so, kindly indicate your
            acceptance of the conditions outlined above by executing the
            Memorandum of acceptance attached to this letter.
          </Text>
          <Text style={styles.paragraphOne}>
            Upon acceptance of this offer, kindly find the Personal Loan
            Agreement attached, for your execution.
          </Text>
          <Text style={styles.paragraphOne}>
            We thank you for this opportunity to be of service to you.
          </Text>
          <Text style={styles.paragraphOne}>
            **The parties acknowledge and agree that this agreement (offer
            letter) may execute by electronic signature, which shall be
            considered as an original signature for all purposes
          </Text>
        </View>
      </Page>
      <Page>
        <View style={styles.lastPage}>
          <View style={styles.lastContent}>
            <Text style={styles.paragraphOne}>
              and shall include faxed versions of the parties original
              signature, copied and pasted image of the parties handwritten
              signature on the agreement, parties written name or signature
              using a stylus, keypad or keyboard or electronically scanned and
              transmitted versions (e.g., via pdf) of an original signature.**
            </Text>
            <Text style={styles.paragraphOne}>For Gypsy Capital.</Text>
            <View style={styles.signature}>
              <View style={styles.signGroup}>
                <Text>Head Credit</Text>
                <Text>{dynamicData.headCreditSign}</Text>
              </View>
              <View style={styles.signGroup}>
                <Text>Head Credit & Risk Management</Text>
                <Text>{dynamicData.headRiskSign}</Text>
              </View>
            </View>
            <Text style={styles.termsTitle}>Memorandum of Acceptance</Text>
            <Text style={styles.paragraphOne}>
              I ___________________________, OF
              _____________________________________ have read and have fully
              understood the terms and conditions of the offer. Therefore I
              agree to the terms and conditions of the offer and have
              accordingly affirmed same;
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2021 Gypsy Capital. All Rights Reserved.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OfferLetterPdf;
