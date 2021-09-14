    const d = document,
          $fetchAsync = document.getElementById("fetch-async"),
          $fragment = document.createDocumentFragment(),
          $btn =d.querySelector(".btn"),
          $datos =d.querySelectorAll(".datos");
  
    const path = (d.location.hostname.includes('localhost'))
    ? 'http://localhost:8088/api'
    : 'https://mi-primer-restserver.herokuapp.com/api';
    const coleccionesPermitidas = ['categorias', 'productos']

  async function getData(coleccion = 'categorias', desde = 0, limite = 10, si = false) {
    try {
      let res = await fetch(`${path}/${coleccion}?desde=${desde}&limite=${limite}`),
        json = await res.json();
  
      //if (!res.ok) throw new Error("Ocurrio un Error al solicitar los Datos");
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
        if(si){
                
        }
        json.data.forEach(element => {
            const $li = document.createElement("li");
            $li.innerHTML = `${element.nombre}`;
            $fragment.appendChild($li);
        });
      $fetchAsync.appendChild($fragment);
    } catch (err) {
      console.log(err);
      let message = err.statusText || "Ocurrió un error";
      $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
    } finally {
      console.log("Esto se ejecutará independientemente del try... catch");
    }
  }
  
  getData('Productos');
  
  $btn.addEventListener("click",()=>{
      
      const lista = [];
      
      $datos.forEach((el)=>{
          console.log(el)
          
          lista.push(el.valueAsNumber)
        })
        
        if(lista.includes(NaN)){
            return alert("debe de llenar las casillas");
        }

        getData('Productos', lista[0], lista[1]);

  })