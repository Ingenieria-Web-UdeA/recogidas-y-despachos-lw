import React, { Dispatch, SetStateAction } from 'react';
import ReactLoading from 'react-loading';

interface FormButtonsProps {
  loading: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const FormButtons = ({ loading, setOpenModal }: FormButtonsProps) => (
  <div className='flex w-full justify-center gap-3'>
    <button disabled={loading} type='submit'>
      {loading ? (
        <ReactLoading type='spin' height={30} width={30} />
      ) : (
        <span>Agregar</span>
      )}
    </button>
    <button
      disabled={loading}
      type='button'
      className='secondary'
      onClick={() => setOpenModal(false)}
    >
      Cancelar
    </button>
  </div>
);

export default FormButtons;
