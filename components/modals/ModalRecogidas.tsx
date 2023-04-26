import { useRecogidasContext } from '@context/recogidasContext';
import React from 'react';
import { Modal } from './Modal';

const ModalRecogidas = () => {
  const { openModalRecogidas, setOpenModalRecogidas } = useRecogidasContext();
  return (
    <Modal
      title='Agregar recogida'
      open={openModalRecogidas}
      setOpen={setOpenModalRecogidas}
    >
      <div>Este es el modal de recogidas</div>
    </Modal>
  );
};

export { ModalRecogidas };
