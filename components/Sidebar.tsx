import useSWR from "swr";
import {styled} from 'stitches.config'
import Box from '@/design-system/primitives/Box'
import axios from 'axios'

const StyledContainer  = styled(Box,{
    width: '256px',
    padding:'$2',
    right: '0',
    height: '100vh',
    backgroundColor: 'gray',
    overflowX:'hidden'
})

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Sidebar = () =>{
    const { data, error } = useSWR(`https://api.boardroom.info/v1/stats`, fetcher)

    if(error){
        return(
            <StyledContainer>
                Something went wrong...Try to reload the page
            </StyledContainer>
        )
    }
    return(
        <StyledContainer>
            Total Proposals {data?.data.totalProposals} <br/>
            Total Voters {data?.data.totalUniqueVoters} <br/>
            Total Votes {data?.data.totalVotesCast} <br/>
            Total Protocols {data?.data.totalProtocols} 
        </StyledContainer>
    )
}

export default Sidebar