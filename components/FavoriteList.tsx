import { FavoriteItem, useFavoriteList } from '@/feature/favorite/store'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiEdit3, FiStar } from 'react-icons/fi';

const FavoriteList = () => {
    // store
    const { favoriteList, updateFavoriteName } = useFavoriteList()
    const [isClickEdit, setIsClickEdit] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editName, setEditName] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    // 수정버튼 및 완료버튼
    const handleEditButton = (e: React.MouseEvent<HTMLButtonElement>, favoriteItem: FavoriteItem) => {
        e.preventDefault();
        e.stopPropagation();

        const isEditing = editingId === favoriteItem.id

        if (!isEditing) {
            // ✏️ 편집 시작
            setEditingId(favoriteItem.id)
            setEditName(favoriteItem.locationName);
            setIsClickEdit(true);
        } else {
            // ✅ 편집 완료  store name 업데이트
            updateFavoriteName(favoriteItem.id, editName)
            setIsClickEdit(false);
            setEditingId(null)
        }
    }

    // name 수정
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditName(e.target.value)
    }


    useEffect(() => {
        if (isClickEdit) {
            inputRef.current?.focus();
        }
    }, [isClickEdit]);


    return (
        <section className="backdrop-blur-md bg-white/15 rounded-2xl p-4">
            <h3 className="text-sm opacity-80 mb-3 font-bold">즐겨찾기</h3>

            <ul className="flex flex-col divide-y divide-white/20">
                {
                    favoriteList.length > 0 ? favoriteList.map((item, key) => (
                        <li key={key}>
                            <Link href={"/weather/1"} className="flex items-center justify-between py-3 px-1 hover:bg-white/10">
                                {/* 왼쪽: 지역 */}
                                <div className='group'>
                                    <div className='flex gap-1'>
                                        {editingId !== item.id ? <p className="text-base font-medium ">{item.locationName}</p>
                                            : <input ref={inputRef} value={editName} onChange={handleEditChange} onClick={(e) => { e.stopPropagation(); e.preventDefault() }} />
                                        }
                                        <button className='opacity-0 group-hover:opacity-100' id={item.id}
                                            onClick={(e) => handleEditButton(e, item)}>
                                            {editingId === item.id ? <FiCheck /> : <FiEdit3 />}
                                        </button>
                                    </div>
                                    <p className="text-xs opacity-70">
                                        최고 {item.tmx}° · 최저 {item.tmn}°
                                    </p>
                                </div>

                                {/* 오른쪽: 날씨 */}
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={item.iconSrc}
                                        alt="weather"
                                        width={36}
                                        height={36}
                                    />
                                    <span className="text-2xl font-light">
                                        {item.tmp}°
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))
                        : <div className="flex flex-col items-center justify-center py-10 text-center text-white/80">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                                <FiStar size={26} className="text-white/70" />
                            </div>

                            <p className="text-sm font-medium mb-1">
                                즐겨찾기 없음
                            </p>
                            <p className="text-xs opacity-60">
                                자주 확인하는 지역을 추가해보세요
                            </p>
                        </div>
                }
            </ul>
        </section>
    )
}

export default FavoriteList
