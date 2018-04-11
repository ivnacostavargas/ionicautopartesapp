import { Foto } from "./Foto.interface";

export interface Autoparte {
  id:number;
  codigo_parte:string;
  titulo:string;
  estado:string;
  precio:string;
  nota:string;
  year_inicio:number;
  year_fin:number;
  marca:string;
  modelo:string;
  frente:string;
  lado:string;
  foto_portada:string;
  status:string;
  categoria:string;
  fecha_registro:string;
  fotos:Foto[];
}
