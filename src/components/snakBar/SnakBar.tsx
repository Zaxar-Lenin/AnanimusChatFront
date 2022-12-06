import * as React from 'react';
import { forwardRef, ReactElement, SyntheticEvent } from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const DEFAULT_AUTO_HIDE_DURATION = 6000;

interface props {
    onClose: (value: null) => void;
    message: string;
    type: AlertColor;
    autoHideDuration?: number;
}

export const AlertSnackbar = ({
                                  onClose,
                                  message,
                                  type,
                                  autoHideDuration = DEFAULT_AUTO_HIDE_DURATION,
                              }: props): ReactElement => {
    const closeModal = (event?: SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }
        onClose(null);
    };

    return (
        <Snackbar
            open={!!message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={autoHideDuration}
            onClose={closeModal}
        >
            <Alert onClose={closeModal} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};