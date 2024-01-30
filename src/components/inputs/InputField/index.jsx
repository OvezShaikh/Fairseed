import React from "react";
import { alpha } from "@mui/material/styles";
import { FormLabel, InputBase, TextField, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { ErrorMessage, useField } from "formik";
import { colors, theme } from "../../../constants/theme";

const InputField = ({
  name,
  variant,
  info,
  CustomInfoIcon,
  infoText,
  characterCount,
  label,
  style,
  sx,
  required,
  ...otherProps
}) => {
  // const [field, meta] = useField(name);

  const styles = {

    minHeight: "43.95px",
    "label + &": {
      marginTop: "0.3rem",
    },
    "& .MuiInputBase-input": {
      borderRadius: "3px",
      // borderTopLeftRadius: configTextfield?.startAdornment ? "0px" : "4px",
      // borderBottomLeftRadius: configTextfield?.startAdornment ? "0px" : "4px",
      position: "relative",
      backgroundColor: "#fff",
      border: "1px solid #e2e2e2",
      fontSize: "20px",
      width: "100%",
      padding: "20px",
      ...sx,
      // transition: theme.transitions.create([
      //   "border-color",
      //   "background-color",
      //   "box-shadow",
      // ]),
      // fontFamily: ["FuturaLight"].join(","),
      "&:focus": {
        boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
        borderColor: "black",
      },

      // "&.Mui-disabled": {
      //   backgroundColor: configTextfield?.disabledBgColor
      //     ? configTextfield?.disabledBgColor
      //     : "#F5F5F5",
      //   fontSize: "0.9rem !important",
      // },
    },
    "& input::placeholder": {
      fontSize: "20px",
    },
    // "& .MuiInputBase-input.Mui-disabled": {
    //   WebkitTextFillColor: configTextfield?.disabledColor
    //     ? configTextfield?.disabledColor
    //     : "#00000099",
    // },
    "& .MuiInputAdornment-root.MuiInputAdornment-positionEnd": {
      backgroundColor: "#fff",
      padding: "21px 12px",
      fontSize: "20px",
      marginLeft: "0px",
      borderTopRightRadius: theme.shape.borderRadius + "px",
      borderBottomRightRadius: theme.shape.borderRadius + "px",
    },
    "& .MuiInputAdornment-root.MuiInputAdornment-positionStart": {
      // backgroundColor: theme.palette.divider,
      padding: "21px 12px",
      fontSize: "20px",
      marginRight: "0px",
      borderTopLeftRadius: theme.shape.borderRadius + "px",
      borderBottomLeftRadius: theme.shape.borderRadius + "px",
    },
    // ...sx,
  }


  // const configTextfield = {
  //   // ...field,
  //   ...otherProps,
  //   fullWidth: true,
  //   variant: variant ? variant : "outlined",
  // };

  // if (meta && meta.touched && meta.error) {
  //   configTextfield.error = true;
  //   configTextfield.helpertext = meta.error;
  // }
  let textFieldConfig = {
    variant,
    InputLabelProps: { shrink: true },
    fullWidth: true,
    ...otherProps,
    sx: { ...styles, ...otherProps.sx },
  };

  if (name) {
    //eslint-disable-next-line
    const [field, meta] = useField(name || "");
    textFieldConfig = {
      ...field,
      ...textFieldConfig,
    };

    if (meta && meta.touched && meta.error) {
      textFieldConfig.error = true;
      textFieldConfig.helperText = meta.error;
    }
  }




  // const tooltipData = localStorage.getItem("tooltipData")
  //   ? JSON.parse(localStorage.getItem("tooltipData"))?.filter(
  //       (item) =>
  //         item?.field_name?.toLowerCase() ===
  //         configTextfield?.label?.toLowerCase()
  //     )
  //   : null;

  // return (
  //   <>
  //     <InputBase {...textFieldConfig} />
  //   </>
  // )

  return (
    <>
      {label && (
        <FormLabel
          className="text-capitalize font-medium d-flex align-items-center"
          sx={{
            padding: "4px 8px 8px 8px",
            color: colors.text.main,
            fontSize: "20px",
            fontWeight: 700,
            fontFamily: "satoshi",
            fontStyle: "normal",
            height: "22px",
          }}
        >
          {label}
          {required ? <span className="text-red-600">*</span> : ""}
        </FormLabel>
      )}
      <InputBase
        sx={styles}
        // style={{ ...configTextfield?.style }}
        {...textFieldConfig}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ fontFamily: 'satoshi', color: "red", fontSize: "1rem", paddingLeft: '5px' }}>{msg}</div>
        )}
      />
    </>
  );
};

export default InputField;
