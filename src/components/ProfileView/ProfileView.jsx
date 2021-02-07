import React, { useState, useContext, useRef } from 'react';
import styles from './ProfileView.module.scss';
import { Row, Col } from 'react-bootstrap';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { BiCreditCard,  } from 'react-icons/bi';
import { RiBankFill } from 'react-icons/ri';


const ProfileView = () => {

  const [visibleSection, setVisibleSection] = useState('personalInfo');
  const [profileImg, setProfileImg] = useState(null);

  const profilePicRef = useRef();

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
            { profileImg && <img src="" alt="profile image"/> }
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
            />
          </Col> 
          <Col>
            <InputField 
              label="Last Name"
              type="text"
              nameAttr="lastName"
            />
          </Col> 
          </Row> 
          <Row className="mb-4">
          <Col>
            <InputField 
              label="Email"
              type="email"
              nameAttr="email"
            />
          </Col> 
          <Col>
            <InputField 
              label="Phone Number"
              type="text"
              nameAttr="phoneNumber"
            />
          </Col> 
          </Row> 
          <Row>
          <Col>
            <InputField 
              label="BVN"
              type="text"
              nameAttr="bvn"
            />
          </Col> 
          <Col>
            <InputField 
              label="Residential Address"
              type="text"
              nameAttr="address"
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
              <button>
                <BiCreditCard className={styles.icon} />
                Card
              </button>
              <button>
                <RiBankFill className={styles.icon} />
                Bank
              </button>
            </div>
            <div className={styles.content}>
              <div></div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}


export default ProfileView;