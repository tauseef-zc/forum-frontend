import React from 'react'
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

const NotificationAlert = (props) => {

    const { status, show, message } = props;
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
            setOpen(show);
    }, [show]);

    return (
      <React.Fragment>
        <Collapse in={open}>
          <Alert
            severity={status}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            { message }
          </Alert>
        </Collapse>
      </React.Fragment>
    );
}

export default NotificationAlert;
