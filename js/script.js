'use strict';

let SomaSexoM = 0;
let SomaSexoF = 0;
let TotalIdades = 0;
let MediaIdades = 0;
let TotalUsuarios = 0;

let tabUsuarios = null;

let ListaUsuarios = [];

let numberFormat = null;

window.addEventListener('load', () => {
    tabUsuarios = document.querySelector('#tabUsuarios');
    TotalUsuarios = document.querySelector('#countUsuarios');
    SomaSexoM = document.querySelector('#SomaSexoM');
    SomaSexoF = document.querySelector('#SomaSexoF');
    TotalIdades = document.querySelector('#SomaIdades');
    MediaIdades = document.querySelector('#MediaIdades');    
    numberFormat = Intl.NumberFormat('pt-BR'); 
    

});

function AtivarDesativarButton(){   
   
    if ( document.querySelector('#TextbuscarUsuario').value  )
        document.getElementById('btnBuscar').removeAttribute('disabled')
    else
    {
        document.getElementById('btnBuscar').setAttribute('disabled', 'disabled');             

    }
    
}


async function fetchUsuarios() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
 

  ListaUsuarios = json.results.map( usuario => {
     const { name, picture, dob, gender} = usuario
    return {
      firstName: name.first,
      lastName: name.last,
      age: dob.age,
      avatar: picture.thumbnail, 
      fullName: name.first+''+name.last,     
      gender,
    };
  });
  
};

async function Buscar()
{            
    await fetchUsuarios(); 
    ListaFiltradaPorNome()   
    somaTotalUsuarios()
    ExibeUsuariosSelecionados(); 
    QuantidadeHomensEMulheres();
    SomaDasIdades();
    MediaDasIdades();

}

function ListaFiltradaPorNome()
{
    let nome = document.querySelector("#TextbuscarUsuario").value.toLowerCase(); 
    ListaUsuarios = ListaUsuarios.filter(usuario => usuario.fullName.toLowerCase().includes(nome) );  

}

function QuantidadeHomensEMulheres(){
    let SexoF = ListaUsuarios.filter(usuFem => usuFem.gender === 'female');
    SomaSexoF.innerHTML = SexoF.length;
    SomaSexoM.innerHTML = ListaUsuarios.length - SexoF.length;
}

function somaTotalUsuarios(){
    TotalUsuarios.innerHTML = ListaUsuarios.length;

}

function SomaDasIdades(){
    TotalIdades.innerHTML = ListaUsuarios.reduce((acum, soma) => {
        return acum + soma.age
    }, 0)

}

function MediaDasIdades(){
   
    MediaIdades.innerHTML = ListaUsuarios.reduce((acum, soma) => {
        return acum + soma.age
    }, 0) / ListaUsuarios.length;
}

function ExibeUsuariosSelecionados() {
    console.log(ListaUsuarios);
    let UsuariosHTML = '<div>';

    ListaUsuarios.forEach(usuario => {
        const { firstName, lastName, age, avatar, gender, fullName } = usuario;

        const UsuarioHTML = `
            <div class="usuario">
              <div>
                <img src="${avatar}" alt="${firstName}">
              </div>
              <div>
                <ul>
                 <li>${firstName}</li>
                 <li>${lastName}</li>
                 <li>${age} anos</li>
                </ul>
              </div>
            </div>
        `;

        UsuariosHTML += UsuarioHTML;
    });

    UsuariosHTML += '</div>';
    tabUsuarios.innerHTML = UsuariosHTML;
}