/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { styled, fontWeightAnimation} from 'stitches.config'
import Box from '@/design-system/primitives/Box'
import {  motion } from 'framer-motion'
// import { RefObject } from 'react'

export type Protocol = {
    name: string,
    cname?: string,
    totalProposals: number;
    totalVotes: number;
    uniqueVoters: number;
    icons:Icon[];
    selected:boolean;
    onClick:()=>void;
    // ref:RefObject;
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
    wordWrap:'break-word',
    wordBreak:'break-all',
    textTransform:'uppercase',
    transition:'$all',
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
                transition:'none',
                '&:hover': {
                    transform: 'scale(1.005)',
                    animation: `${fontWeightAnimation} 2s`,
                    animationFillMode: 'forwards',
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
 


const StyledProtocolInfo = styled('ul',{
    padding: '0',
    margin: '0',
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    flexWrap:'wrap',
    gap: '$0',
})

const StyledProtocolInfoItem = styled('li',{
    pointerEvents:'none',
    padding:'$0',
    display:'flex',
    alignItems:'center',
    fontSize:'$6',
    gap:'$0',
    borderRadius:'$1',
})

const StyledTitle = styled('p',{
    transformOrigin:'center',
    variants:{
        selected:{
            true:{
                fontSize: '$1',
            },
            false:{
                fontSize: '$p',
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



const ProtocolTile = ({ name, onClick, totalProposals, icons, totalVotes, uniqueVoters, selected}:Protocol) =>{
    return(
        <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                    padding:'8px',
                    position: 'relative',
                    width: !selected ? `${clamp(totalProposals * 2, 144, 768)}px` : '100%',
                    height: !selected ? `${clamp(totalProposals * 2, 144, 768)}px` : 'fit-content',
        }}
        >
            <StyledProtocolContainer
                onClick={onClick}
                selected={selected}
                css={{
                    position:'relative',
                    overflow:'hidden',
                    width:'100%',
                    height:'100%',
                    transition:'none',
                    boxSizing:'border-box',
                    color: `hsl(${charToColor(name)}, 75%, 47%)`,
                    border: !selected ? `1px solid hsl(${charToColor(name)}, 75%, 63%)` : '0px',
                    fontSize:`clamp(1rem, ${totalProposals/100}vw, 4rem)`,
                    '&:hover':{
                        boxShadow: !selected ? `0 3px 10px 0.09em hsla(${charToColor(name)}, 75%, 47%, 20%)` : ``
                    }
                }}>
                
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layoutId={String(name + 'bg')}
                    style={{
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
                        backgroundColor: `hsl(${charToColor(name)}, 67%, 96%)`,
                        width: '100%',
                        height: '100%',
                        }}></StyledProtocolBg>
                </motion.div>


                

                <Box layout='flexBoxRow' css={{alignItems:'center',pointerEvents:'none', zIndex:1}}>
                    { icons 
                    && (<motion.img
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{opacity:0}}
                        style={{
                            width: !selected ?  '24px' : '48px',
                            height: !selected ? '24px' : '48px',
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
                            {totalProposals}
                        </StyledProtocolInfoItem>
                        <StyledProtocolInfoItem as="li">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path></svg>
                            {totalVotes}
                        </StyledProtocolInfoItem>
                        <StyledProtocolInfoItem as="li">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            {uniqueVoters}
                        </StyledProtocolInfoItem>
                    </StyledProtocolInfo>
         

                    {selected && (
                        <motion.p
                        style={{
                            zIndex:1,
                            originX: 0.5,
                            originY: 0.5,
                        }}
                        initial={{opacity:'0'}}
                        animate={{opacity:'1'}}
                        transition={{delay:0.2, duration:0.5}}
                        >
                            Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.

                            Waarom gebruiken we het?
                            Het is al geruime tijd een bekend gegeven dat een lezer, tijdens het bekijken van de layout van een pagina, afgeleid wordt door de tekstuele inhoud. Het belangrijke punt van het gebruik van Lorem Ipsum is dat het uit een min of meer normale verdeling van letters bestaat, in tegenstelling tot "Hier uw tekst, hier uw tekst" wat het tot min of meer leesbaar nederlands maakt. Veel desktop publishing pakketten en web pagina editors gebruiken tegenwoordig Lorem Ipsum als hun standaard model tekst, en een zoekopdracht naar "lorem ipsum" ontsluit veel websites die nog in aanbouw zijn. Verscheidene versies hebben zich ontwikkeld in de loop van de jaren, soms per ongeluk soms expres (ingevoegde humor en dergelijke).


                            Waar komt het vandaan?
                            In tegenstelling tot wat algemeen aangenomen wordt is Lorem Ipsum niet zomaar willekeurige tekst. het heeft zijn wortels in een stuk klassieke latijnse literatuur uit 45 v.Chr. en is dus meer dan 2000 jaar oud. Richard McClintock, een professor latijn aan de Hampden-Sydney College in Virginia, heeft één van de meer obscure latijnse woorden, consectetur, uit een Lorem Ipsum passage opgezocht, en heeft tijdens het zoeken naar het woord in de klassieke literatuur de onverdachte bron ontdekt. Lorem Ipsum komt uit de secties 1.10.32 en 1.10.33 van "de Finibus Bonorum et Malorum" (De uitersten van goed en kwaad) door Cicero, geschreven in 45 v.Chr. Dit boek is een verhandeling over de theorie der ethiek, erg populair tijdens de renaissance. De eerste regel van Lorem Ipsum, "Lorem ipsum dolor sit amet..", komt uit een zin in sectie 1.10.32.

                            Het standaard stuk van Lorum Ipsum wat sinds de 16e eeuw wordt gebruikt is hieronder, voor wie er interesse in heeft, weergegeven. Secties 1.10.32 en 1.10.33 van "de Finibus Bonorum et Malorum" door Cicero zijn ook weergegeven in hun exacte originele vorm, vergezeld van engelse versies van de 1914 vertaling door H. Rackham.

                        </motion.p>

                    )}
            </StyledProtocolContainer>
            </motion.div>

        //  </motion.div>
    )
}

export default ProtocolTile