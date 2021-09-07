// import { styled } from "stitches.config"
import Box, {BoxMotion} from '@/design-system/primitives/Box'
import useSWR from 'swr'
import axios from "axios"
import Loader from '@/design-system/primitives/Loader'
import {useEffect} from 'react'
import dayjs from 'dayjs'
import { ProtocolVotes } from "contexts/cardSettings"
import { useSetRecoilState } from "recoil"
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(localeData)
dayjs.extend(relativeTime)

type Props ={
    container:any,
    refId:string;
    background:string;
    choices:string[];
    title:string;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const ProtocolVoters = ({refId, background, choices, container,title}:Props) =>{

    const choicesDefinition = choices.map((choice:string, _:number)=>{
        return({
            choice:choice,
            color:`${background}`
        })
    })
    
    const { data, error, isValidating } = useSWR(`https://api.boardroom.info/v1/proposals/${refId}/votes`, fetcher)
    const setVotes = useSetRecoilState(ProtocolVotes)
    useEffect(()=>{
        if(data){
            container.performLayout() //reevaluate the width of Masonry (TODO: move to the recoil context)

            const votesByChoice = choices.map((_:any, index:number) => {
                return data.data.filter((vote:any) => vote.choice === index)
            })  
 

            const topVoters = [...data.data].sort((a:any,b:any)=>b.power - a.power).slice(0,5)
            
            const newVotes= votesByChoice.map((choice, index)=>{
                return ({id:(index+1).toString(), color:choicesDefinition[index].color, data:choice.sort((a:any, b:any) => {
                return(a.timestamp - b.timestamp)
                })
                .reduce((acc:any, lastVote:any)=>{
                    const prevPower = acc[acc.length-1] ? acc[acc.length-1].y : 0
                    return acc.concat({"x":dayjs.unix(lastVote.timestamp).format('MM:DD:HH:mm:ss'), "y": prevPower+lastVote.power})
                },[]) })      
            })
            setVotes({choices:choices, color:background, votes:newVotes, topVoters:topVoters ,title:title})
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
        animate={{opacity:1, display:'grid', position:'static', top:'0', height:'fit-content'}}
        exit={{opacity:0, display:'none', position:'absolute'}}
        transition={{delay:0, duration:1.5}}
        css={{ display:'grid',
        gridAutoRows:'auto',
        gridTemplateColumns: "repeat(4, minmax(0,1fr))",
        height:'fit-content', overflow:'visible', 
         color:'inherit', background:background, gap:'$2', width: '1024px',}}>
            {data.data.map((item:any, i:number)=>{
                return(
                    <Box css={{padding:'$2', 
                    gridColumn:'span 1',
                    display:'flex',
                    flexDirection:'column',
                    gap:'$1',
                    boxSizing:'border-box',
                    color:'inherit',
                    alignItems:'flex-start',
                    background:choicesDefinition[item.choice].color || '$background',
                    mixBlendMode:'multiply',
                    filter:`hue-rotate(${item.choice*45}deg)`,
                    overflow:'hidden',
                    flexWrap:'wrap',
                    justifyContent:'space-between',
                    width:'100%',
                    borderRadius:'$1'}} layout='flexBoxRow' key={item.refId}>
                        <p>{item.address.slice(0,5)}...{item.address.slice(-10, item.address.length)}</p>
                        <Box layout='flexBoxRow' css={{justifyContent:'space-between', width:'100%', alignItems:'center'}}>
                            <Box as='p' css={{background:background, borderRadius:'$1', padding:'0 $1', mixBlendMode:'multiply',}}>{
                            choices[item.choice.toString()]}
                            </Box>
                            <Box as='p' css={{whiteSpace:'nowrap'}}>
                                {dayjs().to(dayjs.unix(item.timestamp))}
                            </Box>
                        </Box>
                        {/* <p>{item.power.toString()}</p> */}
                    </Box>
                )
            })}
       </BoxMotion>
    )
}

export default ProtocolVoters


