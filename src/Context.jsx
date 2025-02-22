import { createContext,useContext,useState,useEffect } from "react";

const UserContext =  createContext()

export const UserProvider = ({children}) => {
    const CODO_URL = "https://codo-test.azurewebsites.net/api/"

    const [error, setError] = useState(null);

    // fetching users and set them in state
    const [users, setUsers] = useState([]);
    
    useEffect(() => {

        const fetchData = () => {
            fetch(`${CODO_URL}getUsers`)
                .then((res) => res.json())
                .then((data) => setUsers(Object.values(data)[0]))
                .catch((err) => {
                    console.error(err)
                    setError("...נכשל לטעון משתמשים, מנסה מחדש");
                    setTimeout(fetchData, 3000); 
                });
        };

        fetchData();
    }, []);



    // if user store in local storage the state take it,
    // setUserInfo executed from LoginPage when user clicking a user name

     // This state is used to store the basic data of the specific user when selected. 
    // The ID is used for the FETCH operation from the specific user data API, 
    // and since the name is not included in the data returned from the API, 
    // we will store the selected user's name in this state, so it can be easily used throughout the application.
    const [userInfo, setUserInfo] = useState(() => {
        const userInfoFromStorage = localStorage.getItem("userInfo");
        return userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null

    });
    // this state will hold all the data from the api about the logged-in user
    const [userData, setUserData] = useState(null);
   

    useEffect(() => {
        if (userInfo === null){
            localStorage.clear()
            setLastOpendUnit(-1)
        }
        if (userInfo && userInfo.id) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo));            
            fetch(`${CODO_URL}getHomepage?userId=${userInfo.id}`)
                .then((res) => res.json())
                    .then((data) => {
                       setUserData(data.homepage)
                    })
        }
      }, [userInfo]); 

   
    
    
    const [isLogin, setisLogin] = useState(false)
    // const [isLogin, setisLogin] = useState(() => {
    //     const isLoginFromStrorage = localStorage.getItem("isLogin");
    //     return isLoginFromStrorage ? JSON.parse(isLogin) : false

    // });
    

    const [lastOpendUnit, setLastOpendUnit] = useState(() => {
        const lastOpenedUnitFromStorage = localStorage.getItem("lastOpened");
        return lastOpenedUnitFromStorage ? JSON.parse(lastOpenedUnitFromStorage) : -1
    });

    useEffect(() => {
        localStorage.setItem("lastOpened", JSON.stringify(lastOpendUnit));
    }, [lastOpendUnit]);

   

   

  

    return (
        <UserContext.Provider value={{userData,setUserData,users,setUsers,isLogin,setisLogin,setUserInfo,userInfo,lastOpendUnit,setLastOpendUnit,error}}>
            {children}
        </UserContext.Provider>

    )
}

export const useUser = () => useContext(UserContext)