import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

interface ModalProps {
  modalContent: React.ReactNode;
  handleOpen?: boolean;
  buttonText?: string;
  onClose?: () => void; 
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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
      onClose(); 
    }
  };

  return (
    <div>
      <Button onClick={handleToggle} variant="contained" color="primary">{buttonText}</Button>
      <Modal
        open={open}
        onClose={handleToggle} 
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
