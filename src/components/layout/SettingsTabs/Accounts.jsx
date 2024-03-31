import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import Profile_Avatar from '../../layout/Avatar/Index'
import InputField from '../../inputs/InputField';
import CountrySelect from '../../inputs/countrySelect/index';
import { useCreateOrUpdate, useGetAll } from '../../../Hooks';
import { toast } from 'react-toastify';
import PrimaryButton from '../../inputs/PrimaryButton';
import Dropzone from '../../inputs/Cropper/CropDrop'


const InputStyle =
{
  padding: '20px', border: "1px solid #e2e2e2",
  // },
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },

}
const SelectStyle =
{
  padding: '0px', border: "none",
  "&:focus-within": {
    boxShadow: `none`,
    borderColor: "none",
  },

}

let userData = localStorage.getItem('user_info')
let Data = JSON.parse(userData)
let id = Data?.id;







const Account = () => {

  const [Details , setDetails ] = useState({})
  const [image , setImage] = useState(''); 

useGetAll({
  key: `/accounts/user/${id}`,
  enabled: true,
  select: (data) => {
    console.log(data)
    return data.data.data;
  },
  onSuccess: (data) => {
    setDetails(data);
  },
})
useEffect(()=>{
  const img = `${process.env.REACT_APP_BASE_URL}`+ Details?.profile_pic;
setImage(img);
})

const initial_values = {
  username: Details?.username || '',
  email: Details?.email || '',
  mobile_number: Details?.mobile_number || '',
  country: Details?.country || '',
}

  const { mutate } = useCreateOrUpdate({
    url: `/accounts/user/${id}`,
    method: 'put'
  })

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initial_values}
      onSubmit={(values) => {
        mutate(values, {
          onSuccess: () => {
            toast.success(" Details Updated Successfully !", {
              position: 'top-right'
            })
          }
        })
      }}
    >

      {({ values, handleChange }) => (
        <Form>
          <Profile_Avatar img={image}/>
          <InputField
            onChange={handleChange}
            value={values?.username}
            name={"username"}
            label={"Full Name:"}
            sx={InputStyle}
          />
          <InputField
            onChange={handleChange}
            value={values?.email}
            name={"email"}
            label={"Email Id:"}
            sx={InputStyle}
          />
          <InputField
            onChange={handleChange}
            value={values?.mobile_number}
            name={"mobile_number"}
            type='number'
            label={"Mobile:"}
            placeholder={"(Optional)"}
            sx={InputStyle}
          />
          <div className='country-select-div'>
            <CountrySelect
              onChange={handleChange}
              value={values?.country}
              label="Country:"
              name={"country"}
              sx={SelectStyle}
            />
          </div>
          <div className="mx-auto flex justify-center">
            <PrimaryButton type='submit' className="mx-auto">Save Changes</PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Account