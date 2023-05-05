import { MypageContext } from '../../pages/Mypage'
import { VFlex } from '../../custom/ym/styleStore';
import FeedPictures from './FeedPictures';
import FeedSet from './FeedSet';
import { useEffect } from 'react';
import NoMyFeeds from './NoMyFeeds';

const MyFeeds = () => {

    return (
        <VFlex gap='12px'>
            <MypageContext.Consumer>
                {
                    value => {
                        return value?.props?.feedCount as number > 0
                            ? <>
                                <FeedSet>{value?.props?.feedCount}</FeedSet>
                                <FeedPictures isAll={false}>{value?.props?.feeds}</FeedPictures>
                            </>
                            : <NoMyFeeds />
                    }
                }
            </MypageContext.Consumer>
        </VFlex>
    )
}

export default MyFeeds;

