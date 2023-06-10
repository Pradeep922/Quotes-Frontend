
import "./updateQuote.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateQuote = () => {
    const navigate = useNavigate('/');
    const params = useParams();
    const [quoteData, setQuoteData] = useState({quote: '', author: ''});

    useEffect(() => {
        getQuoteById();
    }, []);

    const getQuoteById = async () => {
        try{
            const quoteId = params.quoteId.toString();
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/quotes/${quoteId}`);

            if(response){
                console.log('Quote by Id: ',response.data.quote);
                setQuoteData(response.data.quote);
            }

        }catch(error){
            console.log('Error while retriving quote by Id; ', error)
        }
    }

    const handleQuoteData = (value) => {
        return setQuoteData(data => {
            return {...data, ...value};
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const quoteId = params.quoteId.toString();
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/quotes/${quoteId}`, quoteData);

            if(response){
                setQuoteData({
                    quote: '',
                    author: ''
                });

                navigate('/');
            }

        }catch(error){
            console.log('Error while adding Quote: ', error);
        }
    }

    return (
        <div className="UpdateQuote-container">
          <h2>Update a Quote</h2>

          <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Quote</label>
                    <input className="form-control" id='quote' type='text' placeholder="Enter a quote." value={quoteData.quote} onChange={(e) => handleQuoteData({quote: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input className="form-control" id='quote' type='text' placeholder="Enter name of the author." value={quoteData.author} onChange={(e) => handleQuoteData({author: e.target.value})}/>
                </div>
                <div className="form-group mt-3">
                    <input className="btn btn-primary" value="Update Quote" type='submit' />
                </div>
          </form>
        </div>
    )
}

export default UpdateQuote;