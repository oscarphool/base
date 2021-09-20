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
const alm_01 = new almacen(); alm_01.alm_nombre = 'Primer Almacen';
  const prod_01 = new producto();
    prod_01.pro_nombre = "Cebolla"
    prod_01.pro_cantidad = 10;
  const prod_02 = new producto();
    prod_02.pro_nombre = "Papa"
    prod_02.pro_cantidad = 25;
  const prod_03 = new producto();
    prod_03.pro_nombre = "Camote"
    prod_03.pro_cantidad = 5;
    
  alm_01.alm_productos.push(prod_01)
  alm_01.alm_productos.push(prod_02)
  alm_01.alm_productos.push(prod_03)

const alm_02 = new almacen(); alm_02.alm_nombre = 'Segundo Almacen';
const prod_04 = new producto();
  prod_04.pro_nombre = "Cebolla"
  prod_04.pro_cantidad = 0;
const prod_05 = new producto();
  prod_05.pro_nombre = "Papa"
  prod_05.pro_cantidad = 13;
const prod_06 = new producto();
  prod_06.pro_nombre = "Camote"
  prod_06.pro_cantidad = 64;
  
alm_02.alm_productos.push(prod_04)
alm_02.alm_productos.push(prod_05)
alm_02.alm_productos.push(prod_06)

const alm_03 = new almacen(); alm_03.alm_nombre = 'Tercer Almacen';
const prod_07 = new producto();
  prod_07.pro_nombre = "Cebolla"
  prod_07.pro_cantidad = 1;
const prod_08 = new producto();
  prod_08.pro_nombre = "Papa"
  prod_08.pro_cantidad = 3;
const prod_09 = new producto();
  prod_09.pro_nombre = "Camote"
  prod_09.pro_cantidad = 90;
  
alm_03.alm_productos.push(prod_07)
alm_03.alm_productos.push(prod_08)
alm_03.alm_productos.push(prod_09)

//  [ OPERACIONES ] -----------------------------------------------------------------------------------------------------------------
//if (prod_01.mod_cantidad('remove',10) == true){
//  console.log("La operacion se realizo con exito.")
//}
//existeProducto('Papa', alm_01);


mostrarProductosAlmacen(alm_03);
mostrarProductosAlmacen(alm_01);

moverProducto(alm_03,'Cebolla',10,alm_01);

mostrarProductosAlmacen(alm_03);
mostrarProductosAlmacen(alm_01);

//console.log(alm_01.alm_productos[0].pro_cantidad);