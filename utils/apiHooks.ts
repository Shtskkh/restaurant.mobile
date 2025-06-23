import {$api} from "./clients";

export const useAuth = (login: string, password: string) => {
    return $api.useQuery(
        "post",
        "/api/Auth/login",
        {
            body: {login: login, password: password},
        },
        {
            enabled: false,
        },
    );
};

export const useDishes = () => {
    return $api.useQuery("get", "/api/Dishes/GetAll");
};

export const useCurrentOrders = (employeeLogin: string) => {
    return $api.useQuery("get", "/api/Orders/GetCurrent/{employeeLogin}", {
        params: {
            path: {employeeLogin: employeeLogin}
        },
        refetchInterval: 10,
    })
}

export const useCreateOrder = () => {
    return $api.useMutation("post", "/api/Orders/Add");
}