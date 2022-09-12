Forms are used often in applications to capture information from users. A multi-step form is a form where it's content is grouped into various steps with smaller pieces of the content. These types of forms are mostly used in cases where the content on the form is a lot, therefore, breaking it into smaller small improves the user-experience.

This article is a step-by-step guide on how to make a multi-step form using React.js, Material UI and Formik and Yup for form validation.

### Table of contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Creating the parent component](#creating-the-form-component)
- [Fetching paginated data](#fetching-paginated-data)
- [Displaying data](#displaying-data)
- [Handling pagination](#handling-pagination)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you will need to have:
- Basic knowledge of React JS.

### Getting Started
Create a new React project using the commands below in your terminal.
```bash
npx create-react-app multistep-form
```

```bash
cd multistep-form
```

Install Material UI for styling. This library also contains some components that we
will use to build the form.

```bash
npm install @mui/material @emotion/react @emotion/styled
```

Next, install Formik and Yup for form handling and validation.
```bash
npm install formik yup
```

Start the project on localhost.
```bash
npm start
```

### Creating the parent component
Our form will have three steps. The first step will contain the account details such as email and passoward.
The second step will contain a user's personal information such as name, phone number and residence. The last step
is a review step where all the information that the user has entered in the form is displayed before he/she submits the form. We will have a parent component `Form` and three child components namely, `AccountDetails`, `PersonalInfo`
and `ReviewInfo`.

In the `src` folder, create a `components` folder. Inside the `components` folder, create a file, `Form.jsx`.
This will be the parent component. Create three other files namely, `AccountDetails.jsx`, `PersonalInfo.jsx`
and `ReviewInfo.jsx` that will contain the children components. In `Form.jsx`, add the following code.

```javascript
import { useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button
} from '@mui/material';
import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import ReviewInfo from './ReviewInfo';
import * as Yup from 'yup';

const steps = [' Account Details', 'Personal Info', 'Review and Submit'];

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      residence: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email'),
      password: Yup.string()
        .min(8),
      confirmPassword: Yup.string()
        .min(8)
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
      firstName: Yup.string()
        .required('First Name is required'),
      lastName: Yup.string()
        .required('Last Name is required'),
    }),
    onSubmit: () => {
      if (activeStep === steps.length - 1) {
        console.log('last step');
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  });

  const formContent = (step) => {
    switch(step) {
      case 0:
        return <AccountDetails formik={formik} />;
      case 1:
        return <PersonalInfo formik={formik} />;
      case 2:
        return <ReviewInfo formik={formik} />;
      default:
        return <div>404: Not Found</div>
    }
  };

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
        {formik.errors.submit && (
          <Grid
            item
            xs={12}
          >
            <FormHelperText error>
              {formik.errors.submit}
            </FormHelperText>
          </Grid>
        )}
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
            <Button onClick={formik.handleSubmit}>
              Next
            </Button>
          ) }
        </Grid>
      </Grid>
    </Box>
  )
}

export default Form;
```