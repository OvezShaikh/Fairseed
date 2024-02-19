import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useFormikContext } from "formik";
import PrimaryButton from "../../inputs/PrimaryButton"; // Import PrimaryButton component

const ImageCropper = ({ srcImg, setOpenCrop, setsrcImg }) => {
  const [cropper, setCropper] = useState(null);
  const { setFieldValue, values } = useFormikContext();

  const getCropData = () => {
    if (cropper) {
      setsrcImg(cropper.getCroppedCanvas().toDataURL());
      setOpenCrop(false);

      var arr = cropper.getCroppedCanvas().toDataURL().split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let img = new File([u8arr], values.image, { type: mime });
      setFieldValue("Campaign_pic", img);
    }
  };

  return (
    <Dialog open={true}>
      <Grid item xs={8} className='justify-content-center'>
        <DialogContent
          dividers
          sx={{
            background: "#333",
            position: "relative",
            height: 350,
            width: "auto",
            minWidth: { sm: 500 },
          }}
        >
          <Cropper
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            aspectRatio={3}
            initialAspectRatio={3}
            preview='.img-preview'
            src={srcImg}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={true}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </DialogContent>
        <DialogActions
          className='d-flex justify-content-center align-items-center'
          style={{ width: "100%", marginLeft: " " }}
          sx={{ flexDirection: "column", mx: 3, my: 2 }}
        >
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant='outlined' onClick={() => setOpenCrop(false)}>
              Cancel
            </Button>
            <Button variant='contained' onClick={getCropData}>
              Crop
            </Button>
          </Box>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default ImageCropper;
