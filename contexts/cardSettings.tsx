import { atom, selector } from 'recoil'

export const minWidthTile = atom({
    key: 'minWidth',
    default: 144
})
export const maxWidthTile = atom({
    key: 'maxWidth',
    default: 304
})

export interface SortTypes {
    type:'alphabet' | 'votes' | 'participants' | 'proposals'
}

export const SortMethod = atom({
    key:'sort',
    default:{
        type:'alphabet'
    } as SortTypes
})

export interface DisplayTypes {
    type:'all' | 'my'
}

export const DisplayMethod = atom({
    key:'displayMethod',
    default:{
        type:'all' 
    } as DisplayTypes
})


export const Protocols = atom({
    key:'protocols',
    default:[] as any
}) 

export const ProtocolVotes = atom({
    key:'protocolVotes',
    default:[] as any
}) 

export const FilteredProtocols = selector({
    key:'filteredProtocols',
    get:({get})=>{
        const protocolsList = get(Protocols)
        console.log('protocol list recoil', protocolsList instanceof Array, [JSON.parse(JSON.stringify(protocolsList))] )
        const protocolFlatten = protocolsList instanceof Array  ? [...protocolsList] : [JSON.parse(JSON.stringify(protocolsList))]
        const sortMethod = get(SortMethod) 
        switch(sortMethod.type){
            case 'alphabet':
                break;
            case 'participants':
                protocolFlatten.sort((a:any,b:any)=>b.uniqueVoters-a.uniqueVoters)
                break;
            case 'proposals':
                protocolFlatten.sort((a:any,b:any)=>b.uniqueVoters-a.uniqueVoters)
                break;
            case 'votes':
                protocolFlatten.sort((a:any,b:any)=>b.totalVotes-a.totalVotes)
                break;
        } 
        const displayMethod = get(DisplayMethod)
        if(displayMethod.type === 'all'){
            return protocolFlatten
        } else {
            const myProtocols = localStorage.getItem('myProtocols')
            if(myProtocols){
                const items = JSON.parse(myProtocols)
                console.log('items local', items)
                return []
            }
            return []
        }
    }
})

