import useSWR from "swr";
import {styled} from 'stitches.config'
import Box, {BoxMotion} from '@/design-system/primitives/Box'
import Button from '@/design-system/primitives/Button'

import axios from 'axios'
import {FilteredProtocols, ProtocolVotes} from 'contexts/cardSettings'
import { useRecoilValue } from "recoil";
import { useState, useRef } from "react";
import { Resizable } from "re-resizable";
import {  Line } from '@nivo/line'


const StyledContainer  = styled(BoxMotion,{
    width:'100%',
    padding:'$2',
    boxSizing:'border-box',
    right: '0',
    height: '100vh',
    fontSize:'$6',
    backgroundColor: 'rgba(0,0,0,0)',
    overflowX:'hidden',
    fontFamily:'$data',
    fontWeight:'500',
    'p,div,span':{
        fontSize:'$6',
        fontFamily:'$data',
        fontWeight:'350',
    },
    'h5':{
        fontFamily:'$data',
        fontWeight:'350',
        fontSize:'$p',
        marginBottom:'$1',
        textTransform:'uppercase'
    },
    variants:{
        state:{
            default:{
                borderLeft:'1px solid lightgray',
            },
            active:{
                borderLeft:'2px solid lightgreen',
            }
        }
    },
    defaultVariants:{
        state:'default'
    }
})




const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Sidebar = () =>{
    const { data, error } = useSWR(`https://api.boardroom.info/v1/stats`, fetcher)
    const protocols = useRecoilValue(FilteredProtocols)
    const votes = useRecoilValue(ProtocolVotes)
    const [isOpen, setIsOpen] = useState(true)
    const target = useRef(null)
    const [size, setSize] = useState(320)
    const [containerStyle, setContainerStyle] = useState<'default' | 'active'>('default')

    if(error){
        return(
            <StyledContainer>
                Something went wrong...Try to reload the page
            </StyledContainer>
        )
    }

    if(isOpen && protocols.length <= 1) {
    return(
        <Resizable 
        minHeight={'100vh'}
        minWidth={320}
        maxWidth={640}
        onResize={()=>setContainerStyle('active')}
        onResizeStop={(e, direction, ref, d) => {
                setContainerStyle('default')
                setSize(size+d.width)
        }}
        size={{ width: size , height:'auto'}}>
            <StyledContainer
            ref={target}
            state={containerStyle}
            css={{resize:'horizontal'}}
            initial={{position:'relative', left:'100%'}}
            animate={{position:'relative', left:'0'}}
            >   
                <Button
                onClick={()=>setIsOpen(!isOpen)}
                look='outlined'
                color='gray'
                css={{padding:'$0', marginTop:'$0'}}
                ><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></Button>
                <Box css={{padding:'$2 0'}}>
                    <h5>Stats:</h5> 
                        <Box layout='flexBoxRow' css={{
                            '&:hover':{
                                backgroundColor:'yellow'
                            },
                            justifyContent:'space-between'}}>
                            <p>Votes</p>
                            <p>{protocols[0]?.totalVotes}</p>
                        </Box>    
                        <Box layout='flexBoxRow' css={{
                            '&:hover':{
                                backgroundColor:'yellow'
                            },
                            justifyContent:'space-between'}}>
                            <p>Unique Voters</p>
                            <p>{protocols[0]?.uniqueVoters}</p>
                        </Box>   
                        <Box layout='flexBoxRow' css={{
                            '&:hover':{
                                backgroundColor:'yellow'
                            },
                            justifyContent:'space-between'}}>
                            <p>Proposals</p>
                            <p>{protocols[0]?.totalProposals}</p>
                        </Box>   
                </Box>

                <Box css={{border:'1px solid lightgray', borderRadius:'$2', padding:'$1', boxSizing:'border-box', marginTop:'$2'}}>
                   {votes?.votes?.length>0 && (
                        <Line
                            data={votes.votes}
                            width={size}
                            height={size-24}
                            margin={{ top: 32, right: 56, bottom: 32, left: 56 }}
                            // curve={'natural'}
                        xScale={{
                                type: 'time',
                                format: '%m:%d:%H:%M:%S',
                                precision: 'second',
                            }}
                            xFormat="time:%m:%d:%H:%M:%S"
                            yScale={{
                                type: 'linear',
                                stacked:false
                            }}
                        axisLeft={{
                            legend: 'votes',
                            legendOffset: 6,
                        }}
                         colors={(options)=>{
                            //  console.log(options.color)
                             return options.color
                         }}
                        yFormat=" >-.0f"
                        theme={{textColor:'#000000'}}
                        axisBottom={{
                            format: '%m:%d:%H:%M',
                            legend: 'time',
                            tickRotation:-90,
                            legendOffset: -6,
                        }}
                        lineWidth={1}
                        enablePointLabel={false}
                        pointSize={4}
                        pointBorderWidth={1}
                        pointBorderColor={{
                            from: 'color',
                        }}
                        useMesh={true}
                        enableSlices={false}
                        axisTop={null}/>
                   )}
                </Box>
            
            </StyledContainer>
        </Resizable>
        )}
   
    if(isOpen && protocols.length>1){
    return(
        <Resizable 
        minHeight={'100vh'}
        minWidth={320}
        maxWidth={640}
        onResize={()=>setContainerStyle('active')}
        onResizeStop={(e, direction, ref, d) => {
                setContainerStyle('default')
                setSize(size+d.width)
        }}
        size={{ width: size , height:'auto'}}>
            <StyledContainer
            ref={target}
            state={containerStyle}
            css={{resize:'horizontal'}}
            initial={{position:'relative', left:'100%'}}
            animate={{position:'relative', left:'0'}}
            >   
        
                <Button
                onClick={()=>setIsOpen(!isOpen)}
                look='outlined'
                color='gray'
                css={{padding:'$0', marginTop:'$0'}}
                ><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></Button>
        
                <Box css={{borderBottom:'1px solid rgba(0,0,0,0.3)', padding:'$2 0'}}>
                    <Box as='h5' css={{display:'flex', cursor:'pointer', gap:'$1', alignItems:'center'}}> Global Stats</Box>
                    <Box layout='flexBoxRow' css={{
                            '&:hover':{
                                backgroundColor:'yellow'
                            },
                            justifyContent:'space-between'}}>
                    <p>Total Proposals</p>
                    <Box layout='flexBoxRow' css={{gap:'$0'}} as='p'>{data?.data.totalProposals}
                        <svg style={{color:'rgba(0,0,0,0.39)'}}  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </Box>
                    </Box>
                    <Box layout='flexBoxRow' css={{
                            '&:hover':{
                                backgroundColor:'yellow'
                            },
                            justifyContent:'space-between'}}>
                    <p>Total Voters</p>
                    <Box as='p'layout='flexBoxRow' css={{gap:'$0'}}>
                        {data?.data.totalUniqueVoters}
                        <svg style={{color:'rgba(0,0,0,0.39)'}} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </Box>
                    </Box>
                    <Box layout='flexBoxRow' css={{
                            '&:hover':{
                                backgroundColor:'yellow'
                            },
                            justifyContent:'space-between'}}>
                    <p>Total Votes</p><Box as='p' layout='flexBoxRow' css={{gap:'$0'}}>
                        {data?.data.totalVotesCast}
                        <svg style={{color:'rgba(0,0,0,0.39)'}} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.97942 1.25171L6.9585 1.30199L5.58662 4.60039C5.54342 4.70426 5.44573 4.77523 5.3336 4.78422L1.7727 5.0697L1.71841 5.07405L1.38687 5.10063L1.08608 5.12475C0.820085 5.14607 0.712228 5.47802 0.914889 5.65162L1.14406 5.84793L1.39666 6.06431L1.43802 6.09974L4.15105 8.42374C4.23648 8.49692 4.2738 8.61176 4.24769 8.72118L3.41882 12.196L3.40618 12.249L3.32901 12.5725L3.25899 12.866C3.19708 13.1256 3.47945 13.3308 3.70718 13.1917L3.9647 13.0344L4.24854 12.861L4.29502 12.8326L7.34365 10.9705C7.43965 10.9119 7.5604 10.9119 7.6564 10.9705L10.705 12.8326L10.7515 12.861L11.0354 13.0344L11.2929 13.1917C11.5206 13.3308 11.803 13.1256 11.7411 12.866L11.671 12.5725L11.5939 12.249L11.5812 12.196L10.7524 8.72118C10.7263 8.61176 10.7636 8.49692 10.849 8.42374L13.562 6.09974L13.6034 6.06431L13.856 5.84793L14.0852 5.65162C14.2878 5.47802 14.18 5.14607 13.914 5.12475L13.6132 5.10063L13.2816 5.07405L13.2274 5.0697L9.66645 4.78422C9.55432 4.77523 9.45663 4.70426 9.41343 4.60039L8.04155 1.30199L8.02064 1.25171L7.89291 0.944609L7.77702 0.665992C7.67454 0.419604 7.32551 0.419604 7.22303 0.665992L7.10715 0.944609L6.97942 1.25171ZM7.50003 2.60397L6.50994 4.98442C6.32273 5.43453 5.89944 5.74207 5.41351 5.78103L2.84361 5.98705L4.8016 7.66428C5.17183 7.98142 5.33351 8.47903 5.2204 8.95321L4.62221 11.461L6.8224 10.1171C7.23842 9.86302 7.76164 9.86302 8.17766 10.1171L10.3778 11.461L9.77965 8.95321C9.66654 8.47903 9.82822 7.98142 10.1984 7.66428L12.1564 5.98705L9.58654 5.78103C9.10061 5.74207 8.67732 5.43453 8.49011 4.98442L7.50003 2.60397Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </Box>
                    </Box>
                    <Box layout='flexBoxRow' css={{
                            '&:hover':{
                                backgroundColor:'yellow'
                            },
                            justifyContent:'space-between'}}>
                        <p>Total Protocols</p>
                        <Box as='p' layout='flexBoxRow' css={{gap:'$0'}}>
                        {data?.data.totalProtocols}
                        <svg style={{color:'rgba(0,0,0,0.39)'}} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Box>
                    </Box>
                </Box>

                <Box css={{borderBottom:'1px solid rgba(0,0,0,0.3)', padding:'$2 0'}}>
                    <h5>Top 10 by Votes</h5> 
                    {[...protocols].sort((a:any,b:any)=>b.totalVotes-a.totalVotes).slice(0,10).map((i:any)=>(
                    <Box layout='flexBoxRow' css={{
                        '&:hover':{
                            backgroundColor:'yellow'
                        },
                        justifyContent:'space-between'}} key={i.name+'stats'+'votes'}>
                        <p>{i.name}</p>
                        <p>{i.totalVotes}</p>
                    </Box>
                    ))}
                </Box>
                    
                <Box css={{borderBottom:'1px solid rgba(0,0,0,0.3)', padding:'$2 0'}}>
                    <h5>Top 10 by token price: </h5>
                    {[...protocols].sort((a:any,b:any)=>{
                        if(a.tokens && b.tokens){
                        return b.tokens[0].marketPrices[0].price-a.tokens[0].marketPrices[0].price
                        } else return b-a
                    }).slice(0,10).map((i:any)=>(
                        <Box 
                        layout='flexBoxRow' css={{ '&:hover':{
                            backgroundColor:'yellow'
                        },justifyContent:'space-between'}}
                        key={i.name+'stats'+'tokens'}>
                        <p>{i.name}</p>
                        <p>{i.tokens && i.tokens[0].marketPrices[0].price}
                        &nbsp;
                        {i.tokens && i.tokens[0].marketPrices[0].currency.toUpperCase()}</p>
                        </Box>
                    ))}
                </Box>

                <Box css={{borderBottom:'1px solid rgba(0,0,0,0.3)', padding:'$2 0'}}>
                    <h5>Top 10 by Participants: </h5>
                    {[...protocols].sort((a:any,b:any)=>b.uniqueVoters-a.uniqueVoters).slice(0,10).map((i:any)=>
                    (<Box layout='flexBoxRow' css={{ '&:hover':{
                            backgroundColor:'yellow'
                        },justifyContent:'space-between'}} key={i.name+'participants'}>
                        <p>{i.name}</p>
                        <p>{i.uniqueVoters}</p>
                    </Box>))}
                </Box>
                
                <Box css={{borderBottom:'1px solid rgba(0,0,0,0.3)', padding:'$2 0'}}>
                    <h5>Top 10 by Proposals:</h5> 
                    {[...protocols].sort((a:any,b:any)=>b.totalProposals-a.totalProposals).slice(0,10).map((i:any)=>(
                    <Box layout='flexBoxRow' css={{ '&:hover':{
                            backgroundColor:'yellow'
                        },justifyContent:'space-between'}} key={i.name+'stats'+'proposals'}>
                        <p>{i.name}</p>
                        <p>{i.totalProposals}</p>
                    </Box>
                ))}
                </Box>
            </StyledContainer>
        </Resizable>
    )}
    
    return(
        <Box css={{padding:'$2 $1 0 0',
        overflow:'visible',
        width:'auto',
        position:'relative', top:'0', right:'0'}}>
            <Button
            css={{position:'relative',padding:'$0', marginTop:'$0'}}
            onClick={()=>setIsOpen(!isOpen)}
            look='outlined'
            color='gray'
            ><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></Button>
        </Box>
    )
    
}

export default Sidebar