import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface DateFilter {
  month: number | null;
  year: number | null;
}

interface DateFiltersContextProps {
  dateFilters: DateFilter;
  setDateFilters: Dispatch<SetStateAction<DateFilter>>;
}

const DateFiltersContext = createContext<DateFiltersContextProps>(
  {} as DateFiltersContextProps
);

export const useDateFiltersContext = () => useContext(DateFiltersContext);

interface DateFiltersContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const DateFiltersContextProvider = ({
  children,
}: DateFiltersContextProviderProps) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [dateFilters, setDateFilters] = useState<{
    month: number | null;
    year: number | null;
  }>({ month: currentMonth, year: currentYear });
  return (
    <DateFiltersContext.Provider value={{ dateFilters, setDateFilters }}>
      {children}
    </DateFiltersContext.Provider>
  );
};

export { DateFiltersContextProvider };
