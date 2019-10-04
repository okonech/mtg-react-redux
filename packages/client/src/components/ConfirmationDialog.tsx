import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '80%',
            maxHeight: 435
        }
    })
);

export interface ConfirmationDialogProps {
    title: string;
    message: string;
    open: boolean;
    onClose: (value: boolean) => void;
}

const ConfirmationDialog: React.SFC<ConfirmationDialogProps> = (props) => {
    const { onClose, open, title, message } = props;
    const classes = useStyles({});

    function handleCancel() {
        onClose(false);
    }

    function handleOk() {
        onClose(true);
    }

    return (
        <Dialog
            className={classes.root}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            maxWidth='xs'
            open={open}
        >
            <DialogTitle id='confirmation-dialog-title'>{title}</DialogTitle>
            <DialogContent dividers={true}>
                <Typography>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color='primary'>
                    Cancel
        </Button>
                <Button onClick={handleOk} color='primary'>
                    Ok
        </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
