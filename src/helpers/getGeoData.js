import dataApi from "../api/dataApi";

let geoData;

export const getGeo = async () => {

    try {
      
      const { data } = await dataApi.get('/data/geo');
      geoData = data;

    } catch (error) {
        console.log( error );
    }

};

getGeo();

export { geoData };
