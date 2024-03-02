import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Navigation from "../../components/layout/Navigation/Index";
import Footer from "../../components/layout/Footer";
import SettingTabs from "../../components/layout/SettingsTabs/Index";
import "./Account Settings.css";
import PrimaryButton from '../../components/inputs/PrimaryButton';
import { Form, Formik } from 'formik';


function Index() {
  const InputStyle =
  {
    padding: '20px', border: "1px solid #e2e2e2",
    // },
    "&:focus-within": {
      boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
      borderColor: "black",
    },
  }


  
let userData = localStorage.getItem('user_info')
let Data = JSON.parse(userData)
console.log(Data, ' ----------')
let password = Data?.password;
let email = Data?.email;
let mobile_number = Data?.mobile_number;
let country = Data?.country;
let username = Data?.username

  const initial_values = {
    username: username ||  '',
    email: email || '',
    mobile_number:mobile_number || '',
    country: country || '',
    password:password || ''
   }
  

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />

      <Navigation
        label={"Account Settings"}
        heading={"Account Settings"}
      />
      <div className='account-settings-div desktop:max-w-[832px] mx-auto desktop:mt-[128px] max-desktop:max-w-[470px] max-desktop:mt-[60px] max-tablet:mt-[40px] max-tablet:px-[16px]'>
      <Formik 
      enableReinitialize={true}
      initialValues={initial_values}
      
      >
        <Form>
        <SettingTabs />
        <div className="mx-auto flex justify-center">
        <PrimaryButton className="mx-auto">Save Changes</PrimaryButton>
        </div>
        </Form>
        </Formik>

      </div>

      <Footer />

    </>
  )
}

export default Index