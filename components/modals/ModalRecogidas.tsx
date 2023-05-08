import { useRecogidasContext } from '@context/recogidasContext';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from './Modal';
import { useMutation, useQuery } from '@apollo/client';
import { GET_LOTS } from 'graphql/client/lots';
import { Lot } from '@prisma/client';
import {
  CREATE_COLLECTION,
  GET_FILTERED_COLLECTIONS,
} from 'graphql/client/collections';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

const ModalRecogidas = () => {
  const { openModalRecogidas, setOpenModalRecogidas } = useRecogidasContext();
  return (
    <Modal
      title='Agregar recogida'
      open={openModalRecogidas}
      setOpen={setOpenModalRecogidas}
    >
      <FormModalRecogidas setOpenModal={setOpenModalRecogidas} />
    </Modal>
  );
};

interface CollectionData {
  bunches: number;
  collectionDate: string;
  lot: string;
}

interface FormModalRecogidasInterface {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const FormModalRecogidas = ({ setOpenModal }: FormModalRecogidasInterface) => {
  const [executeMutation, { loading: mutationLoading }] =
    useMutation(CREATE_COLLECTION);

  const [collectionData, setCollectionData] = useState<CollectionData>({
    bunches: 0,
    collectionDate: '',
    lot: '',
  });
  const { data: lotData, loading } = useQuery<{ lots: Lot[] }>(GET_LOTS);

  if (loading) return <p>loading...</p>;

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await executeMutation({
        variables: {
          bunches: collectionData.bunches,
          collectionDate: collectionData.collectionDate.toString(),
          lot: collectionData.lot,
        },
        refetchQueries: [GET_FILTERED_COLLECTIONS],
      });

      toast.success('Recogida agregada correctamente');
      setOpenModal(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('error: ', e);
      toast.error('Error creando la recogida.');
    }
  };

  return (
    <div>
      <form onSubmit={submitForm} className='flex flex-col gap-3'>
        <label htmlFor='bunches'>
          <span>Cantidad de racimos</span>
          <input
            value={collectionData.bunches}
            onChange={(e) =>
              setCollectionData((prev) => ({
                ...prev,
                bunches: parseInt(e.target.value),
              }))
            }
            type='number'
            name='bunches'
            placeholder='0'
            min={0}
          />
        </label>
        <label htmlFor='collectionDate'>
          <span>Fecha de recogida</span>
          <input
            value={collectionData.collectionDate.toString()}
            onChange={(e) =>
              setCollectionData((prev) => ({
                ...prev,
                collectionDate: e.target.value,
              }))
            }
            type='date'
            name='collectionDate'
          />
        </label>
        <label htmlFor='lot'>
          <span>Lote</span>
          <select
            name='lot'
            value={collectionData.lot}
            onChange={(e) =>
              setCollectionData((prev) => ({
                ...prev,
                lot: e.target.value,
              }))
            }
          >
            <option disabled value=''>
              Seleccione el lote
            </option>
            {lotData?.lots?.map((lot) => (
              <option key={lot.id} value={lot.id}>
                {lot.name}
              </option>
            ))}
          </select>
        </label>
        <div className='flex w-full justify-center gap-3'>
          <button disabled={mutationLoading} type='submit'>
            {mutationLoading ? (
              <ReactLoading type='spin' height={30} width={30} />
            ) : (
              <span>Agregar</span>
            )}
          </button>
          <button
            disabled={mutationLoading}
            type='button'
            className='secondary'
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export { ModalRecogidas };
