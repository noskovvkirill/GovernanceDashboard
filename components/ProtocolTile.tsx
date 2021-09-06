/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { styled, keyframes} from 'stitches.config'
import Box from '@/design-system/primitives/Box'
import {BoxMotion} from '@/design-system/primitives/Box'
import {  motion } from 'framer-motion'
import ProtocolData from '@/design-system/ProtocolData'
import * as HoverCard from '@radix-ui/react-hover-card';

export type Protocol = {
    container:any,
    minWidth:number,
    maxWidth:number,
    name: string,
    cname?: string,
    totalProposals: number;
    totalVotes: number;
    uniqueVoters: number;
    icons:Icon[];
    selected:boolean;
    onClick:()=>void;
}


type Icon = {
    size: string,
    url: string
}

const StyledProtocolContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    boxSizing:'border-box',
    gap: '$1',
    lineHeight:'100%',
    borderRadius: '$1',
    overflow: 'hidden',
    // pointerEvents:'none',
    transition:'$all',
    fontWeight:'300',
    //enable transition animation
    variants:{
        selected:{
            true:{
                transition: "all 0.8s ease-in-out",
                padding:'$4'
            },
            false:{
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '$1',
                transition:'all 0.05s ease-in-out',
                '&:hover': {
                    fontWeight:'400',
                    transform: 'scale(1.009) translateY(-2px)',
                    color: 'green',
                    border: '1px solid green'
                },
            },
        },
    },
    defaultVariants:{
        selected:false
    }
})


const StyledProtocolBg = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    borderRadius: '$1',
    overflow: 'hidden',
    pointerEvents:'painted',
    transition: '$all',
    variants: {
        selected: {
            true: {
                transition: "all 0.8s ease-in-out",
            },
            false: {
                justifyContent: 'space-between',
                transition: 'none',
                '&:hover': {
                    transform: 'scale(1.005)',
                    animationFillMode: 'forwards',
                    backgroundColor: 'lightgreen',
                },
            },
        },
    },
    defaultVariants: {
        selected: false
    }
})


const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});


const StyledHoverCard = styled(HoverCard.Content,{
        backgroundColor: 'lightgreen',
        color:'green',
        border:'1px solid green',
        padding:'$0 $4',
        borderRadius:'$2',
        fill:'green',
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
            '&[data-side="top"]': { animationName: slideUpAndFade },
            '&[data-side="right"]': { animationName: slideRightAndFade },
            '&[data-side="bottom"]': { animationName: slideDownAndFade },
            '&[data-side="left"]': { animationName: slideLeftAndFade },
        },
})
 

const StyledProtocolInfo = styled('ul',{
    padding: '0',
    margin: '0',
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    flexWrap:'wrap',
    gap: '$0',
    fontWeight:'inherit'
})

const StyledProtocolInfoItem = styled('li',{
    // pointerEvents:'none',
    padding:'$0',
    display:'flex',
    alignItems:'center',
    fontSize:'$6',
    gap:'$0',
    borderRadius:'$1',
    fontWeight:'inherit'
})

const StyledHeader = styled(Box, {
    fontWeight:'inherit',
    height: '100%', 
    width:'100%',
    display:'flex',
    justifyContent: 'space-between',
    variants:{
        selected:{
            true:{
                boxSizing:'border-box',
                flexDirection:'row',
                padding:'0 $3',
            },
            false:{
                alignItems:'flex-start',
                flexDirection: 'column'
            },
        },
    },
    defaultVariants:{
        selected:'false'
    }
})

const StyledTitle = styled('p',{
    transformOrigin:'center',
    wordWrap:'break-word',
    wordBreak:'break-all',
    textTransform:'uppercase',
    fontWeight:'inherit',
    variants:{
        selected:{
            true:{
                fontSize: '$1',
            },
            false:{
                fontSize: '$5',
            }
        }
    },
    defaultVariant:{
        selected:false
    }
})

//  mapping function
// const scale = (number:number, inMin:number, inMax:number, outMin:number, outMax:number) => {
//     return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
// }
const clamp = (x:number, m:number, M:number) => Math.min(M, Math.max(x, m));
const charToColor = (text:string) => {
    const numbers = text.split('').map(char=>{
        return(char.charCodeAt(0) - 64)
    })
    const sum = numbers.reduce((acc,value)=>acc+value)
    return clamp(sum, 0, 960)
}


const ProtocolTile = ({ container,  cname, minWidth, maxWidth, name, onClick, totalProposals, icons, totalVotes, uniqueVoters, selected}:Protocol) =>{

    const widthC = `${clamp(totalProposals *Math.round(maxWidth/minWidth), minWidth, maxWidth)}px`
    const heightC = `${clamp(totalProposals  * Math.round(maxWidth / minWidth), minWidth, maxWidth)}px`
    const color = `hsl(${charToColor(name)}, 75%, 42%)`
    const border = `hsl(${charToColor(name)}, 75%, 63%)`
    const shadow = `0 3px 10px 0.09em hsla(${charToColor(name)}, 75%, 47%, 20%)`
    const background = `hsl(${charToColor(name)}, 67%, 96%)`

    return(
        <BoxMotion
            initial={false}
            animate={{  opacity: 1 }}
            exit={{ opacity: 0, display:'none' }}
            transition={{duration:0.2}}
            css={{  
                    overflow:'visible',
                    padding:!selected ? '8px' : '8px 0',
                    position: 'relative',
                    width: !selected ? widthC : '100%',
                    height: !selected ? heightC : 'fit-content',
        }}
        >
            {/* <HoverCard.Root> */}
            <Box css={{overflow:'visible',  height:'100%'}}>
                <StyledProtocolContainer
                    onClick={(e)=>{
                        e.preventDefault()
                        if(!selected){onClick()}
                    }}
                    selected={selected}
                    css={{
                        position:'relative',
                        overflow:'hidden',
                        width:'100%',
                        height:'100%',
                        fontWeight:'300',
                        // transition:'none',
                        boxSizing:'border-box',
                        color: color,
                        border: !selected ? `1px solid ${border}` : '0px',
                        fontSize:`clamp(1rem, ${totalProposals/100}vw, 4rem)`,
                        '&:hover':{
                            boxShadow: !selected ? shadow : ``
                        }
                    }}>
                    

                    <BoxMotion
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{duration:0.35}}
                        layoutId={String(name + 'bg-transition')}
                        css={{
                                overflow:'visible',
                                originX: 0.5,
                                originY: 0.5,
                                pointerEvents: 'all',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                zIndex: 0,
                        }}
                    >
                        <StyledProtocolBg
                        selected={selected}
                        css={{
                            overflow:'visible',
                            backgroundColor: background,
                            width: '100%',
                            height: '100%',
                            }}>
                        </StyledProtocolBg>
                    </BoxMotion>


                    

                    <StyledHeader selected={selected}>
                        <Box layout='flexBoxRow' css={{
                            fontWeight:'inherit',
                            alignItems:!selected ? 'flex-start' : 'center',
                            pointerEvents:'none', 
                            zIndex:1}}>
                            { icons 
                            && (<motion.img
                                initial={false}
                                animate={{ opacity: 1 }}
                                exit={{opacity:0}}
                                style={{
                                    position:'relative',
                                    top:!selected ? '2px' : '0',
                                    width: !selected ?  `${minWidth >= 144 ? 24 : 0 }px` : '48px',
                                    height: !selected ? `${minWidth >= 144 ? 24 : 0}px` : '48px',
                                    borderRadius: '30px', boxShadow: `0 0 0 0.07em #000000, 0 0 0 0.13em #FFFFFF, 0 1px 5px 0.07em hsl(${charToColor(name)}, 75%, 47%) `}}
                                alt={name+'icon'}
                                src={icons[0].url} />)}
                
                        
                                <StyledTitle
                                selected={selected}
                                >{name}
                                </StyledTitle>

                        </Box>
                        
                    
                            <StyledProtocolInfo as="ul" css={{pointerEvents:'none', zIndex:1}}>
                                <StyledProtocolInfoItem as="li">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    {totalProposals}  {selected && (<>Proposals</>)}
                                </StyledProtocolInfoItem>
                                <StyledProtocolInfoItem as="li">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.97942 1.25171L6.9585 1.30199L5.58662 4.60039C5.54342 4.70426 5.44573 4.77523 5.3336 4.78422L1.7727 5.0697L1.71841 5.07405L1.38687 5.10063L1.08608 5.12475C0.820085 5.14607 0.712228 5.47802 0.914889 5.65162L1.14406 5.84793L1.39666 6.06431L1.43802 6.09974L4.15105 8.42374C4.23648 8.49692 4.2738 8.61176 4.24769 8.72118L3.41882 12.196L3.40618 12.249L3.32901 12.5725L3.25899 12.866C3.19708 13.1256 3.47945 13.3308 3.70718 13.1917L3.9647 13.0344L4.24854 12.861L4.29502 12.8326L7.34365 10.9705C7.43965 10.9119 7.5604 10.9119 7.6564 10.9705L10.705 12.8326L10.7515 12.861L11.0354 13.0344L11.2929 13.1917C11.5206 13.3308 11.803 13.1256 11.7411 12.866L11.671 12.5725L11.5939 12.249L11.5812 12.196L10.7524 8.72118C10.7263 8.61176 10.7636 8.49692 10.849 8.42374L13.562 6.09974L13.6034 6.06431L13.856 5.84793L14.0852 5.65162C14.2878 5.47802 14.18 5.14607 13.914 5.12475L13.6132 5.10063L13.2816 5.07405L13.2274 5.0697L9.66645 4.78422C9.55432 4.77523 9.45663 4.70426 9.41343 4.60039L8.04155 1.30199L8.02064 1.25171L7.89291 0.944609L7.77702 0.665992C7.67454 0.419604 7.32551 0.419604 7.22303 0.665992L7.10715 0.944609L6.97942 1.25171ZM7.50003 2.60397L6.50994 4.98442C6.32273 5.43453 5.89944 5.74207 5.41351 5.78103L2.84361 5.98705L4.8016 7.66428C5.17183 7.98142 5.33351 8.47903 5.2204 8.95321L4.62221 11.461L6.8224 10.1171C7.23842 9.86302 7.76164 9.86302 8.17766 10.1171L10.3778 11.461L9.77965 8.95321C9.66654 8.47903 9.82822 7.98142 10.1984 7.66428L12.1564 5.98705L9.58654 5.78103C9.10061 5.74207 8.67732 5.43453 8.49011 4.98442L7.50003 2.60397Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>                                    {totalVotes} {selected && (<>Votes</>)}
                                </StyledProtocolInfoItem>
                                <StyledProtocolInfoItem as="li">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    {uniqueVoters} {selected && (<>Participants</>)}
                                </StyledProtocolInfoItem>
                            </StyledProtocolInfo>
            
                    </StyledHeader>

                        {selected && (
                        <BoxMotion
                            css={{
                                display:'flex',
                                flexDirection:'column',
                                zIndex:1,
                                originX: 0.5,
                                originY: 0.5,
                                textTransform:'unset',
                                width:'fit-content',
                                overflow:'visible',
                                gap:'16px',
                                paddingTop:'16px'
                            }}
                            initial={{opacity:'0'}}
                            animate={{opacity:'1'}}
                            exit={{opacity:'0', position:'absolute'}}
                            transition={{delay:0.35, duration:0.5}}
                            >
                                <ProtocolData 
                                container={container}
                                background={background}
                                border={border}
                                shadow={shadow}
                                name={cname}/>

                            </BoxMotion>

                        )}
                    </StyledProtocolContainer>
                 </Box>
                 {/* {!selected && (
                     <StyledHoverCard side='top' sideOffset={4}>
                       <HoverCard.Arrow />
                        Hey
                    </StyledHoverCard>
                 )}
                 
                </HoverCard.Root> */}

            </BoxMotion>

   
    )
}

export default ProtocolTile