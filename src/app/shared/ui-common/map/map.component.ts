import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import * as Leaflet from 'leaflet';
import { GlobalConstants } from '../../util-common/global-constants';
import { IOrganization } from 'src/app/domains/admin/organization/data/models/organization/organization.model';

export const getLayers = (): Leaflet.Layer[] => {
  return [
    // Basic style

    new Leaflet.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
      } as Leaflet.TileLayerOptions
    ),
    // Pastel style, remove if you want basic style.
    new Leaflet.TileLayer(
      'https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key={your_key}',
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
      } as Leaflet.TileLayerOptions
    ),
    // ...getMarkers(),
    // ...getRoutes(),
    // ...getPolygones()
  ] as Leaflet.Layer[];
};
const iconRetinaUrl = './assets/svg/marker.svg';
const iconUrl = './assets/svg/marker.svg';

const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  // shadowUrl,
  iconSize: [25, 20],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  // shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  // props
  @Input() data!: IOrganization;

  //
  info = GlobalConstants;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options: Leaflet.MapOptions = {
    layers: this.getLayers(),
    zoom: 17,

    center: new Leaflet.LatLng(26.668610632168264, 87.71346748754738),
  };
  // 27.715549978265482, 85.34613027341052
  //  27.7153365, 85.3460562

  private getLayers() {
    return [
      new Leaflet.TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
        } as Leaflet.TileLayerOptions
      ),
    ] as Leaflet.Layer[];
  }

  initMarkers() {
    const initialMarkers = [
      // Object { lat: 26.668610632168264, lng: 87.71346748754738 }
      {
        position: { lat: 26.668610632168264, lng: 87.71346748754738 },
        draggable: true,
      },
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker
        .addTo(this.map)
        .bindPopup(
          `
        <div style="width: 300px;padding: 1rem;  word-wrap: break-word;">
                <h6 ><strong>${this.info.appTitle}</strong>  </h6>
        
               <span style="color:#707376;">Location:</span>       
                <br/>
                <strong style="padding-bottom:4px;"> ${this.info.STREET_ADDRESS}</strong>,
               
                <strong style="padding-bottom:4px;"> ${this.info.ADDRESS_LOCALITY}</strong>,
               
                <strong style="padding-bottom:4px;"> ${this.info.AREA_SERVED}</strong>
                <br/> 
                       <span style="color:#707376; margin:6px 0;">Mobile:</span>       
                 <br/>
                <b style="padding-bottom:4px;">${this.info.MOBILE}</b>
                <br/>
                <small style="color:crimson;">Please click on map to get direction.</small>
        </div>
        
       
        `
        )
        .openPopup();
      // this.map.panTo(data.position);
      // this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event: any) => this.markerClicked(event, index))
      .on('dragend', (event: any) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
    window.open(this.info.googleMap);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
    window.open(this.info.googleMap);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
}
