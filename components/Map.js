import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import { useState } from "react"
import { getCenter } from 'geolib';

function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({})
    

    //Transform the search results object into the  { latitude: 51.5103, longitude: 7.49347 } object

    const coordinates = searchResults.map((result)=>({
        longitude: result.long,
        latitude: result.lat
    }))

    //The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates)
    //console.log(center)

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    })

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/shaz-10/cktbjrij57xdh17k78hatm87a"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">
                            📍
                        </p>
                    </Marker>
                    {/* popup if we click marker */}
                    {selectedLocation.long == result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
