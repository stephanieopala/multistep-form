import {
  Grid,
  TextField
} from "@mui/material";

const AccountDetails = () => {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          size='small'
          type="password"
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          id="confirm-password"
          label="Confirm Password"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

export default AccountDetails