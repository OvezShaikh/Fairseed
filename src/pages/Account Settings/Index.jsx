import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Navigation from "../../components/layout/Navigation/Index";

import Footer from "../../components/layout/Footer";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import SettingTabs from "../../components/layout/SettingsTabs/Index";


import InputField from "../../components/inputs/InputField";
import { Form, Formik } from 'formik';

import "./Account Settings.css";
import PrimaryButton from '../../components/inputs/PrimaryButton';


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

        <SettingTabs />


        <div className="mx-auto flex justify-center">
        <PrimaryButton className="mx-auto">Save Changes</PrimaryButton>
        </div>

      </div>

      <Footer />

    </>
  )
}

export default Index