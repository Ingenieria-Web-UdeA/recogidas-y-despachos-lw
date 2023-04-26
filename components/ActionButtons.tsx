import { useRecogidasContext } from '@context/recogidasContext';

const ActionButtons = () => {
  const { setOpenModalRecogidas, setOpenModalDespachos } =
    useRecogidasContext();
  return (
    <div className='flex items-end gap-3'>
      <button onClick={() => setOpenModalRecogidas(true)}>
        Agregar recogida
      </button>
      <button onClick={() => setOpenModalDespachos(true)}>
        Agregar despacho
      </button>
    </div>
  );
};

export { ActionButtons };
