import { useRecogidasContext } from '@context/recogidasContext';
import React from 'react';
import { Modal } from './Modal';

const ModalDespachos = () => {
  const { openModalDespachos, setOpenModalDespachos } = useRecogidasContext();
  return (
    <Modal
      title='Agregar despacho'
      open={openModalDespachos}
      setOpen={setOpenModalDespachos}
    >
      <div>Este es el modal de despachos</div>
    </Modal>
  );
};

export { ModalDespachos };
