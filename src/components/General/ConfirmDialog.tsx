import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  text?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Confirm",
  text = "Are you sure?",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
