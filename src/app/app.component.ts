import { rendererTypeName } from '@angular/compiler';
import { Component } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'base';
}
//  ----------------------------------------------
//  Tarea | lunes, 20 de septiembre de 2021, 14:00
//  ----------------------------------------------
//  Preparar un programa que permita crear productos, agregarlos a un almacen, modificar la cantidad de productos en el almacen (saldo),
//  tener cuidado con los saldos negativos, trabajar con más de un almacen y mover productos entre almacenes.
//  Todo es en consola, la aplicación deberá mostrar los mensajes correspondientes a las acciones de muestra, es decir, si creo un producto y
//  lo agrego al almacen 01, mostrar los productos con sus saldos en el almacen 01.
//  No es necesario interacción con la aplicación. Presentación individual. Subir el proyecto a github y presentar la url de github para la
//  revisión del código fuente.


//  [ OBJETOS ] -----------------------------------------------------------------------------------------------------------------
//    Producto

class producto {
  pro_nombre: string;
  pro_cantidad: number;

  constructor() {
    this.pro_nombre = '';
    this.pro_cantidad = 0;
  }

  mod_cantidad(operacion: string, monto: number): boolean /*true = Operacion Realizada Correctamente, false = Error en la operacion*/ {
    let status:boolean = false;

    if (monto <= 0) {console.log('\tERROR, no se puede ingresar el valor.');}
    else {
      switch (operacion) {
        case 'add':
            this.pro_cantidad += monto; console.log(`\tSe aumento la cantidad de [${this.pro_nombre}] a +${monto}.`);
            return true;
        case 'remove':
          if ((this.pro_cantidad - monto) < 0) {
            console.log('\tERROR, no hay suficientes productos a quitar.');
            return false;
          }
          else {
            this.pro_cantidad -= monto;
            console.log(`\tSe redujo la cantidad de [${this.pro_nombre}] a -${monto}.`);
            return true;
          }
      }
      console.log(`\tLa cantidad actual del producto [${this.pro_nombre}] es de ${this.pro_cantidad}.`);
      return false;
    }
    return status;
  }
}

//    Almacen
class almacen {
  alm_nombre: string;
  alm_productos: producto[];

  constructor() {
    this.alm_nombre = ''
    this.alm_productos = [];
  }
}

//  [ FUNCIONES ] -----------------------------------------------------------------------------------------------------------------
function existeProducto(nom_producto: string, almacen: almacen): boolean{
  let status:boolean = false;
  almacen.alm_productos.forEach((producto) => {
    if (producto.pro_nombre == nom_producto) {
      status = true;
    }
  });
  return status;
}

function buscarProducto(nom_producto: string, almacen: almacen){
  if (existeProducto(nom_producto, almacen) == true) {return almacen.alm_productos.find(producto => producto.pro_nombre === nom_producto);}
  return null;
}

function moverProducto(alm_origen: almacen, nom_producto: string, cantidad: number, alm_destino: almacen){
  if (existeProducto(nom_producto,alm_origen)== true && existeProducto(nom_producto,alm_destino) == true){
    if (buscarProducto(nom_producto, alm_origen)?.mod_cantidad('remove', cantidad) == true){
      if (buscarProducto(nom_producto, alm_destino)?.mod_cantidad('add', cantidad) == true){
        console.log(`Se han trasladado [${cantidad} ${nom_producto}] del almacen [${alm_origen.alm_nombre}] al almacen [${alm_destino.alm_nombre}].`)
      }
    }
  }
}

function mostrarProductosAlmacen(almacen: almacen){
  console.log(`Mostrando los productos del almacen [${almacen.alm_nombre}]`)
  console.log('\tNombre Producto\t\tCantidad')
  almacen.alm_productos.forEach((producto) => {
    console.log(`\t\t${producto.pro_nombre}\t\t\t${producto.pro_cantidad}`);
  });
  console.log('------------------------------------------------------')
}

//  [ Valores por Defecto] -----------------------------------------------------------------------------------------------------------------
const alm_01 = new almacen(); alm_01.alm_nombre = 'Club nocturno';
  const prod_01 = new producto();
    prod_01.pro_nombre = "Material Medico"
    prod_01.pro_cantidad = 30;
  const prod_02 = new producto();
    prod_02.pro_nombre = "Arte y Antiguedades"
    prod_02.pro_cantidad = 25;
  const prod_03 = new producto();
    prod_03.pro_nombre = "Joyas y piedras preciosas"
    prod_03.pro_cantidad = 12;
    const prod_04 = new producto();
  prod_04.pro_nombre = "Tabaco y alcohol"
  prod_04.pro_cantidad = 35;
    
  alm_01.alm_productos.push(prod_01)
  alm_01.alm_productos.push(prod_02)
  alm_01.alm_productos.push(prod_03)
  alm_01.alm_productos.push(prod_04)


const alm_02 = new almacen(); alm_02.alm_nombre = 'Bunker';
const prod_05 = new producto();
  prod_05.pro_nombre = "Material Medico"
  prod_05.pro_cantidad = 12;
const prod_06 = new producto();
  prod_06.pro_nombre = "Arte y Antiguedades"
  prod_06.pro_cantidad = 35;
const prod_07 = new producto();
  prod_07.pro_nombre = "Joyas y piedras preciosas"
  prod_07.pro_cantidad = 21;
  const prod_08 = new producto();
  prod_08.pro_nombre = "Tabaco y alcohol"
  prod_08.pro_cantidad = 40;
  

alm_02.alm_productos.push(prod_05)
alm_02.alm_productos.push(prod_06)
alm_02.alm_productos.push(prod_07)
alm_02.alm_productos.push(prod_08)

const alm_03 = new almacen(); alm_03.alm_nombre = 'Hangar';
const prod_09 = new producto();
  prod_09.pro_nombre = "Material Medico"
  prod_09.pro_cantidad = 62;
const prod_10 = new producto();
  prod_10.pro_nombre = "Arte y Antiguedades"
  prod_10.pro_cantidad = 12;
const prod_11 = new producto();
  prod_11.pro_nombre = "Joyas y piedras preciosas"
  prod_11.pro_cantidad = 2;
  const prod_12 = new producto();
  prod_12.pro_nombre = "Tabaco y alcohol"
  prod_12.pro_cantidad = 50;
  
alm_03.alm_productos.push(prod_09)
alm_03.alm_productos.push(prod_10)
alm_03.alm_productos.push(prod_11)
alm_03.alm_productos.push(prod_12)

const alm_04 = new almacen(); alm_04.alm_nombre = 'SeguroServ';
const prod_13 = new producto();
  prod_13.pro_nombre = "Material Medico"
  prod_13.pro_cantidad = 45;
const prod_14 = new producto();
  prod_14.pro_nombre = "Arte y Antiguedades"
  prod_14.pro_cantidad = 22;
const prod_15 = new producto();
  prod_15.pro_nombre = "Joyas y piedras preciosas"
  prod_15.pro_cantidad = 55;
  const prod_16 = new producto();
  prod_16.pro_nombre = "Tabaco y alcohol"
  prod_16.pro_cantidad = 95;
  
alm_04.alm_productos.push(prod_13)
alm_04.alm_productos.push(prod_14)
alm_04.alm_productos.push(prod_15)
alm_04.alm_productos.push(prod_16)


mostrarProductosAlmacen(alm_03);
mostrarProductosAlmacen(alm_01);

moverProducto(alm_03,'Tabaco y alcohol',10,alm_01);

mostrarProductosAlmacen(alm_03);
mostrarProductosAlmacen(alm_01);
