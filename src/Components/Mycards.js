import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import "../Mycard.scss";
import { Box, Paper, Grid, Divider, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
 import { getMarketAsync } from "../redux/marketSlice";
import Animation from "./Animation";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 800,
  color: theme.palette.text.primary,
}));
function Mycards(props) {
  const dispatch = useDispatch();
   const market = useSelector((state) => state.market);
   const [animation, setanimation] = useState(true);
   const [time, setTime] = useState(0);
   const [timerOn, settimerOn] = useState(true);
  const [marketState, setmarketState] = useState([]);



 

 
  const handleChange = () => {
    fetch(`https://snetmyapp.herokuapp.com/case3`)
      .then((res) => res.json())
      .then((json) =>
        setmarketState((prevEmployees) => [...prevEmployees, json].sort((a,b)=>{
          return a.Cash>b.Cash ? 1:-1
        }))
      );
  };

  useEffect(() => {
    setmarketState([]);
     dispatch(getMarketAsync());
  }, []);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        handleChange();
      }, 9000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    if (time === market.num_offers) {
      settimerOn(false);
      setanimation(false);
    }
  }, [time]);
   return (
    <>
      <div className={animation ? "animationShow" : "animationHide"}>
        <Animation />
      </div>
      {market.num_offers === marketState.length? (
        <div>
          {Object.values(marketState).map((mp) => (
            <Box key={mp.Cash} sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              {
                <StyledPaper
                  key={mp.Cash}
                  sx={{
                    my: 5,
                    mx: "auto",
                    p: 4,
                  }}
                >
                  <Grid className="gridContainer" container wrap="nowrap">
                    <Grid item sm={12} lg={2}>
                      <img
                        className="logo"
                        src={mp.ImagePath}
                        alt={mp.title}
                        loading="lazy"
                      />
                    </Grid>
                    <Divider
                      className="vertDivider"
                      orientation="vertical"
                      flexItem
                    ></Divider>
                    <Grid item sm={12} lg={8}>
                      <Box sx={{ fontWeight: "bold", ml: 1 }}>
                        {mp.ProductDesc}
                      </Box>
                      <Box sx={{ fontWeight: "regular", ml: 1 }}>
                        {mp.FirmName}
                      </Box>
                    </Grid>
                    <Grid className="rightGrid" item xs={12} lg={2}>
                      {Object.values(mp.QuotaInfo)[1] > 0 ? (
                        <div>
                          {" "}
                          <Box
                            style={{ textDecoration: "line-through" }}
                            sx={{ fontWeight: "thin", m: 1 }}
                          >
                            Peşin {mp.Cash.toFixed(2)} TL
                          </Box>
                          <Box
                            className="price"
                            sx={{ fontWeight: "bold", m: 1 }}
                          >
                            {Object.values(mp.QuotaInfo)[1].toFixed(2)} TL
                          </Box>
                        </div>
                      ) : (
                        <Box
                          className="price"
                          sx={{ fontWeight: "bold", m: 1 }}
                        >
                          {mp.Cash.toFixed(2)} TL
                        </Box>
                      )}
                      <Box
                        className="price"
                        sx={{ fontWeight: "regular", m: 1 }}
                      >
                        <Button variant="contained">Satın Al</Button>
                      </Box>
                    </Grid>
                  </Grid>
                </StyledPaper>
              }
            </Box>
          ))}
        </div>
      ) : (
        <div className={market.num_offers&&animation ? "ploading" : "ploadingClose"}>
          {market.num_offers} sigorta teklifi sizin için hazırlanıyor.Lütfen
          bekleyiniz...
        </div>
      )}
    </>
  );
}

export default Mycards;
