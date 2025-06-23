import {QueryClient} from "@tanstack/react-query";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type {paths} from "./schema";

export const queryClient = new QueryClient();

export const fetchClient = createFetchClient<paths>({
    baseUrl: "http://10.0.2.2:8080/",
});

export const $api = createClient(fetchClient);
