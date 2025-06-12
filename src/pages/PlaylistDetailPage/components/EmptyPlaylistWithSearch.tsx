import { styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSearchItemByKeyword from '../../../hooks/useSearchItemByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import Loading from '../../../common/components/Loading/Loading';
import { useInView } from 'react-intersection-observer';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')(({ theme }) => ({
  height: "calc(100% - 235px)",
  maxHeight: "375px",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.action.active,
  border: "none"
}));

const EmptyPlaylistWithSearch: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>(keyword);
  const { ref, inView } = useInView();

  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemByKeyword({
    q: debouncedKeyword,  // debouncedKeyword가 변경될 때마다 호출됩니다.
    type: [SEARCH_TYPE.Track],
    limit: 10,  // 한 번에 가져올 트랙 수
  });

  // 디바운싱 기능: keyword가 변경될 때마다 500ms 후에 debouncedKeyword를 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500); // 500ms 후에 keyword가 변경되면 debouncedKeyword로 설정

    return () => clearTimeout(timer); // 이전 타이머를 정리하여 불필요한 API 호출 방지
  }, [keyword]);

  // 스크롤 끝에 도달하면 다음 페이지 데이터를 가져오는 함수
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <Typography variant='h1' my='10px'>
        Let's find something for your playlist
      </Typography>
      <SearchInput
        style={{ width: "420px" }}
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="Search for songs or track"
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: 'gray', marginRight: 1 }} />
          ),  // Search 아이콘을 추가
        }}
      />
      
      <SearchContainer>
        {isLoading && <Loading isInfiniteScroll={true} />}
        {data?.pages.map((item, index) => {
          if (!item.tracks) return null;
          return (
              <SearchResultList
                key={index}  
                list={item.tracks.items}
                keyword={debouncedKeyword}
                isLoading={isLoading}
                ref={index === data.pages.length - 1 ? ref : null}
              />
          );
        })}
        {isFetchingNextPage && <Loading isInfiniteScroll={true} />}
      </SearchContainer>
    </>
  );
};

export default EmptyPlaylistWithSearch;
