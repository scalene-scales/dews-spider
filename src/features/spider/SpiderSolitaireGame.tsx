import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Stock from "features/spider/components/Stock";
import Foundations from "features/spider/components/Foundations";
import Tableau from "features/spider/components/tableau/Tableau";

export default function SpiderSolitaireGame(props: {}) {
  return (
    <Container
      sx={{ margin: 5 }}
      disableGutters>
      <Stack
        direction="column"
        spacing={2}
        sx={{ justifyContent: "start" }}>
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
