import {Stack, Text, Title} from "@mantine/core";
import {HomeMap} from "../components/maps/home_map";
import {LaunchDAppButton} from '../components/launchDappButton/launchDappButton';

function Home() {
    return (
      <Stack style={{ minHeight: '100vh' }} align="center" justify="flex-start">
        <Stack align="center" style={{ marginTop: '10px' }}>
          <Title c="white">Welcome to Demeter AI</Title>
          <Text c="white" mt={10}>50% of Habitable land is used for Agriculture</Text>
        </Stack>
        <HomeMap />
        <LaunchDAppButton />
      </Stack>
    );
}

export default Home;