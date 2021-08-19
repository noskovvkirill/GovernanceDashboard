import type { GetServerSideProps } from 'next'
import Layout from '@/design-system/Layout'
import Box from '@/design-system/primitives/Box'
import useSWR from 'swr'
import ProtocolTile, {Protocol} from '@/design-system/ProtocolTile'
import Masonry from 'react-masonry-component';

const fetcher = (url:string) => fetch(url).then(res => res.json())

export const getServerSideProps: GetServerSideProps = async () => {
  const initialData = await fetcher('https://api.boardroom.info/v1/protocols?limit=20')
  return { props: { initialData } }
};

interface Props {
  initialData: Protocol[]
}




const Home = ({initialData}:Props) => {
  const { data, error } = useSWR('https://api.boardroom.info/v1/protocols', fetcher, { initialData: initialData })

  if(error){
    return(<Box>Service is currently not available</Box>)
  }




  return (
    <Layout>
      <Box layout='flexBoxColumn' css={{width:'100%'}} >
        <Box layout='flexBoxRow' css={{flexWrap:'wrap'}}>

          <Masonry
          style={{  display:'flex', gap:'8px', width:'100%', height:'100%'}}
          >
            {data.data.map((item: Protocol) => {
              return (
                <Box key={item.name}  css={{padding:'$1'}}>
                  <ProtocolTile
                    icons={item.icons}
                    name={item.name}
                    totalProposals={item.totalProposals}
                    totalVotes={item.totalVotes}
                    uniqueVoters={item.uniqueVoters}
                   />
                </Box>
              ); })}
          </Masonry>

        </Box>
      </Box>
    </Layout>
  )
}

export default Home
