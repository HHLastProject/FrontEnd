import React from 'react'
import { Coordinate } from '../custom/ym/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mapQueryKeys } from '../apis/queries';
import api, { api_token } from '../shared/api';
import { apiPath } from '../shared/path';

type Payload = {
    lng: number,
    lat: number,
    range: number
}

const useMapDataCall = () => {
    const queryClient = useQueryClient();

    const { data, isSuccess, isError, mutate, isLoading, mutateAsync } = useMutation({
        mutationKey: mapQueryKeys.POST_SHOPS_IN_RANGE,
        mutationFn: async (payload: Payload) => {
            const res = await api.post(apiPath.shopList, payload);
            return res.data.shops;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mapQueryKeys.POST_SHOPS_IN_RANGE });
        },
        onError: (err) => {
            console.log(err);
        }
    });
    return { data, mutate, isSuccess, isError, isLoading, mutateAsync };
}

export default useMapDataCall;