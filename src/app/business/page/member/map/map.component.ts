import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

/**
 * MapComponent
 *
 * @export
 * @class MapComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  /**
   * MapInfoWindow
   *
   * @type {MapInfoWindow}
   * @memberof MapComponent
   */
  /**
   * MapInfoWindow
   *
   * @type {MapInfoWindow}
   * @memberof MapComponent
   */
  @ViewChild(MapInfoWindow, { static: false })
  public infoWindow!: MapInfoWindow;

  public selectedPlace!: string | null;

  /**
   * Zoom level property.
   *
   * @memberof MapComponent
   */
  public zoom = 12;

  /**
   * Sample coordinate (arround AIT).
   *
   * @type {google.maps.LatLngLiteral}
   * @memberof MapComponent
   */
  public center: google.maps.LatLngLiteral = {
    lat: 38.883671,
    lng: 121.612886,
  };

  /**
   * Options property.
   *
   * @type {google.maps.MapOptions}
   * @memberof MapComponent
   */
  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };

  /**
   *
   *
   * @type {any[]}
   * @memberof MapComponent
   */
  public acJPOfficeMarkers: any[] = [
    {
      name: 'AIR',
      position: {
        lat: 35.6697675,
        lng: 101,
      },
    },
    {
      name: 'AIC',
      position: {
        lat: 35.6689387,
        lng: 101,
      },
    },
    {
      name: 'AIT',
      position: {
        lat: 35.6542943,
        lng: 101,
      },
    },
  ];

  /**
   * Marker options
   *
   * @memberof MapComponent
   */
  public markerOptions = { draggable: false };

  /**
   * Creates an instance of MapComponent.
   * @memberof MapComponent
   */
  constructor() {}

  /**
   * OnInit
   *
   * @memberof MapComponent
   */
  public ngOnInit(): void {}

  /**
   * openInfoWindow
   *
   * @param {MapMarker} marker
   * @memberof MapComponent
   */
  public openInfoWindow(marker: MapMarker): void {
    this.selectedPlace = marker.getTitle();
    this.infoWindow.open(marker);
  }
}
