import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor() {
  return (
    <div className="relative left-[50%] top-[100px] overflow-x-hidden">
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="inherit" size={100}/>
      </Stack>
    </div>
  );
}
