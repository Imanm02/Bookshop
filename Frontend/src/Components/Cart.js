import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../index";
import Navbar from "./Navbar";
import {Typography} from "@material-ui/core";
import EspCard from "./EspCard";

export default function Cart () {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [books, setBooks] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(BASE_URL + "orders/" + localStorage.getItem('user_id'));
                setOrders(response.data['orders']);
                console.log(response.data['orders']);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            const bookPromises = orders.map(order => axios.get(BASE_URL + 'book/' + order['book_id']));
            try {
                const bookResponses = await Promise.all(bookPromises);
                const booksData = bookResponses.map(response => response.data);
                setBooks(booksData);
            } catch (error) {
                console.log(error.response);
            }
        };

        if (orders.length > 0) {
            fetchBooks();
        }
    }, [orders]);

    return (
        <div style={{
            backgroundImage: 'url(../background.avif)',
            // backgroundColor: 'black',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
        }}>
            <Grid container>
                <Navbar/>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'right'}>
                                <Grid item>
                                    <Typography component="h1" variant="h3" style={{ color: 'white' }}>سبد خرید</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} justifyContent={'right'}>
                                {books.map((card, index) => (
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