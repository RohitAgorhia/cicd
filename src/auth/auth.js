import Cookies from 'universal-cookie';


export const isLogin = () => {
    const cookies = new Cookies();
    if (cookies.get('Seesiu_auth_token')) {
        return true;
    }
    return false;
}