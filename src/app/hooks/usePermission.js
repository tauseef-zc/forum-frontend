import { useSelector } from 'react-redux';

const usePermission = () => {

    const { user } = useSelector(state => state.auth);
  
    const isAdmin = user.userType === "Admin";

     return { isAdmin };
}


export default usePermission;