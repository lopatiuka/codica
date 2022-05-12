import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { citiesSlice, IWeatherInfo, selectCities } from './citiesSlice';
import { goTo, getSavedCities, getWeather, updateWeather } from "./services";
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';

export function CitiesComponent() {
    const dispatch = useDispatch();
    const savedCities = useSelector(selectCities);
    const [cityName, setCityName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(getSavedCities());
    }, [])

    return (<Container className="cities">
      <div className="add-city">
        <TextField id="standard-basic" className="field field-city" label="City" variant="standard" value={ cityName } onChange={ e => setCityName(e.target.value) }/>
        <TextField id="standard-basic" className="field field-country" label="Country code" variant="standard" value={ countryCode } onChange={ e => setCountryCode(e.target.value) }/>
        <Button variant="success" onClick={ () => dispatch(getWeather(cityName, countryCode)) }>Add City</Button>
      </div>
      <Row>
        {
          savedCities.map( (item: { name: string, temp: string, weather: IWeatherInfo, lat: string, lon: string }) => {
            return <Col sm={ 4 } key={ item.name }>
                <Card onClick={ e => dispatch(goTo(e, item.name, navigate)) }>
                  <h3>{ item.name }</h3>
                    <Card.Body>
                      <Card.Text>{ Number.parseFloat(item.weather.temp).toFixed(0) } &#176;C, { item.weather.sky }</Card.Text>
                      <div>
                        <RefreshIcon className="icon icon-refresh" onClick={ e => dispatch(updateWeather(e, item.lat, item.lon)) }/>
                        <DeleteOutlinedIcon className="icon icon-delete" onClick={ e => dispatch(citiesSlice.actions.deleteCity({ event: e, name: item.name })) }/>
                      </div>
                    </Card.Body>
                </Card>
            </Col>
          })
        }
      </Row>
    </Container>)
}