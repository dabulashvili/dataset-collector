import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import {Audio} from "./audio.component";

export default function Modal({handleClose, open}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={Paper}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                Record voice
            </DialogTitle>
            <DialogContent>
                <Audio/>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}
