import React, {PureComponent} from "react";
import axios from "axios";

const inputStyle = {
    paddingLeft: "5px",
    width: "70%",
    height: "20px", 
    margin: "10px"
}
const buttonStyle = {
    height: "25px",
    width: "100px",
    padding: "0px 5px"
}
let count = 0;
class Movies extends PureComponent{
    constructor() {
        super();
        this.state= {
            res: {}
        }
    }

    async componentWillMount(){
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=marvel`);        
        this.setState({
            res: response
        });
    }

    handleChange = async (event) => {
        console.log("event :", event);
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${event.target.value}`);
        console.log("res :", res.data.results);
        this.setState({
            res: res
        });
    }

    render() {
        const { res } = this.state;
        return(
            <div style={{width: "100%"}}>
                <div style={{position: "fixed", left: "50%", width: "600px", top: "0%", marginLeft: "-300px"}}>
                    <input style={inputStyle} placeholder="search movies" name="movie" onBlur={(e) => this.handleChange(e)}/>
                    <button style={buttonStyle} name="submit" value="submit"> Submit </button>
                </div>
                <div style={{display: "flex", flexDirection: "row", margin: "100px 0px"}}>
                    {res && res.data && res.data.results.map(d => {
                            count++;
                            return <div >
                                <img style={{height:"300px", width: "230px", margin: "0px 15px"}} src={`http://image.tmdb.org/t/p/w500${d.poster_path}`}/>
                                <p>{d.title}</p>   
                                <p>{d.release_date}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Movies;