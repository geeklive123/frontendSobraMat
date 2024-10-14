//mport React from 'react';
import CardMaterial from './cardMaterial';

const listamateriales = [
      {id: 1,
      nombre: 'Material 1',
      urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/a.jpeg?alt=media&token=0ba6e8ed-b9e9-453e-a846-4349bebcdf2e",
      descripcion: 'Este es el material 1',
      precio : 12,
      cantidad: 12
      },
    {id: 2,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/b.jpeg?alt=media&token=990fcd31-3592-4be1-a91f-ae5e35d6be65",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 3,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/c.jpeg?alt=media&token=fa0ff720-3aa1-4db9-b931-72090972a0c5",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 4,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/d.jpeg?alt=media&token=d6425091-2b47-489e-966f-77a5b892ef09",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 5,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/a.jpeg?alt=media&token=0ba6e8ed-b9e9-453e-a846-4349bebcdf2e",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 6,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/e.jpeg?alt=media&token=f7a434cc-5a84-4e28-8d02-02a9f0a3e3df",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 7,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/a.jpeg?alt=media&token=0ba6e8ed-b9e9-453e-a846-4349bebcdf2e",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 8,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/f.jpeg?alt=media&token=b5ed8123-4d25-42f1-b83c-f246fa8bf467",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 9,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/a.jpeg?alt=media&token=0ba6e8ed-b9e9-453e-a846-4349bebcdf2e",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 10,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/g.jpeg?alt=media&token=3c04da7a-7193-474e-95fb-d9d707a6ef63",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },

        {id: 11,
        nombre: 'Material 1',
        urlImage : "https://firebasestorage.googleapis.com/v0/b/conexia-400921.appspot.com/o/a.jpeg?alt=media&token=0ba6e8ed-b9e9-453e-a846-4349bebcdf2e",
        descripcion: 'Este es el material 1',
        precio : 12,
        cantidad: 12
        },
];

  const ListMaterial = () => (
    <div className="bg-gray-800 text-white p-5">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">MIS PRODUCTOS</h1>
      <h2 className="text-xl text-center mb-6">Subheading</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listamateriales && listamateriales.map((item) =>{
              return <CardMaterial key={item.id}  material={item}/>
          })}
        </div>
      </div>
    </div>
    )
      export default ListMaterial;