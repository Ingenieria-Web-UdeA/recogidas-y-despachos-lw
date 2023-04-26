import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface NavigationContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

const NavigationContext = createContext<NavigationContextProps>(
  {} as NavigationContextProps
);

export const useNavigationContext = () => useContext(NavigationContext);

interface NavigationContextProviderProps {
  children: JSX.Element;
}

const NavigationContextProvider = ({
  children,
}: NavigationContextProviderProps) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <NavigationContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContextProvider };
