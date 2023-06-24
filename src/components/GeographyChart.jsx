import { ResponsiveChoropleth } from "@nivo/geo";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { geoFeatures } from "../data/mockGeoFeatures";
import { mockGeographyData as data1 } from "../data/mockData";
import { geoData } from "../helpers/getGeoData";
import { useState } from "react";
import { useEffect } from "react";
import dataApi from "../api/dataApi";



export const GeographyChart = ({ isDashboard = false }) => {

  const [data, setData] = useState( "" );
  const [geography, setGeography] = useState( "" );
  const [loaded, setLoaded] = useState( false );

  const theme = useTheme();
  const colors = tokens( theme.palette.mode );

  useEffect( () => {
    const fetchData = async () => {
      try {
      
        const { data } = await dataApi.get('/data/geo');
        setData( data );
        setLoaded( true );
  
      } catch (error) {
          console.log( error );
      }
    }

    fetchData();

  }, []);

  //console.log(data)

  useEffect( () => {
    const fetchData = async () => {
      try {
      
        const { data } = await dataApi.get('/data/geography');
        setGeography( data.geography[0].mockGeographyData );
  
      } catch (error) {
          console.log( error );
      }
    }

    fetchData();

  }, []);

  //console.log(geography)

  if ( !loaded ) {
    return <div className="loading loading-geo">Loading...</div>
  }

  return (
    <ResponsiveChoropleth
        data={geography}
        theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.gray[500]
                }
              },
              legend: {
                text: {
                  fill: colors.gray[500]
                }
              },
              ticks: {
                line: {
                  stroke: colors.gray[500],
                  strokeWidth: 1
                },
                text: {
                  fill: colors.gray[500]
                }
              }
            },
            legends: {
              text: {
                fill: colors.gray[500],
              },
            },
          }}
        features={ data.geoData[0].features }
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[ 0, 1000000 ]}
        unknownColor="#333"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={ isDashboard ? 40 : 150 }
        projectionTranslation={ isDashboard ? [ 0.49, 0.6 ] : [ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        borderWidth={1.5}
        borderColor="#fff"
        legends={
            !isDashboard ? [{
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: colors.gray[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#ffffff',
                            itemOpacity: 1
                        }
                    }
                ]
            }] : undefined
        }
    />
  )
}
