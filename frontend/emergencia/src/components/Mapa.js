import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default class Maps extends Component {
  render() {
    const apiKey = "AIzaSyD0-NXj_4PCe3F22tEmCGIod0D585Jgec8";

    return (
      <div className="container">
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={{
              lat: 25.651619148656884,
              lng: -100.28969426686491,
            }}
            defaultZoom={11.90}
          >
            {/* Marcador Rojo */}
            <div
              lat={25.651619148656884}
              lng={-100.28969426686491}
            >
              <LocationOnIcon
                style={{
                  color: "red",
                  fontSize: 30,
                }}
              />
            </div>

            {/* Marcador Azul */}
            <div
              lat={25.715021689621285}
              lng={-100.30185805524592}
            >
              <LocationOnIcon
                style={{
                  color: "blue",
                  fontSize: 30,
                }}
              />
            </div>
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
