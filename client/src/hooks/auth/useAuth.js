export const useAuth = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { isAuth: !!accessToken }
};
