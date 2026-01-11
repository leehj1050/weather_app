import { create } from 'zustand'

export interface FavoriteItem {
  id: string;
  locationName: string;
  iconSrc: string;
  tmp: string;
  tmx: string;
  tmn: string;
  nx: number;
    ny: number;
    // sky: string;
}


interface FavoriteType {    
    favoriteList: FavoriteItem[]
    addFavorite: (item: FavoriteItem) => void
    updateFavoriteName:(id:string,newName:string)=>void
}

export const useFavoriteList = create<FavoriteType>((set) => ({
  favoriteList: [],
   
  addFavorite: (item) =>
      set((state) => {
          //중복체크
        const isDuplicated = state.favoriteList.some(
        (favorite) => favorite.id === item.id
    )

    if (isDuplicated) {
      alert('이미 즐겨찾기에 추가된 항목입니다.')
      return state // 변경 없음
    }
          
      //  최대 개수 체크 (6개까지만 저장)
        if (state.favoriteList.length >= 6) {
          alert("즐겨찾기는 최대6개까지만 저장됩니다.")
        return state; // 변경 없음
      }

      return {
        favoriteList: [...state.favoriteList, item],
      };
    }),
  
   updateFavoriteName: (id, newName) =>
    set((state) => ({
      favoriteList: state.favoriteList.map((item) =>
        item.id === id
          ? { ...item, locationName: newName }
          : item
      ),
    })),
}))