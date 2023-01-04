type UserContextType = {
    context: string | null,
    setContext: React.Dispatch<React.SetStateAction<string | null>>
}

const iUserContextState = {
   context: null,
   setContext: () => {}
}

const UserContext = createContext<UserContextType>(iUserContextState)

export default UserContext