import { useDateFiltersContext } from '@context/dateFilterContext';
import {
  RangeSelector,
  Margin,
  Scale,
  MinorTick,
  SliderMarker,
} from 'devextreme-react/range-selector';

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

  const startValue = new Date(2021, 0, 1);
  const endValue = new Date();
  const range = [
    new Date(dateFilters.initYear ?? 2023, dateFilters.initMonth ?? 0, 1),
    new Date(dateFilters.finalYear ?? 2023, dateFilters.finalMonth ?? 0, 1),
  ];

  return (
    <div className='flex w-full justify-center gap-2'>
      <RangeSelector
        id='range-selector'
        title='Rango de fechas'
        defaultValue={range}
        width='100%'
        onValueChanged={(e) => {
          setDateFilters({
            initMonth: new Date(e.value[0]).getMonth(),
            initYear: new Date(e.value[0]).getFullYear(),
            finalMonth: new Date(e.value[1]).getMonth(),
            finalYear: new Date(e.value[1]).getFullYear(),
          });
        }}
      >
        <Scale
          startValue={startValue}
          endValue={endValue}
          minorTickInterval='month'
          tickInterval='month'
          minRange='month'
        >
          <MinorTick visible={false} />
        </Scale>
        <SliderMarker format='monthAndDay' />
      </RangeSelector>
    </div>
  );
};

export { DataFilters };
