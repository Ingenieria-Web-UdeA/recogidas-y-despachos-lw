import { useDateFiltersContext } from '@context/dateFilterContext';

const years = [2021, 2022, 2023];

export const months = [
  { name: 'Enero', value: 0 },
  { name: 'Febrero', value: 1 },
  { name: 'Marzo', value: 2 },
  { name: 'Abril', value: 3 },
  { name: 'Mayo', value: 4 },
  { name: 'Junio', value: 5 },
  { name: 'Julio', value: 6 },
  { name: 'Agosto', value: 7 },
  { name: 'Septiembre', value: 8 },
  { name: 'Octubre', value: 9 },
  { name: 'Noviembre', value: 10 },
  { name: 'Diciembre', value: 11 },
];

interface DateFiltersProps {
  hideMonth?: boolean;
  hideYear?: boolean;
}

const DataFilters = ({ hideMonth, hideYear }: DateFiltersProps) => {
  const { dateFilters, setDateFilters } = useDateFiltersContext();
  return (
    <div className='flex w-full justify-center gap-2'>
      {!hideYear && (
        <label>
          <span>Año</span>
          <select
            value={dateFilters?.year?.toString()}
            onChange={(e) =>
              setDateFilters((prev) => ({
                ...prev,
                year: parseInt(e.target.value),
              }))
            }
          >
            <option value='' disabled>
              Seleccionar Año
            </option>
            {years.map((year) => (
              <option key={`year_${year}`} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      )}
      {!hideMonth && (
        <label>
          <span>Mes</span>
          <select
            value={dateFilters?.month?.toString()}
            onChange={(e) =>
              setDateFilters((prev) => ({
                ...prev,
                month: parseInt(e.target.value),
              }))
            }
          >
            <option value='' disabled>
              Seleccionar mes
            </option>
            {months.map((month) => (
              <option key={`month_${month.value}`} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export { DataFilters };
