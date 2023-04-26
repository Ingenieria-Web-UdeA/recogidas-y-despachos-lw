const DataFilters = () => (
  <div className='flex gap-3'>
    <label htmlFor='date-from'>
      <span>Desde</span>
      <input name='date-from' type='date' />
    </label>
    <label htmlFor='date-to'>
      <span>Hasta</span>
      <input name='date-to' type='date' />
    </label>
  </div>
);

export { DataFilters };
