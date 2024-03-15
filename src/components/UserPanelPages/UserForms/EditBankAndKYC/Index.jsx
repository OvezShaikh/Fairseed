import React, { useState } from "react";
import InputField from "../../../inputs/InputAdminField/Index";
import { Form, Formik } from "formik";
import { FormLabel } from "@mui/material";
import UploadField from "../../../inputs/AdminUploadField/Index";
import PrimaryButton from "../../../inputs/PrimaryButton";
import Attachments from "../../../layout/Attachments/Index";
import { useCreateOrUpdate, useGetAll } from "../../../../Hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RadioGroup from "../../../inputs/radioGroupAdminPanel/index";
import CheckBox from "../../../inputs/checkBox";
import { red } from "@mui/material/colors";
import * as Yup from "yup";

function CausesView() {
  let { state } = useLocation();
  let { id } = state;

  const [data, setData] = useState({});
  let navigate = useNavigate();
  // const [imgOne, setImgOne] = useState('');
  // const [imgTwo, setImgTwo] = useState('');
  // const [imgThree, setImgThree] = useState('');

  const img = [
    "https://images.pexels.com/photos/20197333/pexels-photo-20197333/free-photo-of-a-man-in-cowboy-hat-riding-a-horse-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/20197333/pexels-photo-20197333/free-photo-of-a-man-in-cowboy-hat-riding-a-horse-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/20197333/pexels-photo-20197333/free-photo-of-a-man-in-cowboy-hat-riding-a-horse-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  ];
  const validationSchema = Yup.object().shape({
    declaration: Yup.boolean()
      .required("You must give consent by checking the checkbox")
      .oneOf([true], "You must give consent by checking the checkbox"),
  });
  const initial_values = {
    account_holder_name: data?.account_holder_name || "",
    account_number: data?.account_number || "",
    bank_data: data?.bank_data || "",
    bank_name: data?.bank_name || "",
    branch_name: data?.branch_name || "",
    title: data?.campaign?.title || "",
    ifsc_code: data?.ifsc_code || "",
    status: data?.status || false,
    pan_card: data?.pan_card || "",
    adhar_card: data?.adhar_card || "",
    tandc_accept: data?.tandc_accept || "",
    other: data?.other || "",
    declaration: false,
  };

  useGetAll({
    key: `/user-dashboard/edit-bankkyc/${id}`,
    enabled: true,
    select: (data) => {
      console.log(data);
      return data.data.data;
    },
    onSuccess: (data) => {
      setData(data);
    },
  });
  const { mutate } = useCreateOrUpdate({
    url: `/user-dashboard/edit-bankkyc/${id}`,
    method: "put",
  });

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        toast.success(
          "Your changes has been recorded and is sent for approval to Admin ",
          {
            position: "top-right",
          }
        );
        navigate(-1);
      },
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      initialValues={initial_values}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <div className="p-4 w-[100%] ">
            <div className="flex flex-col gap-7  w-[70%] max-desktop:w-full max-tablet:w-[100%]">
              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <InputField
                    label={"Aadhar Card:"}
                    name={"adhar_card"}
                    value={values?.adhar_card}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Account Holder Name:"}
                    name={"account_holder_name"}
                    value={values?.account_holder_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Beneficiary Bank Account Number::"}
                    name={"account_number"}
                    value={values?.account_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Bank Name:"}
                    name={"bank_name"}
                    value={values?.bank_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Branch Name:"}
                    name={"branch_name"}
                    value={values?.branch_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"IFSC Code:"}
                    name={"ifsc_code"}
                    value={values?.ifsc_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Pan Card Number:"}
                    name={"pan_card"}
                    value={values?.pan_card}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Adhar Number:"}
                    name={"adhar_card"}
                    value={values?.adhar_card}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Other Details (Optional):"}
                    name={"other"}
                    value={values?.other}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <FormLabel
                    sx={{
                      fontSize: "16px",
                      fontFamily: "satoshi",
                      fontWeight: 700,
                      color: "#383A42",
                      paddingLeft: "8px",
                    }}
                  >
                    Documents:
                  </FormLabel>
                  <div className="flex gap-4 pt-2 max-tablet:flex-col">
                    <div className="flex flex-col gap-2">
                      <Attachments imageUrl={data.passbook_image} />
                      <FormLabel
                        sx={{
                          fontSize: "16px",
                          fontFamily: "satoshi",
                          fontWeight: 700,
                          color: "#383A42",
                          paddingLeft: "8px",
                        }}
                      >
                        PAN Card
                      </FormLabel>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Attachments imageUrl={data.adhar_card_image} />
                      <FormLabel
                        sx={{
                          fontSize: "16px",
                          fontFamily: "satoshi",
                          fontWeight: 700,
                          color: "#383A42",
                          paddingLeft: "8px",
                        }}
                      >
                        Adhar Card
                      </FormLabel>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Attachments imageUrl={{}} />
                      <FormLabel
                        sx={{
                          fontSize: "16px",
                          fontFamily: "satoshi",
                          fontWeight: 700,
                          color: "#383A42",
                          paddingLeft: "8px",
                        }}
                      >
                        Passbook
                      </FormLabel>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <UploadField label="Upload PAN Card Copy:" name={"pan"} />
                </div>
                <div className="w-full">
                  <UploadField label="Upload Aadhar Card Copy:" name={"pan"} />
                </div>
                <div className="w-full">
                  <UploadField label="Upload Passbook Copy:" name={"pan"} />
                </div>
                <RadioGroup
                  onChange={(e) => {
                    setFieldValue("tandc_accept", e.target.value);
                  }}
                  name="rasing_for"
                  value={values?.tandc_accept}
                  required={true}
                  options={[
                    { label: "Self", value: "Self" },
                    { label: "Family/Friends", value: "Family" },
                    { label: "Charity", value: "Charity" },
                  ]}
                  label="Raising this Campaign for:"
                  //   onChange={formik.handleChange}
                  //   value={formik.values.rasing_for}
                />
                <CheckBox
                  value={values?.declaration}
                  sx={{
                    paddingLeft: "16px !important",
                    "&.Mui-checked": {
                      color: red[500],
                    },
                  }}
                  style={{ fontSize: "14px !important" }}
                  name="declaration"
                  label={
                    "I give my consent by sharing my Aadhar details with the team for verification"
                  }
                />
                <div className="flex flex-row gap-4 mt-12">
                  <button
                    onClick={() => navigate(-1)}
                    className="w-[69px] h-[32px] bg-[#F7F7F7]"
                  >
                    <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                      Go Back
                    </h1>
                  </button>
                  <PrimaryButton type="submit">
                    <h1 className="text-white font-semibold font-[satoshi]">
                      Save Edit
                    </h1>
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CausesView;
