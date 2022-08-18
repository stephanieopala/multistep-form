import {
  TextField,
  Grid
} from '@mui/material';

function PersonalInfo() {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={6}
      >
        <TextField
          id="first-name"
          label="First Name"
          variant="outlined"
          size='small'
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid
        item
        xs={6}
      >
        <TextField
          id="last-name"
          label="Last Name"
          variant="outlined"
          size="small"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          type="phone"
          fullWidth
          size="small"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          id="residence"
          label="Residence"
          variant="outlined"
          size="small"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
    </Grid>
  )
}

export default PersonalInfo