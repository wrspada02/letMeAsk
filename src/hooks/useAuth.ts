
    import { useContext } from 'react';
    import { AuthContext } from '../contexts/AuthContext';

    export function useAuth(){//Uso hooks para importar 2 ou mais

        const value =  useContext(AuthContext);

        return value;
    }