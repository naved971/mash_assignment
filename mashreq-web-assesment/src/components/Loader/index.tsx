import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
    visible: boolean;
}


const Loader: React.FC<LoaderProps> = ({ visible }): JSX.Element | null => {
    if(!visible){
        return null;
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={visible}
            data-testid="loader">        
            <CircularProgress color="inherit" />
        </Backdrop>

    );
}

export default Loader;