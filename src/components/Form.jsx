import { useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  // Typography,
  Button
} from '@mui/material';
import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import ReviewInfo from './ReviewInfo';

const steps = [' Account Details', 'Personal Info', 'Review and Submit'];

const formContent = (step) => {
  switch(step) {
    case 0:
      return <AccountDetails />;
    case 1:
      return <PersonalInfo />;
    case 2:
      return <ReviewInfo />;
    default:
      return <div>404: Not Found</div>
  }
};

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const formik = useFormik({
    initialValues: {

    },
  });

  return (
    <Box
      sx={{
        maxWidth: '600px',
        padding: 2
      }}
    >
      <Stepper activeStep={activeStep} >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ padding: '20px' }}
        >
          {formContent(activeStep)}
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
          disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button>
              Submit
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) }
        </Grid>
      </Grid>
    </Box>
  )
}

export default Form;