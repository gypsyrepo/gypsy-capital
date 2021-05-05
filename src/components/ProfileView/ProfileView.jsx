import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./ProfileView.module.scss";
import { Row, Col } from "react-bootstrap";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { BiCreditCard } from "react-icons/bi";
import { RiBankFill } from "react-icons/ri";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import MonoWidget from "../../components/MonoWidget/MonoWidget";

const ProfileView = () => {
  const [visibleSection, setVisibleSection] = useState("personalInfo");
  const [profileImg, setProfileImg] = useState(null);
  const [visiblePaymentSection, setVisiblePaymentSection] = useState("card");

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    bvn: "",
    residence: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [remitaData, setRemitaData] = useState({
    card: "",
    otp: "",
  });

  const [remitaDataError, setRemitaDataError] = useState({
    card: null,
    otp: null,
  });

  const profilePicRef = useRef();

  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { userDetails },
    getClientDetails,
  } = useContext(UserContext);

  useEffect(() => {
    getClientDetails(user.user_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  useEffect(() => {
    if (userDetails) {
      // setProfileData({
      //   firstName
      // })
      // console.log(userDetails);
      const { bioData, identity, residence } = userDetails;
      setProfileData({
        firstName: bioData.firstName,
        lastName: bioData.lastName,
        email: bioData.email,
        phoneNo: bioData.phoneNumber.replace("234", "0"),
        bvn: bioData.BVN,
        residence: residence.street,
      });
      setProfileImg(identity.profilePhoto);
    }
  }, [userDetails]);

  const goToProfileSection = (section) => {
    setVisibleSection(section);
  };

  return (
    <div className={styles.profileBox}>
      <div className={styles.header}>
        <Row>
          <Col
            onClick={() => goToProfileSection("personalInfo")}
            className={[styles.borderStyle, styles.tabCol].join(" ")}
          >
            <p
              className={[
                styles.tabMenu,
                visibleSection === "personalInfo" && styles.activeTab1,
              ].join(" ")}
            >
              Personal Info
            </p>
          </Col>
          <Col
            onClick={() => goToProfileSection("security")}
            className={[styles.borderStyle, styles.tabCol].join(" ")}
          >
            <p
              className={[
                styles.tabMenu,
                visibleSection === "security" && styles.activeTab2,
              ].join(" ")}
            >
              Security
            </p>
          </Col>
          <Col
            onClick={() => goToProfileSection("payment")}
            className={styles.tabCol}
          >
            <p
              className={[
                styles.tabMenu,
                visibleSection === "payment" && styles.activeTab3,
              ].join(" ")}
            >
              Payment
            </p>
          </Col>
        </Row>
      </div>
      <div className={styles.body}>
        {visibleSection === "personalInfo" && (
          <div>
            <div className={styles.profilePictureSection}>
              {profileImg && <img src={profileImg} alt="profile" />}
            </div>
            <div className={styles.uploadBtn}>
              <input type="file" id="profilePic" hidden ref={profilePicRef} />
              {/* <label htmlFor="profilePic">Change Profile Picture</label> */}
            </div>
            <Row className="mb-4">
              <Col sm={12} md={6} className="mb-4 mb-md-0">
                <InputField
                  label="First Name"
                  type="text"
                  nameAttr="firstName"
                  value={profileData.firstName}
                />
              </Col>
              <Col sm={12} md={6}>
                <InputField
                  label="Last Name"
                  type="text"
                  nameAttr="lastName"
                  value={profileData.lastName}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col sm={12} md={6} className="mb-4 mb-md-0">
                <InputField
                  label="Email"
                  type="email"
                  nameAttr="email"
                  value={profileData.email}
                />
              </Col>
              <Col sm={12} md={6}>
                <InputField
                  label="Phone Number"
                  type="text"
                  nameAttr="phoneNumber"
                  value={profileData.phoneNo}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} className="mb-4 mb-md-0">
                <InputField
                  label="BVN"
                  type="text"
                  nameAttr="bvn"
                  value={profileData.bvn}
                />
              </Col>
              <Col sm={12} md={6}>
                <InputField
                  label="Residential Address"
                  type="text"
                  nameAttr="address"
                  value={profileData.residence}
                />
              </Col>
            </Row>
            {/* <Button
              className="mt-5"
              fullWidth
              bgColor="#741763"
              size="lg"
              color="#EBEBEB"
            >
              Edit Info
            </Button> */}
          </div>
        )}
        {visibleSection === "security" && (
          <div className={styles.security}>
            <h2>CHANGE PASSWORD</h2>
            <Row className="mb-4">
              <Col>
                <InputField
                  type="password"
                  label="Current Password"
                  nameAttr="currPassword"
                  value={passwordData.currentPassword}
                  changed={(val) => {
                    setPasswordData({ ...passwordData, currentPassword: val });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <InputField
                  type="password"
                  label="New Password"
                  nameAttr="newPassword"
                  value={passwordData.newPassword}
                  changed={(val) =>
                    setPasswordData({ ...passwordData, newPassword: val })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  type="password"
                  label="Confirm New Password"
                  nameAttr="confirmPassword"
                  value={passwordData.confirmPassword}
                  changed={(val) =>
                    setPasswordData({ ...passwordData, confirmPassword: val })
                  }
                />
              </Col>
            </Row>
            <Button
              className="mt-5"
              fullWidth
              bgColor="#741763"
              size="lg"
              color="#EBEBEB"
            >
              Change Password
            </Button>
          </div>
        )}
        {visibleSection === "payment" && (
          <div className={styles.payment}>
            <div className={styles.btnGroup}>
              <button
                className={
                  visiblePaymentSection === "card" && styles.activeMenu
                }
                onClick={() => setVisiblePaymentSection("card")}
              >
                <BiCreditCard className={styles.icon} />
                Remita
              </button>
              <button
                className={
                  visiblePaymentSection === "bank" && styles.activeMenu
                }
                onClick={() => setVisiblePaymentSection("bank")}
              >
                <RiBankFill className={styles.icon} />
                Bank
              </button>
            </div>
            <div className={styles.content}>
              {visiblePaymentSection === "card" && (
                <div className={styles.addRemita}>
                  <div className={styles.cardInner}>
                    {/* <BiPlus size="2em" />
                    <p>Add Card</p> */}
                    <Row className="mb-3">
                      <Col>
                        <InputField
                          type="text"
                          nameAttr="card-remita"
                          changed={(val) => {
                            setRemitaData({ ...remitaData, card: val });
                            setRemitaDataError({
                              ...remitaDataError,
                              card: null,
                            });
                          }}
                          value={remitaData.card}
                          error={remitaDataError?.card}
                          label="Card"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <InputField
                          type="number"
                          nameAttr="otp-remita"
                          changed={(val) => {
                            setRemitaData({ ...remitaData, otp: val });
                            setRemitaDataError({
                              ...remitaDataError,
                              otp: null,
                            });
                          }}
                          value={remitaData.otp}
                          error={remitaDataError?.otp}
                          label="OTP"
                        />
                      </Col>
                    </Row>
                    <Button
                      bgColor="#a02089"
                      color="#fff"
                      size="lg"
                      className="mt-5"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
              {visiblePaymentSection === "bank" && (
                <div className={styles.monoLink}>
                  <div>
                    <h4>
                      To completely setup your account, you need to link your
                      bank
                    </h4>
                    <MonoWidget />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
