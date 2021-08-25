import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from 'stitches.config';
import ArrayEmoji from '@/design-system/primitives/ArrayEmoji' //lazy load it later
import {atom, useRecoilState} from 'recoil'
import  {useEffect} from 'react'
// import { ethers } from "ethers";

//Ceramic dependencies
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { IDX } from '@ceramicstudio/idx'
import { DID } from 'dids';
import KeyDidResolver from 'key-did-resolver';
// import { TileDocument } from '@ceramicnetwork/stream-tile';

//Login to Ceramic Clay Network
const API_URL = 'https://ceramic-clay.3boxlabs.com';
export const ceramic = new CeramicClient(API_URL);

const resolver = {
    ...KeyDidResolver.getResolver(),
    ...ThreeIdResolver.getResolver(ceramic)
};
const did = new DID({ resolver });
ceramic.did = did;
const idx = new IDX({ ceramic })


declare global {
    interface Window {
        ethereum: any;
    }
}

interface User {
    isSigned:boolean;
    address:string | null;
    username:string | null;
    emoji:string | null
}
const user = atom({
    key:'user',
    default:{
        isSigned:false,
        address:null,
        username:null,
        emoji:null
    } as User
})


const StyledTrigger = styled(DropdownMenu.Trigger,{
    background:'transparent',
    borderRadius:'$2',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    border:'1px solid lightgray',
    padding:'$0 $1',
    color:'gray',
    userSelect:'none'
})

const StyledItemEmoji = styled(DropdownMenu.Item, {
    userSelect:'none',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    fontSize:'$2',
    width:'$5',
    height:'$5',
    cursor:'pointer',
    padding:'$2',
    border:'1px solid lightgray',
    borderRadius:'$2',
    backgroundColor:'transparent',
    color:'lightgray',
    '&:hover':{
        border:'1px solid black'
    }
})

const StyledItem = styled(DropdownMenu.Item, {
    userSelect: 'none',
    width:'100%',
    height:'fit-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '$0',
    border: '1px solid lightgray',
    borderRadius: '$2',
    color: 'gray',
    '&:hover': {
        color:'$black',
        border: '1px solid $black'
    }
})

const StyledContent = styled(DropdownMenu.Content,{
    border:'1px solid lightgray',
    borderRadius:'$2',
    background:'$background',
    padding:'$2',
    minWidth:'256px'
})

const StyledArrow = styled(DropdownMenu.Arrow,{
    position:'relative',
    right:'$1',
    fill:'lightgray'
})

const StyledGroup = styled(DropdownMenu.Group,{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    gap:'$1',
})

const StyledGroupButtons = styled(DropdownMenu.Group, {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '$1',
})

const Auth = () => {

    const [currentUser, setUser] =  useRecoilState(user)


    useEffect(()=>{
        Login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const Login = async () => {
        try {
            
            //  Alternative Auth/Metamask connection using ethers 
            // const provider = new ethers.providers.Web3Provider(window.ethereum)
            // const signer = provider.getSigner()

            const addresses = await window.ethereum.enable();
            const authProvider = new EthereumAuthProvider(
                window.ethereum,
                addresses[0]
            );
            const threeIdConnect = new ThreeIdConnect();
            await threeIdConnect.connect(authProvider);
            const provider = await threeIdConnect.getDidProvider();
            if(ceramic.did){
                ceramic.did.setProvider(provider);
                await ceramic.did.authenticate();
            }

            const profile:any = await idx.get('basicProfile')

            setUser({
                isSigned:true,
                address:addresses[0],
                username:profile.name || null,
                emoji:profile.emoji  || null
            })
        } catch (e) {
            console.log('error signing user in', e)
        }
    };


    return(
        <DropdownMenu.Root>
            <StyledTrigger>
                {currentUser.emoji}
                {currentUser.username || currentUser.address || 'Not Authorized'}</StyledTrigger>
            <StyledContent>
                <StyledGroup>
                    {currentUser.isSigned && (
                    <StyledItemEmoji
                    onSelect={async()=>{
                        const selected = ArrayEmoji[Math.floor(Math.random() * ArrayEmoji.length)]
                        try{
                            setUser({
                                isSigned: currentUser.isSigned,
                                address: currentUser.address,
                                username: currentUser.username,
                                emoji: selected
                            })
                            await idx.merge('basicProfile', { emoji:selected })
                        }  catch(e){
                            if(ceramic.did){
                                await ceramic.did.authenticate();
                            }
                            console.log(e)
                        }
                    }}>
                    {currentUser.emoji ||  "Set 😃"}
                    </StyledItemEmoji>)}

                    <StyledGroupButtons>
                        <StyledItem
                        onSelect={Login}
                        >Login</StyledItem>
                        <StyledItem
                            onSelect={Login}
                        >Sign Out</StyledItem>
                    </StyledGroupButtons>
                    
                </StyledGroup>
                <StyledArrow/>
            </StyledContent>
        

        </DropdownMenu.Root>
    )
}

export default Auth