import React from 'react';

interface CardLoteProps {
  name: string;
}

const CardLote = ({ name }: CardLoteProps) => (
  <div className='rounded-lg bg-gray-800 p-5 text-white shadow-lg'>
    <span className='text-lg font-bold'>Lote {name}</span>
    <div className='flex flex-col'>
      <span>Recogidas:50</span>
      <span>Despachos:50</span>
    </div>
  </div>
);

export default CardLote;
