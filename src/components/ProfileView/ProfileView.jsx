import React, { useState, useContext, useRef, useEffect } from 'react';
import styles from './ProfileView.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { BiCreditCard, BiPlus } from 'react-icons/bi';
import { RiBankFill } from 'react-icons/ri';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserContext } from '../../context/UserContext';
import MonoWidget from '../../components/MonoWidget/MonoWidget';


const ProfileView = () => {

  const [visibleSection, setVisibleSection] = useState('personalInfo');
  const [profileImg, setProfileImg] = useState(null);
  const [visiblePaymentSection, setVisiblePaymentSection] = useState('card');

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    bvn: "",
    residence: ""
  })

  const profilePicRef = useRef();

  const { state: { user } } = useContext(AuthContext);
  const { 
    state: { userDetails },
    getClientDetails, 
  } = useContext(UserContext);

  useEffect(() => {
    getClientDetails(user.user_id);
  }, [])

  useEffect(() => {
    if(userDetails) {
      // setProfileData({
      //   firstName
      // })
      console.log(userDetails)
      const { bioData, identity, residence } = userDetails;
      setProfileData({
        firstName: bioData.firstName,
        lastName: bioData.lastName,
        email: bioData.email,
        phoneNo: bioData.phoneNumber.replace('234', '0'),
        bvn: bioData.BVN,
        residence: residence.street
      })
      setProfileImg(identity.profilePhoto)
    }
  }, [userDetails])

  const goToProfileSection = (section) => {
    console.log('works');
    setVisibleSection(section);
  }

  return (
    <div className={styles.profileBox}>
      <div className={styles.header}>
        <Row>
          <Col 
            onClick={() => goToProfileSection('personalInfo')} 
            className={[styles.borderStyle, styles.tabCol].join(' ')}
          >
            <p 
              className={[styles.tabMenu, visibleSection === "personalInfo" && styles.activeTab1].join(' ')}
            >
              Personal Information
            </p>
          </Col>
          <Col 
            onClick={() => goToProfileSection('security')} 
            className={[styles.borderStyle, styles.tabCol].join(' ')}
          >
            <p
              className={[styles.tabMenu, visibleSection === "security" && styles.activeTab2].join(' ')}
            >
              Security
            </p>
          </Col>
          <Col
            onClick={() => goToProfileSection('payment')} 
            className={styles.tabCol}
          >
            <p
              className={[styles.tabMenu, visibleSection === "payment" && styles.activeTab3].join(' ')}
            >
              Payment
            </p>
          </Col>
        </Row>
      </div>
      <div className={styles.body}>
        {visibleSection === "personalInfo" && <div>
          <div className={styles.profilePictureSection}>
            { profileImg && <img src={profileImg} alt="profile image"/> }
          </div>
          <div className={styles.uploadBtn}>
            <input type="file" id="profilePic" hidden ref={profilePicRef} />
            <label  
              htmlFor="profilePic"
            >
              Change Profile Picture
            </label>
          </div>
          <Row className="mb-4">
          <Col>
            <InputField 
              label="First Name"
              type="text"
              nameAttr="firstName"
              value={profileData.firstName}
            />
          </Col> 
          <Col>
            <InputField 
              label="Last Name"
              type="text"
              nameAttr="lastName"
              value={profileData.lastName}
            />
          </Col> 
          </Row> 
          <Row className="mb-4">
          <Col>
            <InputField 
              label="Email"
              type="email"
              nameAttr="email"
              value={profileData.email}
            />
          </Col> 
          <Col>
            <InputField 
              label="Phone Number"
              type="text"
              nameAttr="phoneNumber"
              value={profileData.phoneNo}
            />
          </Col> 
          </Row> 
          <Row>
          <Col>
            <InputField 
              label="BVN"
              type="text"
              nameAttr="bvn"
              value={profileData.bvn}
            />
          </Col> 
          <Col>
            <InputField 
              label="Residential Address"
              type="text"
              nameAttr="address"
              value={profileData.residence}
            />
          </Col> 
          </Row> 
          <Button className="mt-5" fullWidth  bgColor="#741763" size="lg" color="#EBEBEB">
            Edit Info
          </Button>
        </div>}
        { visibleSection === "security" &&
          <div className={styles.security}>
            <h2>CHANGE PASSWORD</h2>
            <Row className="mb-4">
              <Col>
                <InputField 
                  type="password"
                  label="Current Password"
                  nameAttr="currPassword"
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <InputField 
                  type="password"
                  label="Current Password"
                  nameAttr="currPassword"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField 
                  type="password"
                  label="Current Password"
                  nameAttr="currPassword"
                />
              </Col>
            </Row>
          </div>
        }
        { visibleSection === "payment" && 
          <div className={styles.payment}>
            <div className={styles.btnGroup}>
              <button 
                className={ visiblePaymentSection === 'card' && styles.activeMenu }
                onClick={() => setVisiblePaymentSection('card')}
              >
                <BiCreditCard className={styles.icon} />
                Card
              </button>
              <button
                className={ visiblePaymentSection === 'bank' && styles.activeMenu }
                onClick={() => setVisiblePaymentSection('bank')}
              >
                <RiBankFill className={styles.icon} />
                Bank
              </button>
            </div>
            <div className={styles.content}>
              { visiblePaymentSection === "card" && <div className={styles.addCard}>
                <div className={styles.cardInner}>
                  <BiPlus size="2em" />
                  <p>Add Card</p>
                </div>
              </div> }
              { visiblePaymentSection === "bank" && <div className={styles.monoLink}>
                <div>
                  <h4>To completely setup your account, you need to link your bank</h4>
                  <MonoWidget />
                </div>
              </div> }
            </div>
          </div>
        }
      </div>
    </div>
  )
}


export default ProfileView;