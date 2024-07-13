import {Stack, Text, Title} from "@mantine/core";
import {HomeMap} from "../components/maps/home_map";

function Home() {
    return (
        <Stack>
            <Title c="white" mt={10}>Welcome to Demeter AI</Title>
            <Text c="white" mt={10}>50% of Habitable land is used for Agriculture</Text>
            {/*<Filters/>*/}
            <HomeMap/>
        </Stack>
    );
}

export default Home;
