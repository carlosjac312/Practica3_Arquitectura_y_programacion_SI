import { reset } from "https://deno.land/std@0.203.0/fmt/colors.ts";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    type jugador = {//CREACIÓN DEL OBJETO JUGADOR
      nombre:string|null
      puntos:number
    }
    const jugadores:jugador[]=[];//ARRAY QUE CONTENDRA LOS JUGADORES
    let numeroJP = Number(prompt("¿Cuantos jugadores van participar?\n"));//NUMERO DE JUGADORES
    while(jugadores.length!=numeroJP){//MIENTRAS EL TAMAÑO DEL ARRAY DE JUGADORES NO SEA IGUAL AL NUMERO DE JUGADORES DICHO EL WHILE CONTINUA
      const nomb:string|null = prompt("Introduzca nombre del jugador\n")
      let player:jugador = {//SE CREA EL JUGADOR Y SE LE INTRODUCE EL NOMBRE ANTERIORMENTE SOLICITADO Y COMIENZA CON LOS PUNTOS A 0
        nombre: nomb,
        puntos: 0
      }
      jugadores.push(player)//SE INTRODUCE EL JUGADOR EN EL ARRAY
    }
    let posjug:number=0;//VARIABLE USADA PARA SABER LA POSICIÓN EN EL ARR DE JUGADORES
    let pregrespond:number=0;//VAR USADA PARA SABER CUANTAS PREGUNTAS SE HAN RESPONDIDO
    let numpreg = prompt("¿Cuantas preguntas respondera cada jugador? EL TOTAL DE PREGUNTAS ES 10\n");
    let numero = parseInt(numpreg);//CANTIDAD DE PREGUNTAS POR JUGADOR
    let breakeame:boolean=false;//USO ESTE BOOLEANO PARA ROMPER EL BUCLE

    while (isNaN(numero)) {//ESTE WHILE EVITA QUE INTRODUZCAN COSAS QUE NO SEAN NUMEROS
      numpreg = prompt("NO SE HA INGRESADO UN NUMERO ENTERO POR FAVOR Introduzca cuantas preguntas respondera cada jugador EL TOTAL DE PREGUNTAS ES 10\n");
      numero = parseInt(numpreg);
    }
  fetch("https://opentdb.com/api.php?amount=10&type=boolean").then((res)=>{res.json().then(res=>{res.results.forEach((e:any)=>{//COMIENZO DEL BUCLE QUE PASA POR TODAS LA PREGUNTAS
      if(!breakeame){//MIENTRAS NO SE DE LA ORDEN DE BREAK CONTINUARA EL JUEGO
          console.log("TURNO DE "+jugadores[posjug].nombre+"\n"+e.question)//INDICA POR CONSOLA DE QUIEN ES EL TURNO
          let answer:string;
          let select = prompt("Introduzca 1 para VERDADERO o 2 para FALSO\n");//LAS SIGUIENTES 6 LINEAS SON LAS INSTRUCCIONES BÁSICAS PARA RESPONDER PREGUNTAS
          while(select !== "1" && select !== "2"){//WHILE PARA EVITAR QUE INTRODUZCAN COSAD DISTINTAS A 1 O 2
              select = prompt("Introduzca SOLO 1 para VERDADERO o 2 para FALSO\n");
              console.log(e.question)
          }
          if(select==="1") answer="True"
          else answer="False"
          if(answer===e.correct_answer){//SACA POR CONSOLA EL RESULTADO
              console.log("Correcto")
              jugadores[posjug].puntos++;
          }else console.log("Incorrecto")
          pregrespond++;//SE SUMA 1 A LA CANTIDA DE RESPUESTAS RESPONDIDAS
          if(pregrespond=== numero){//SI LA CANTIDAD DE PREGUNTAS RESPONDIDAS ES IGUAL A LA CANTIDAD DE PREGUNTAS POR PERSONA SE ACABA EL TURNO DE ESA PERSONA
              if(posjug===jugadores.length-1){//REVISAMOS SI EL ULTIMO JUGADOR YA HA RESPONDIDO Y SI ES EL CASO MOSTRAMOS GANADORES Y TERMINAMOS
                  breakeame=true;
                  console.log(jugadores.filter((e)=>Math.max(e.puntos)));
              }
              posjug++;//SI NO HEMOS TERMINADO PASAMOS AL SIGUIENTE JUGADOR Y PONEMOS LAS PREGUNTAS RESPONDIDAS A 0
              pregrespond=0;
          }
      }
  })})})
}
