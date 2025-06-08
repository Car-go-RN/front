

export const brandImg : {
    [key: string] : {
        icon: string,
        img: string
    }
} = {
    CU: {icon: 'CU', img: require('@/assets/brands/CU.png')},
    GS25: {icon: 'GS25',img: require('@/assets/brands/GS25.png')},
    세븐일레븐: {icon:'세븐일레븐',img: require('@/assets/brands/세븐일레븐.png')},
    던킨도너츠: {icon: '던킨도너츠',img: require('@/assets/brands/던킨도너츠.png')},
    KFC: {icon: 'KFC',img: require('@/assets/brands/KFC.png')},
    공차: {icon: '공차', img: require('@/assets/brands/공차.png')},
    투썸플레이스: {icon: '투썸플레이스', img: require('@/assets/brands/투썸플레이스.png')},
    할리스커피: {icon: '할리스커피', img: require('@/assets/brands/할리스커피.png')},
    엔제리너스: {icon:'엔제리너스', img: require('@/assets/brands/엔제리너스.png')},
    신전떡볶이: {icon:'신전떡볶이', img: require('@/assets/brands/신전떡볶이.png')},
    '33떡볶이': {icon: '33떡볶이', img: require('@/assets/brands/33떡볶이.png')},
    베스킨라빈스: {icon: '베스킨라빈스', img: require('@/assets/brands/베스킨라빈스.png')},
    스타벅스: {icon: '스타벅스', img: require('@/assets/brands/스타벅스.png')},
    롯데리아: {icon: '롯데리아', img: require('@/assets/brands/롯데리아.png')},
    도미노피자: {icon: '도미노피자', img: require('@/assets/brands/도미노피자.png')},
    BBQ: {icon:'BBQ', img: require('@/assets/brands/BBQ.png')},
    파리바게트: {icon:'파리바게트', img: require('@/assets/brands/파리바게트.png')},
}

export type brandKey = keyof typeof brandImg;