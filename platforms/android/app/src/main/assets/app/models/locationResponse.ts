export interface Position {
    latitude: number;
    longitude: number;
}

export interface coordinateArray {
    () : Position[];
}

export interface polygonRings {
    (): Position[][];
}

export class GeometryType {
    public static Point: string = "Point";
    public static LineString: string = "LineString";
    public static Polygon: string = "Polygon";
    public static MultiPoint: string = "MultiPoint";
    public static MultiLineString: string = "MultiLineString";
    public static MultiPolygon: string = "MultiPolygon";
    public static MultiGeometry: string = "MultiGeometry";
}

export interface Geometry {
    type?: string;
}

export interface Point extends Geometry {
    coordinates: Position;
}

export interface LineString extends Geometry {
    coordinates: coordinateArray;
}

// export class LineString implements Geometry {
//     coordinates: Position;
// }

export interface Polygon extends Geometry {
    coordinates: polygonRings;
}

export interface MultiPolygon extends Geometry {
    coordinates: polygonRings[];
}

export interface MultiPoint extends Geometry {
    coordinates: coordinateArray;
}

export interface MultiLineString extends Geometry {
    coordinates: polygonRings;
}

export interface GeometryCollection extends Geometry {
    geometries: Geometry[];
}

export interface IGeometry {
    type: string;
    coordinates: number[];
}

export interface IGeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    $key?: string;
}
export class GeoJson implements IGeoJson {
    type = 'Feature';
    geometry: IGeometry;
  
    constructor(coordinates, public properties?) {
      this.geometry = {
        type: 'Point',
        coordinates: coordinates
      }
    }
  }