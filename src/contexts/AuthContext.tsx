
    import { createContext, ReactNode, useState, useEffect } from 'react'
    import { firebase, auth } from "../services/firebase"

      type User = {
        id : string,
        name : string, 
        avatar : string
      }
    
      type AuthContextType = {
        user : User | undefined,
        signInWithGoogle : () => Promise<void>;
      }

      type AuthContextProviderProps = { 
        children : ReactNode
      }

    export const AuthContext = createContext({} as AuthContextType);

    export function AuthContextProvider(props : AuthContextProviderProps){
      
    const [user, setUser] = useState<User>();

    useEffect(() => { //Serve para manter as informacoes do usuario mesmo quando da F5 na pagina
      const unsubscribe = auth.onAuthStateChanged(user => {//este onAuthStateChanged e como se fosse um addEventListener
        if(user){
          const { displayName, photoURL, uid } = user;

            if(!displayName || !photoURL){
              throw new Error('Missing information from Google Account');
            }

            setUser({
              id : uid,
              name : displayName,
              avatar : photoURL
            })
        }
      })


      return() => {
        unsubscribe();
      }
    }, [] /* quando a funcao executa apenas 1 vez, passamos um array vazio */);

    async function signInWithGoogle(){

      const provider = new firebase.auth.GoogleAuthProvider();

      const result = await auth.signInWithPopup(provider);

          if(result.user){
            const { displayName, photoURL, uid } = result.user;

            if(!displayName || !photoURL){
              throw new Error('Missing information from Google Account');
            }

            setUser({
              id : uid,
              name : displayName,
              avatar : photoURL
            })

        }
  }

        return(
            <AuthContext.Provider value={{ user, signInWithGoogle }}> {/* Meu contexto em volta das rotas, elas enxergarao o contexto... */}
            {props.children}
            </AuthContext.Provider>
        );
    }