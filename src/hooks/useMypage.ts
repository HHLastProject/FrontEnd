import { useQuery } from "@tanstack/react-query";
import { mypageKeys } from "../apis/queries";
import { apiPath } from "../shared/path";
import api, { api_token } from "../shared/api";
import { Feed } from "../pages/Mypage";
import { useState } from "react";
import { AxiosError } from "axios";

const useMypage = () => {

    const { refetch, isError, isSuccess, isLoading, data } = useQuery({
        queryKey: mypageKeys.GET_MYPAGE,
        queryFn: async () => {

            const res = await api_token.get(apiPath.mypage);
            if (res.status === 401) {
                throw new Error("비로그인");
            }

            const result = res.data.mypages as Feed[];
            return result[0] as Feed;
        },
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        onError(err: AxiosError) {
            if (err.response?.status === 401) {
                console.log(err);
                return;
            }
            throw err;
        }
    });
    return { refetch, isError, isSuccess, isLoading, data };
}

export default useMypage;