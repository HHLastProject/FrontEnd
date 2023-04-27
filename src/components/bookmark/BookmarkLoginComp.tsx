import React, { useState } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import { FILTER_LIST, SAMPLE_DATA } from '../../custom/ym/variables';
import BookmarkCard from '../ui/element/cards/BookmarkCard';
import uuid from 'react-uuid';
import { CategoryProp, EachData, ScrapDataSet, ScrapListEachData } from '../../custom/ym/types';
import NoExistBookmark from './NoExistBookmark';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { scrapKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { apiPath } from '../../shared/path';
import { bookmarkData } from '../../custom/ym/dummydata';

const BookmarkLoginComp = ({ categoryState }: CategoryProp) => {

    const navi = useNavigate();
    // const [scrapList, setScrapList] = useState<ScrapDataSet[]>([{
    //     shopId: 0,
    //     shopName: '',
    //     feedCount: 0,
    //     address: '',
    //     thumbnail: '',
    //     isScrap: false,
    //     category: "카페",
    // }]);
    const [scrapList, setScrapList] = useState<ScrapListEachData[]>(bookmarkData.scrapList);



    const { data, refetch, isSuccess, isError } = useQuery({
        queryKey: scrapKeys.GET_SCRAP,
        queryFn: async () => {
            const res = await api_token.get(apiPath.scrapList);
            console.log('res', res);
            return res.data.scrapList;
        },
        onSuccess(data) {
            setScrapList(data);
            return data;
        },
        onError(err) {
            throw err;
        },
    });

    console.log(data);
    // const sampleData: ScrapDataSet[] = categoryState
    //     ? scrapList.filter((element) => element.category === categoryState)
    //     : data;

    const sampleData: ScrapListEachData[] = scrapList.filter((element) => element.folderName === categoryState)


    return (
        <VFlex height='fit-content' gap='20px' etc="padding:20px; flex:none;">
            {sampleData?.length === 0
                ? <NoExistBookmark />
                : sampleData?.map((element) => {
                    if (element.folderName === categoryState || categoryState === null) {
                        return <BookmarkCard key={uuid()} data={element} />;
                    }
                    return null;
                })}
        </VFlex>
    )
}

export default BookmarkLoginComp