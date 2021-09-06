import { styled } from "stitches.config"
import Box, {BoxMotion} from '@/design-system/primitives/Box'
import useSWR from 'swr'
import axios from "axios"
import Loader from '@/design-system/primitives/Loader'
import {useEffect} from 'react'
import * as dayjs from 'dayjs'
import { ProtocolVotes } from "contexts/cardSettings"
import { useSetRecoilState } from "recoil"
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)

type Props ={
    container:any,
    refId:string;
    background:string;
    choices:string[]
}

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const ProtocolVoters = ({refId, background, choices, container}:Props) =>{
    const { data, error, isValidating } = useSWR(`https://api.boardroom.info/v1/proposals/${refId}/votes`, fetcher)
    const setVotes = useSetRecoilState(ProtocolVotes)
    useEffect(()=>{
        console.log('protocol voters data', data, '&container', container)
        if(data){
            container.performLayout()
            const votesByChoice = choices.map((value:any, index:number) => {
                return data.data.filter((vote:any) => vote.choice === index)
            })
            
            const newVotes= votesByChoice.map((choice, index)=>{
                return ({id:(index+1).toString(), color: `rgb(${index*16}, ${index*16}, ${index*16}, ${index === 0 ? 1 : (1/index).toFixed(1)})`, data:choice.sort((a:any, b:any) => {
                return(a.timestamp - b.timestamp)
                })
                .reduce((acc:any, lastVote:any)=>{
                    const prevPower = acc[acc.length-1] ? acc[acc.length-1].y : 0
                    return acc.concat({"x":dayjs.unix(lastVote.timestamp).format('MM:DD:HH:mm:ss'), "y": prevPower+lastVote.power})
                },[]) })      
            })
            setVotes({choices:choices, votes:newVotes})
        }
    },[data, choices])


    if(error){
        return(<Box>Something went wrong...</Box>)
    }
    if(isValidating){
        return(<Box layout='flexBoxRow' css={{width:'1024px', justifyContent:'center', alignItems:'center'}}><Loader/></Box>)
    }
    return(
        <BoxMotion
        initial={{opacity:0, display:'none', position:'relative', top:'10000px'}}
        animate={{opacity:1, display:'flex', position:'static', top:'0', height:'fit-content'}}
        exit={{opacity:0, display:'none', position:'absolute'}}
        transition={{delay:0, duration:1.5}}
        css={{ display:'flex', height:'fit-content', overflow:'visible', flexWrap:'wrap', flexDirection:'row', color:'inherit', background:background, gap:'$2', width: '1024px',}}>
            {data.data.map((item:any, i:any)=>{
                return(
                    <Box css={{padding:'$2', 
                    boxSizing:'border-box',
                    alignItems:'center',
                    color:'inherit',
                    background:background,
                    mixBlendMode:'multiply',
                    overflow:'hidden',
                    flexWrap:'wrap',
                    justifyContent:'space-between',
                    width:'256px',
                    borderRadius:'$1'}} layout='flexBoxRow' key={item.refId}>
                        <p>{item.address.slice(0,5)}...{item.address.slice(-10, item.address.length)}</p>
                        <p>{choices[item.choice.toString()]}</p>
                        {/* <p>{item.power.toString()}</p> */}
                    </Box>
                )
            })}
       </BoxMotion>
    )
}

export default ProtocolVoters


