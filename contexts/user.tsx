import {atom} from 'recoil'

interface User {
    isSigned: boolean;
    address: string | null;
    username: string | null;
    emoji: string | null
}
export const user = atom({
    key: 'user',
    default: {
        isSigned: false,
        address: null,
        username: null,
        emoji: null
    } as User
})