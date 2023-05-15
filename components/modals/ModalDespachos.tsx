import { useRecogidasContext } from '@context/recogidasContext';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Modal } from './Modal';
import FormButtons from '@components/FormButtons';
import { useMutation } from '@apollo/client';
import { CREATE_SHIPMENT } from 'graphql/client/shipment';
import { toast } from 'react-toastify';

const ModalDespachos = () => {
  const { openModalDespachos, setOpenModalDespachos } = useRecogidasContext();
  return (
    <Modal
      title='Agregar despacho'
      open={openModalDespachos}
      setOpen={setOpenModalDespachos}
    >
      <div>
        <FormModalDespachos setOpenModal={setOpenModalDespachos} />
      </div>
    </Modal>
  );
};

interface FormModalDespachosProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const FormModalDespachos = ({ setOpenModal }: FormModalDespachosProps) => {
  const [createShipment, { loading }] = useMutation(CREATE_SHIPMENT);

  const [formData, setFormData] = useState({
    shipmentDate: '',
    shippedBunches: 0,
    deliveredWeight: 0,
  });
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createShipment({
        variables: {
          shippedBunches: formData.shippedBunches,
          shipmentDate: formData.shipmentDate,
          deliveredWeight: formData.deliveredWeight,
        },
      });
      toast.success('Despacho creado con éxito');
      setOpenModal(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error('Error al crear el despacho');
    }
  };
  return (
    <form onSubmit={submitForm} className='flex flex-col gap-2'>
      <label htmlFor='shipmentDate'>
        <span>Fecha del despacho</span>
        <input
          type='date'
          name='shipmentDate'
          required
          value={formData.shipmentDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, shipmentDate: e.target.value }))
          }
        />
      </label>
      <label htmlFor='shippedBunches'>
        <span>Racimos despachados</span>
        <input
          type='number'
          min={0}
          required
          name='shippedBunches'
          placeholder='0'
          value={formData.shippedBunches.toString()}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              shippedBunches: parseInt(e.target.value),
            }))
          }
        />
      </label>
      <label htmlFor='deliveredWeight'>
        <span>Kilos entregados en planta</span>
        <input
          type='number'
          min={0}
          required
          name='deliveredWeight'
          placeholder='0'
          value={formData.deliveredWeight.toString()}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              deliveredWeight: parseInt(e.target.value),
            }))
          }
        />
      </label>
      <FormButtons loading={loading} setOpenModal={setOpenModal} />
    </form>
  );
};

export { ModalDespachos };
