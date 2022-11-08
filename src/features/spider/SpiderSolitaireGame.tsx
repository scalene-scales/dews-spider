import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Stock from "./components/Stock";
import Foundations from "./components/Foundations";
import Tableau from "./components/Tableau";

export default function SpiderSolitaireGame(props: {}) {
  return (
    <Container>
      <Stack
        direction="column"
        spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}>
          <Stock />
          <Foundations />
        </Stack>
        <Container>
          <Tableau />
        </Container>
      </Stack>
    </Container>
  );
}
