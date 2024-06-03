import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {get_user_id, useTheme} from "./Components/ThemeContext";
import Navbar from "./Components/Navbar";
import EspNodes from "./Components/EspNodes";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import EspCard from "./Components/EspCard";
import {BASE_URL} from "./index";
import axios from "axios";

export default function App () {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [bestBooks, setBestBooks] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + "books")
            .then(response => {
                setBooks(response.data);
                setBestBooks(response.data);
            })
            .catch(error => console.log(error.response));
    }, []);


    return (
      <div style={{
          backgroundImage: 'url(background.avif)',
          // backgroundColor: 'black',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
      }}>
          <Grid container>
              <Navbar/>
              <Grid item xs={12}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <Grid container justifyContent={'right'}>
                              <Grid item>
                                  <Typography component="h1" variant="h3" style={{ color: 'white' }}>خرید کتاب</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12}>
                          <Grid container spacing={2} justifyContent={'right'}>
                              {books.map((card, index) => (
                                  <Grid item key={index}>
                                      <EspCard id={card.book_id} title={card.name} author={card.author} genre={card.genre} price={card.price} description={card.description} image={''} />
                                  </Grid>
                              ))}
                          </Grid>
                      </Grid>
                      <Grid item xs={12}>
                          <Grid container justifyContent={'right'}>
                              <Grid item>
                                  <Typography component="h1" variant="h3" style={{ color: 'white' }}>برترین‌ها</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={12}>
                          <Grid container spacing={2} justifyContent={'right'}>
                              {bestBooks.map((card, index) => (
                                  <Grid item key={index}>
                                      <EspCard title={card.name} author={card.author} genre={card.genre} price={card.price} description={card.description} image={''} />
                                  </Grid>
                              ))}
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
      </div>
  );
};