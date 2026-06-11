import React, { useRef } from 'react';
import { FormLabel, InputBase } from '@mui/material';
import { colors } from '../../../constants/theme';
import { RxCross2 } from 'react-icons/rx';
import { useField, ErrorMessage } from 'formik';
import images from '../../../constants/images';

const UploadField = ({
  variant,
  multiple = true,
  label = '',
  name,
  required,
  placeholder,
  onChange,
  ...otherProps
}) => {
  const ref = useRef(null);
  const [field, meta, handlers] = useField(name);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (multiple && files.length > 1) {
      // Multiple files selected
      const fileList = Array.from(files);
      handlers.setValue(fileList);
    } else {
      // Single file selected or multiple allowed but only one selected
      handlers.setValue(files[0]);
    }

    handlers.setTouched(true);
  };

  const getDisplayValue = () => {
    if (!field.value) return '';
    if (Array.isArray(field.value)) {
      return field.value.map((f) => f.name).join(', ');
    }
    if (field.value instanceof FileList) {
      return Array.from(field.value)
        .map((f) => f.name)
        .join(', ');
    }
    if (field.value.name) {
      return field.value.name;
    }
    return '';
  };
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: variant ? variant : 'outlined',
  };

  return (
    <div className=''>
      {label && (
        <FormLabel
          className='text-capitalize font-medium d-flex align-items-center'
          sx={{
            padding: '4px 8px 8px 8px',
            color: colors.text.main,
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: 'satoshi',
            fontStyle: 'normal',
          }}
        >
          {label}
          {required ? <span className='text-red-600'>*</span> : ''}
        </FormLabel>
      )}

      <div className='flex w-full h-[50px] Upload_admin_field'>
        <InputBase
          // value={field.value ? field.value.name : ''}
          {...configTextfield}
          value={getDisplayValue()}
          placeholder={placeholder}
          label={label}
          sx={{
            '& .MuiInputBase-input': {
              padding: '10px',
              fontSize: '1rem',
            },
          }}
          fullWidth
          inputProps={{
            readOnly: true,
            placeholder: placeholder,
            // value: field.value ? field.value.name : '',
            value: getDisplayValue(),
          }}
          {...configTextfield}
          disabled
        />
        <>
          <input
            type='file'
            ref={ref}
            style={{ display: 'none' }}
            // id={`file - input - ${name}`}
            id={`file-input-${name}`}
            multiple={multiple}
            onChange={handleFileChange}
          />

          {/* <label
            htmlFor={`file - input - ${name}`}
            className='flex justify-center gap-2 items-center'
          > */}
          <div className='flex justify-center gap-2 items-center'>
            {field.value ? (
              <RxCross2
                size={25}
                color='gray'
                style={{ cursor: 'pointer' }}
                // onClick={() => {
                //   handlers.setValue();
                // }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlers.setValue('');
                }}
              />
            ) : (
              ''
            )}
            <img
              width={49}
              height={37}
              className='flex justify-stretch ml-1'
              src={images.UploadFile}
              style={{ cursor: 'pointer' }}
              alt=''
              // onClick={() => ref?.current?.focus()}
              onClick={() => ref?.current?.click()}
            />
          </div>
        </>
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div
            style={{
              fontFamily: 'satoshi',
              color: 'red',
              fontSize: '1rem',
              paddingLeft: '5px',
            }}
          >
            {msg}
          </div>
        )}
      />
    </div>
  );
};

export default UploadField;
