import {ReactElement} from 'react';

import {observer} from 'mobx-react-lite';


import {AlertSnackbar} from "components/snakBar/SnakBar";
import {app} from "api/store/appStore";

const AlertSnackbars = observer((): Nullable<ReactElement> => {
    const {errorMessage, setErrorMessage, successMessage, setSuccessMessage} = app;

    if (errorMessage !== null) {
        return <AlertSnackbar type="error" onClose={setErrorMessage} message={errorMessage}/>;
    }

    if (successMessage !== null) {
        return <AlertSnackbar type="success" onClose={setSuccessMessage} message={successMessage}/>;
    }

    return null;
});

export default AlertSnackbars;

export type Nullable<T> = null | T;