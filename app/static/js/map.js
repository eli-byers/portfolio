function initMap() {
    // Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.3382, lng: -121.8863},
        zoom: 10,
        dragable: false,
        zoomable: false,
        styles: 

        //===============================================================
        //                    Blue
        //===============================================================
        // [
        //     {
        //       "elementType": "geometry",
        //       "stylers": [
        //         {
        //           "color": "#1d2c4d"
        //         }
        //       ]
        //     },
        //     {
        //       "elementType": "labels",
        //       "stylers": [
        //         {
        //           "visibility": "off"
        //         }
        //       ]
        //     },
        //     {
        //       "elementType": "labels.text.fill",
        //       "stylers": [
        //         {
        //           "color": "#8ec3b9"
        //         }
        //       ]
        //     },
        //     {
        //       "elementType": "labels.text.stroke",
        //       "stylers": [
        //         {
        //           "color": "#1a3646"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "administrative",
        //       "elementType": "geometry",
        //       "stylers": [
        //         {
        //           "visibility": "off"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "administrative.country",
        //       "elementType": "geometry.stroke",
        //       "stylers": [
        //         {
        //           "color": "#4b6878"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "administrative.land_parcel",
        //       "elementType": "labels.text.fill",
        //       "stylers": [
        //         {
        //           "color": "#64779e"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "administrative.locality",
        //       "elementType": "labels",
        //       "stylers": [
        //         {
        //           "visibility": "on"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "administrative.neighborhood",
        //       "stylers": [
        //         {
        //           "visibility": "off"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "administrative.province",
        //       "elementType": "geometry.stroke",
        //       "stylers": [
        //         {
        //           "color": "#4b6878"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "landscape.man_made",
        //       "elementType": "geometry.stroke",
        //       "stylers": [
        //         {
        //           "color": "#334e87"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "landscape.natural",
        //       "elementType": "geometry",
        //       "stylers": [
        //         {
        //           "color": "#023e58"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "poi",
        //       "stylers": [
        //         {
        //           "visibility": "off"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "poi",
        //       "elementType": "geometry",
        //       "stylers": [
        //         {
        //           "color": "#283d6a"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "poi",
        //       "elementType": "labels.text.fill",
        //       "stylers": [
        //         {
        //           "color": "#6f9ba5"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "poi",
        //       "elementType": "labels.text.stroke",
        //       "stylers": [
        //         {
        //           "color": "#1d2c4d"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "poi.park",
        //       "elementType": "geometry.fill",
        //       "stylers": [
        //         {
        //           "color": "#023e58"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "poi.park",
        //       "elementType": "labels.text.fill",
        //       "stylers": [
        //         {
        //           "color": "#3C7680"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road",
        //       "elementType": "geometry",
        //       "stylers": [
        //         {
        //           "color": "#304a7d"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road",
        //       "elementType": "labels.icon",
        //       "stylers": [
        //         {
        //           "visibility": "off"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road",
        //       "elementType": "labels.text.fill",
        //       "stylers": [
        //         {
        //           "color": "#98a5be"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road",
        //       "elementType": "labels.text.stroke",
        //       "stylers": [
        //         {
        //           "color": "#1d2c4d"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road.highway",
        //       "elementType": "geometry",
        //       "stylers": [
        //         {
        //           "color": "#2c6675"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road.highway",
        //       "elementType": "geometry.stroke",
        //       "stylers": [
        //         {
        //           "color": "#255763"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road.highway",
        //       "elementType": "labels",
        //       "stylers": [
        //         {
        //           "saturation": -55
        //         },
        //         {
        //           "visibility": "simplified"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road.highway",
        //       "elementType": "labels.text.fill",
        //       "stylers": [
        //         {
        //           "color": "#b0d5ce"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "road.highway",
        //       "elementType": "labels.text.stroke",
        //       "stylers": [
        //         {
        //           "color": "#023e58"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "transit",
        //       "stylers": [
        //         {
        //           "visibility": "off"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "transit",
        //       "elementType": "labels.text.fill",
        //       "stylers": [
        //         {
        //           "color": "#98a5be"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "transit",
        //       "elementType": "labels.text.stroke",
        //       "stylers": [
        //         {
        //           "color": "#1d2c4d"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "transit.line",
        //       "elementType": "geometry.fill",
        //       "stylers": [
        //         {
        //           "color": "#283d6a"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "transit.station",
        //       "elementType": "geometry",
        //       "stylers": [
        //         {
        //           "color": "#3a4762"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "water",
        //       "elementType": "geometry",
        //       "stylers": [
        //         {
        //           "color": "#0e1626"
        //         }
        //       ]
        //     },
        //     {
        //       "featureType": "water",
        //       "elementType": "labels.text.fill",
        //       "stylers": [
        //         {
        //           "color": "#4e6d70"
        //         }
        //       ]
        //     }
        //   ]

        //===============================================================
        //                    Bright
        //===============================================================

          // [
          //   {
          //     "featureType": "administrative",
          //     "elementType": "geometry",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "administrative.land_parcel",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "administrative.neighborhood",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "landscape.man_made",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "poi",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road",
          //     "elementType": "labels.icon",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.arterial",
          //     "stylers": [
          //       {
          //         "visibility": "simplified"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.arterial",
          //     "elementType": "labels",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.highway",
          //     "elementType": "labels",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.local",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "transit",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "transit.line",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "transit.station",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   }
          // ]

        //===============================================================
        //                    Dark
        //===============================================================

          [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#242f3e"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#746855"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#242f3e"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bcbcbc"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#515151"
                },
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#171717"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#263c3f"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#38414e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#292929"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9ca5b3"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "saturation": -90
                },
                {
                  "lightness": -30
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road.local",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2f3948"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels",
              "stylers": [
                {
                  "color": "#e8e8e8"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#515c6d"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#515151"
                },
                {
                  "visibility": "on"
                }
              ]
            }
          ]
    });
}