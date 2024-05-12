import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

interface ModalProps {
  modalContent: React.ReactNode;
  handleOpen?: boolean;
  buttonText?: string;
  onClose?: () => void; // Add the onClose property to the interface
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<ModalProps> = ({ modalContent, handleOpen = true, buttonText = 'Open modal', onClose }) => {
  const [open, setOpen] = useState(handleOpen);

  const handleToggle = () => {
    setOpen(!open);
    if (onClose) {
      onClose(); // Call onClose if it's provided
    }
  };

  return (
    <div>
      <Button onClick={handleToggle}>{buttonText}</Button>
      <Modal
        open={open}
        onClose={handleToggle} // Use handleToggle instead of handleClose
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalContent}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
