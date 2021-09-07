import Box, { BoxMotion } from "@/design-system/primitives/Box"
import Button from '@/design-system/primitives/Button'
import { ProtocolData}  from  '@/design-system/ProtocolData'
import Markdown from 'markdown-to-jsx';
import {keyframes, styled} from 'stitches.config'
import * as dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)
import * as HoverCard from '@radix-ui/react-hover-card';
import ProtocolVoters from '@/design-system/ProtocolVoters'

const rotateAnimation = keyframes({
    '0%': { transform: 'rotate(0)' },
    '100%': { transform: 'rotate(360deg)' },
});

const StyledCard = styled(BoxMotion,{
    boxSizing: 'border-box',
    width: '1024px',
    display:'flex',
    flexDirection:'column',
    gap:'$4',
    minWidth: '1024px',
    // minHeight:'512px',
    paddingBottom:'$4',
    overflowX: 'visible',
    overflowY:'hidden'
})

type Card ={
    container:any,
    shadow:string,
    background:string,
    border:string,
    i:number,
    item: ProtocolData
}

const ProtocolCardInfo = ({proposer}:{proposer:string}) =>{
    return(
        <HoverCard.Root>
            <HoverCard.Trigger>
                <Box layout='flexBoxRow'
                                    css={{ alignItems: 'center', fontSize: '$6' }}>
                                       <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </Box>
            </HoverCard.Trigger>
            <HoverCard.Content>
                      <HoverCard.Arrow />
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>

                {proposer}
            </HoverCard.Content>
        </HoverCard.Root>
    )
}

const ProtocolCard = ({shadow, container, background, border, item, i}:Card) =>{
    return(
        <>
        <StyledCard
            drag="x"
            dragPropagation
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={()=>console.log('drag end')}
            layout
            initial={{ position: 'absolute', opacity: 0, right: '-200%' }}
            animate={{ position: 'relative', opacity: 1, right: i > 0 ? '-2%' : '0%', zIndex:'1' }}
            exit={{ position: 'absolute', opacity: 1, left: '-200%' }}
            transition={{ duration: 0.5 }}
            >

            <Box 
            css={{
            background: background,  
            overflow:'hidden',
            height:'512px',
            boxSizing:'border-box',position:'relative',borderRadius: '$2', boxShadow: shadow, border: `1px solid ${border}`}}>
                <Box layout='flexBoxRow' css={{
                    boxSizing:'border-box',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: shadow,
                    borderBottom: `0px solid ${border}`, padding: '$1 $2'
                }}>
                    <Box layout='flexBoxRow' css={{gap: '$0', alignItems:'center'}}>
                        <Box css={{transformOrigin: '50% 51%', animation: item.currentState === 'active' ? `${rotateAnimation} 3.2s linear` : 'none',  animationIterationCount: 'infinite'}}>
                            {item.currentState === 'active' && <>✷</>}
                            {item.currentState === 'executed' && <>✔︎</>}
                            {item.currentState === 'closed' && <>✘</>}
                        </Box> 
                        <Box layout='flexBoxRow' css={{gap:'$1', alignItems:'center'}}>
                            <span>{item.currentState.toUpperCase()}</span>
                            <span>{dayjs.unix(item.endTimestamp).format('DD-MM-YYYYZ UTC')}</span>
                        </Box>

                    </Box>
                    <ProtocolCardInfo proposer={item.proposer}/>
                </Box>
{/* 
                <p>START: {dayjs.unix(item.startTimestamp).format('DD-MM-YYYYZ UTC')}</p>
                <p>END: {dayjs.unix(item.endTimestamp).format('DD-MM-YYYYZ UTC')}</p> */}


                <Box layout='flexBoxColumn' css={{ 
                    height:'100%',
                    padding: '$4', boxSizing:'border-box', overflow:'hidden',
                    paddingBottom:'320px',
                    }}>
                    <Box as='h3'>{item.title}</Box>
                    <Box css={{
                        maxHeight:'320px',
                        'p': {
                            fontSize:'calc($p /1.2)',
                            marginBottom: "$1",
                        },
                        'h1':{
                            margin:'$2 0',
                            fontSize:'calc($1 /2)'
                        },
                        'h2':{
                            margin:'$2 0',
                            fontSize:'calc($2 /2)'
                        },
                        'h3':{
                            margin:'$2 0',
                            fontSize:'calc($3 /2)'
                        },
                        'h4':{
                            margin:'$2 0',
                            fontSize:'calc($4 /2)'
                        },
                        // 'h3,h4,h5':{
                        //     margin:'$2 0',
                        //     fontSize:'$5'
                        // },
                        'ul, ol':{
                            padding:'0 $0',
                        },
                        'li':{
                              fontSize:'calc($p /1.2)',
                        },
                        'img':{
                            display:'block',
                            borderRadius:'$1',
                            boxSizing:'border-box',
                            clear:'both',
                            margin:'$1 $1 $1 0',
                            maxWidth:'512px'
                        },
                        padding: '$2 0', maxWidth: '960px',
                    }}>
                        <Markdown>{item.content}</Markdown>
                    </Box>
                </Box>

                <Box layout='flexBoxRow' css={{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    bottom: '0',
                    overflow:'hidden',
                    justifyContent: 'space-between',
                    alignItems:'flex-end',
                    gap: '$2',
                    width: '100%',
                    padding: '$2',
                    background:background,
                    backdropFilter:' opacity(0.1)',
                    mixBlendMode:'multiply',
                    
                }}>
                   {/* <Box as='hr' css={{background:border}} /> */}

                    <Box layout='flexBoxColumn' css={{gap:'$1'}}>
                        <p style={{opacity:0.5}}>Voting options</p>
                        <Box layout='flexBoxRow' css={{ gap: '$1', height:'100%', flexWrap:'wrap' }}>
                            {item.results.map((option: any) => {
                                return (
                                    <Box
                                        css={{
                                            cursor:'pointer',
                                            gap: '$0',
                                            alignItems: 'center',
                                            boxSizing:'border-box',
                                            color:border,
                                            height:'32px',
                                            padding: '$0 $2', borderRadius: '$2', border: `1px solid ${border}`,
                                            '&:hover':{
                                                boxShadow: shadow,
                                                background:border,
                                                color:background
                                            }
                                        }}
                                        layout='flexBoxRow'
                                        key={option.choice}>
                                        {/* <b>{option.total}</b> */}
                                        {item.choices[option.choice]}</Box>
                                )
                            })}
                        </Box>
                    </Box>

                    <Button
                        look='outlined'
                        css={{
                            color: 'inherit',
                            alignItems: 'center',
                            gap: '$1',
                            height:'32px',
                            padding: '$1', borderRadius: '$2', border: `1px solid ${border}`
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </Button>

                </Box>

            </Box>  
            
            <Box css={{background:background}} >
                <Box layout='flexBoxRow' css={{
                    marginTop:'$5',
                    padding:'$2',
                    background:background,
                    mixBlendMode:'multiply',
                    color:border,
                    borderRadius:'$2',
                    justifyContent:'space-between',
                    alignItems:'center',
                }}>
                    <Box layout='flexBoxRow' css={{alignItems:'center', gap:'$2', flexWrap:'wrap'}}>
                    <b>Boardroom votes</b>
                    {item.results.map((option: any, i:number) => {
                        return(<Box 
                                layout='flexBoxRow'
                                css={{alignItems:'center'}}
                                key={option.choice+'total'}>
                                <Box 
                                css={{
                                    cursor:'pointer',
                                    padding:'$1',
                                    borderRadius:'$1',
                                    background:background,
                                    mixBlendMode:'multiply',
                                    filter:`hue-rotate(${i*45}deg)`,
                                    '&:hover':{
                                         filter:`hue-rotate(${i*45}deg) brightness(0.95)`,
                                    }
                                }}
                                >{item.choices[option.choice]}</Box>
                                <span>{option.total}</span>
                                </Box>)
                    })}
                    </Box>
                    {/* <Box layout='flexBoxRow' css={{alignItems:'center'}}>
                        <Button css={{borderColor:border, color:border}} look='outlined'>
                            Sort by
                        </Button>
                    </Box> */}
                </Box>
               
            </Box>

            <ProtocolVoters background={background}
            container={container}
            title={item.title}
            choices={item.choices}
            refId={item.refId}></ProtocolVoters>


        </StyledCard>



        </>
    )
}

export default ProtocolCard



